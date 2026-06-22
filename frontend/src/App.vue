<script setup>
import { computed, onMounted, ref } from 'vue';

const chapters = ref([]);
const currentChapter = ref(null);
const activeSection = ref('overview');
const activeExerciseType = ref('all');
const answers = ref({});
const feedback = ref({});
const checking = ref({});
const loading = ref(false);
const chapterLoading = ref(false);
const errorMessage = ref('');

const sectionNavItems = [
  { id: 'overview', label: '概览', hint: '本章线索' },
  { id: 'grammar', label: '语法', hint: '规则 + 例句' },
  { id: 'vocabulary', label: '词汇', hint: '按词类整理' },
  { id: 'exercises', label: '练习', hint: '即时反馈' }
];

const exerciseTypeLabels = {
  multiple_choice: '选择题',
  fill_blank: '填空',
  short_answer: '简答',
  case_identification: '形态识别',
  form_transformation: '词形转换'
};

const posLabels = {
  'n.': '名词',
  'v.': '动词',
  'adj.': '形容词',
  'adv.': '副词',
  'prep.': '介词',
  'conj.': '连词',
  'pron.': '代词',
  'num.': '数词'
};

onMounted(async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const res = await fetch('/api/chapters');
    if (!res.ok) throw new Error('Unable to load chapters');

    chapters.value = await res.json();
    if (chapters.value.length > 0) {
      await selectChapter(chapters.value[0].id);
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '加载章节失败';
  } finally {
    loading.value = false;
  }
});

const chapterSummary = computed(() => {
  const summary = currentChapter.value?.summary;
  if (!summary) return '';
  return summary.zh ?? summary.en ?? '';
});

const chapterKeywords = computed(() => currentChapter.value?.summary?.latinKeywords ?? []);
const grammarItems = computed(() => currentChapter.value?.grammar ?? []);
const vocabularyItems = computed(() => currentChapter.value?.vocab ?? []);
const exerciseItems = computed(() => currentChapter.value?.exercises ?? []);

const vocabularyGroups = computed(() => {
  const groups = new Map();

  for (const item of vocabularyItems.value) {
    const key = item.pos ?? 'other';
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: posLabels[key] ?? key,
        items: []
      });
    }
    groups.get(key).items.push(item);
  }

  const order = ['n.', 'v.', 'adj.', 'pron.', 'prep.', 'adv.', 'conj.', 'num.', 'other'];
  return [...groups.values()].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
});

const exerciseFilters = computed(() => {
  const counts = new Map();
  for (const exercise of exerciseItems.value) {
    counts.set(exercise.type, (counts.get(exercise.type) ?? 0) + 1);
  }

  return [
    { id: 'all', label: `全部 ${exerciseItems.value.length}` },
    ...[...counts.entries()].map(([type, count]) => ({
      id: type,
      label: `${exerciseTypeLabels[type] ?? type} ${count}`
    }))
  ];
});

const filteredExercises = computed(() => {
  if (activeExerciseType.value === 'all') return exerciseItems.value;
  return exerciseItems.value.filter((exercise) => exercise.type === activeExerciseType.value);
});

const answeredCount = computed(() => {
  const ids = new Set(exerciseItems.value.map((exercise) => exercise.id));
  return Object.keys(feedback.value).filter((id) => ids.has(id)).length;
});

const correctCount = computed(() => {
  const ids = new Set(exerciseItems.value.map((exercise) => exercise.id));
  return Object.entries(feedback.value).filter(([id, result]) => ids.has(id) && result?.correct).length;
});

const progressPercentage = computed(() => {
  if (exerciseItems.value.length === 0) return 0;
  return Math.round((answeredCount.value / exerciseItems.value.length) * 100);
});

async function selectChapter(id) {
  if (currentChapter.value?.id === id) return;

  chapterLoading.value = true;
  errorMessage.value = '';

  try {
    const res = await fetch('/api/chapters/' + id);
    if (!res.ok) throw new Error('Unable to load chapter');

    currentChapter.value = await res.json();
    activeSection.value = 'overview';
    activeExerciseType.value = 'all';
    answers.value = {};
    feedback.value = {};
    checking.value = {};
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '加载章节失败';
  } finally {
    chapterLoading.value = false;
  }
}

async function checkAnswer(exercise) {
  if (!currentChapter.value) return;

  checking.value = { ...checking.value, [exercise.id]: true };

  try {
    const response = await fetch('/api/check-answer', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chapterId: currentChapter.value.id,
        exerciseId: exercise.id,
        answer: answers.value[exercise.id] ?? ''
      })
    });

    const result = await response.json();
    feedback.value = { ...feedback.value, [exercise.id]: result };
  } catch (error) {
    feedback.value = {
      ...feedback.value,
      [exercise.id]: {
        correct: false,
        explanation: error instanceof Error ? error.message : '提交答案失败',
        expected: ''
      }
    };
  } finally {
    checking.value = { ...checking.value, [exercise.id]: false };
  }
}

function promptParts(exercise) {
  if (Array.isArray(exercise.questionParts)) return exercise.questionParts;
  return [{ text: exercise.question || exercise.prompt || '' }];
}

function promptClass(part) {
  return {
    'latin-token': part.latin,
    'target-token': part.target
  };
}

function exerciseLabel(type) {
  return exerciseTypeLabels[type] ?? type;
}

function posLabel(pos) {
  return posLabels[pos] ?? pos ?? '其他';
}

function declensionLabel(value) {
  if (!value) return '';
  const match = String(value).match(/\d+/);
  return match ? `D${match[0]}` : String(value);
}

function conjugationLabel(value) {
  if (!value) return '';
  const normalized = String(value);
  const match = normalized.match(/\d+/);
  if (match) return `C${match[0]}`;
  if (normalized.includes('irreg')) return 'irreg.';
  return normalized;
}

function formsDisplay(item) {
  if (item.pos === 'n.') {
    return [item.forms?.nomSg ?? item.latin, item.forms?.genSg].filter(Boolean).join(', ');
  }

  if (item.pos === 'v.') {
    return '不定式';
  }

  if (item.pos === 'adj.' && item.forms) {
    return [item.forms.nomSgM, item.forms.nomSgF, item.forms.nomSgN].filter(Boolean).join(', ');
  }

  return item.forms ? Object.values(item.forms).filter(Boolean).join(', ') : '';
}

function grammarMeta(item) {
  if (item.pos === 'n.') {
    return [declensionLabel(item.declension), item.gender].filter(Boolean).join(' · ');
  }

  if (item.pos === 'v.') {
    return conjugationLabel(item.conjugation);
  }

  return posLabel(item.pos);
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-block">
        <p class="eyebrow">Lingua Latīna</p>
        <h1>拉丁语学习</h1>
        <p>按章节复习语法、词汇和练习。</p>
      </div>

      <div class="chapter-list" v-loading="loading">
        <button
          v-for="chapter in chapters"
          :key="chapter.id"
          class="chapter-card"
          :class="{ active: currentChapter?.id === chapter.id }"
          type="button"
          @click="selectChapter(chapter.id)"
        >
          <span class="chapter-number">Cap. {{ chapter.id }}</span>
          <strong>{{ chapter.title }}</strong>
          <small>{{ chapter.summary }}</small>
        </button>
      </div>
    </aside>

    <main class="workspace" v-loading="chapterLoading">
      <el-alert
        v-if="errorMessage"
        class="top-alert"
        :title="errorMessage"
        type="error"
        show-icon
      />

      <el-empty v-if="!currentChapter && !loading" description="暂无章节数据" />

      <template v-if="currentChapter">
        <section class="hero-panel">
          <div>
            <p class="eyebrow">Capitulum {{ currentChapter.id }}</p>
            <h2>{{ currentChapter.title }}</h2>
            <p class="summary-text">{{ chapterSummary }}</p>
          </div>

          <div class="chapter-stats" aria-label="Chapter statistics">
            <div>
              <strong>{{ grammarItems.length }}</strong>
              <span>语法点</span>
            </div>
            <div>
              <strong>{{ vocabularyItems.length }}</strong>
              <span>词汇</span>
            </div>
            <div>
              <strong>{{ exerciseItems.length }}</strong>
              <span>练习</span>
            </div>
          </div>
        </section>

        <nav class="section-tabs" aria-label="Study sections">
          <button
            v-for="item in sectionNavItems"
            :key="item.id"
            type="button"
            :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id"
          >
            <strong>{{ item.label }}</strong>
            <span>{{ item.hint }}</span>
          </button>
        </nav>

        <section v-show="activeSection === 'overview'" class="content-section overview-grid">
          <el-card class="study-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>本章学习重点</span>
                <el-tag effect="plain">Overview</el-tag>
              </div>
            </template>
            <p class="body-copy">{{ chapterSummary }}</p>
            <div class="keyword-cloud">
              <el-tag
                v-for="keyword in chapterKeywords"
                :key="keyword"
                effect="plain"
                round
              >
                {{ keyword }}
              </el-tag>
            </div>
          </el-card>

          <el-card class="study-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>建议学习顺序</span>
                <el-tag type="success" effect="plain">Flow</el-tag>
              </div>
            </template>
            <ol class="learning-steps">
              <li>先扫关键词，确认本章主题和核心句型。</li>
              <li>读语法卡片，每条只抓一个规则。</li>
              <li>用词汇区按词类复习，名词重点看 D 与性。</li>
              <li>最后进入练习区，错题根据解释回到语法卡片。</li>
            </ol>
          </el-card>
        </section>

        <section v-show="activeSection === 'grammar'" class="content-section grammar-grid">
          <el-card
            v-for="item in grammarItems"
            :key="item.id"
            class="study-card grammar-card"
            shadow="never"
          >
            <template #header>
              <div class="card-header">
                <span>{{ item.topic }}</span>
                <el-tag effect="plain">{{ item.id }}</el-tag>
              </div>
            </template>
            <p class="body-copy">{{ item.explanation }}</p>
            <div class="example-list">
              <div v-for="example in item.examples" :key="example.latin" class="example-row">
                <span class="latin-token">{{ example.latin }}</span>
                <span>{{ example.translation }}</span>
              </div>
            </div>
          </el-card>
        </section>

        <section v-show="activeSection === 'vocabulary'" class="content-section vocabulary-section">
          <div
            v-for="group in vocabularyGroups"
            :key="group.key"
            class="vocab-group"
          >
            <div class="section-heading">
              <h3>{{ group.label }}</h3>
              <span>{{ group.items.length }} 项</span>
            </div>

            <div class="vocab-grid">
              <article v-for="item in group.items" :key="`${group.key}-${item.latin}-${item.meaning}`" class="vocab-card">
                <div class="vocab-main">
                  <strong class="latin-token">{{ item.latin }}</strong>
                  <el-tag size="small" effect="plain">{{ posLabel(item.pos) }}</el-tag>
                </div>
                <p>{{ item.meaning }}</p>
                <div class="vocab-meta">
                  <span v-if="formsDisplay(item)">{{ formsDisplay(item) }}</span>
                  <span v-if="grammarMeta(item)">{{ grammarMeta(item) }}</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'exercises'" class="content-section exercises-section">
          <el-card class="study-card progress-card" shadow="never">
            <div class="progress-layout">
              <div>
                <p class="eyebrow">Practice</p>
                <h3>练习进度</h3>
                <p>{{ answeredCount }} / {{ exerciseItems.length }} 已提交，{{ correctCount }} 题正确。</p>
              </div>
              <el-progress type="dashboard" :percentage="progressPercentage" />
            </div>
          </el-card>

          <div class="filter-bar">
            <button
              v-for="filter in exerciseFilters"
              :key="filter.id"
              type="button"
              :class="{ active: activeExerciseType === filter.id }"
              @click="activeExerciseType = filter.id"
            >
              {{ filter.label }}
            </button>
          </div>

          <div class="exercise-list">
            <el-card
              v-for="(exercise, index) in filteredExercises"
              :key="exercise.id"
              class="study-card exercise-card"
              shadow="never"
            >
              <template #header>
                <div class="card-header">
                  <span>{{ index + 1 }}. {{ exerciseLabel(exercise.type) }}</span>
                  <el-tag v-if="feedback[exercise.id]?.correct" type="success">Correct</el-tag>
                  <el-tag v-else-if="feedback[exercise.id]" type="danger">Review</el-tag>
                </div>
              </template>

              <p class="exercise-prompt">
                <template v-for="(part, partIndex) in promptParts(exercise)" :key="`${exercise.id}-${partIndex}`">
                  <br v-if="part.type === 'line_break'" />
                  <span v-else :class="promptClass(part)">{{ part.text }}</span>
                </template>
              </p>

              <div v-if="exercise.caseGrid" class="case-hints">
                <span v-for="caseName in exercise.caseGrid.cases" :key="caseName">{{ caseName }}</span>
                <span v-for="number in exercise.caseGrid.numbers" :key="number">{{ number }}</span>
                <span>{{ declensionLabel(exercise.caseGrid.declension) }}</span>
                <span>{{ exercise.caseGrid.gender }}</span>
              </div>

              <div v-if="exercise.type === 'multiple_choice'" class="answer-control">
                <el-radio-group v-model="answers[exercise.id]" class="choice-list">
                  <el-radio
                    v-for="choice in exercise.choices"
                    :key="choice"
                    :label="choice"
                    class="choice-option"
                  >
                    {{ choice }}
                  </el-radio>
                </el-radio-group>
              </div>
              <div v-else-if="exercise.type === 'short_answer'" class="answer-control">
                <el-input
                  v-model="answers[exercise.id]"
                  type="textarea"
                  :rows="3"
                  placeholder="输入英文答案"
                />
              </div>
              <div v-else class="answer-control">
                <el-input v-model="answers[exercise.id]" placeholder="输入答案" />
              </div>

              <el-button
                type="primary"
                :loading="checking[exercise.id]"
                @click="checkAnswer(exercise)"
              >
                检查答案
              </el-button>

              <el-alert
                v-if="feedback[exercise.id]?.correct"
                class="feedback-alert"
                title="正确"
                type="success"
                :description="feedback[exercise.id].explanation"
                show-icon
              />
              <el-alert
                v-else-if="feedback[exercise.id]"
                class="feedback-alert"
                title="需要复习"
                type="error"
                :description="`${feedback[exercise.id].explanation || ''} 正确答案：${feedback[exercise.id].expected || ''}`"
                show-icon
              />
            </el-card>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  background: #f5efe5;
  color: #2d2418;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

:global(*) {
  box-sizing: border-box;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
  padding: 2rem;
  background: linear-gradient(180deg, #332313 0%, #5d3c1c 100%);
  color: #fff8ed;
}

.brand-block {
  margin-bottom: 2rem;
}

.brand-block h1,
.hero-panel h2,
.progress-card h3,
.section-heading h3 {
  margin: 0;
}

.brand-block h1 {
  font-size: clamp(2rem, 4vw, 3.25rem);
  letter-spacing: -0.04em;
}

.brand-block p:last-child {
  color: rgba(255, 248, 237, 0.72);
  line-height: 1.7;
}

.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  color: #a87435;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}

.sidebar .eyebrow {
  color: #f2c078;
}

.chapter-list {
  display: grid;
  gap: 0.85rem;
}

.chapter-card {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1.25rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
}

.chapter-card:hover,
.chapter-card.active {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.17);
  border-color: rgba(255, 255, 255, 0.45);
}

.chapter-card strong,
.chapter-card small,
.chapter-number {
  display: block;
}

.chapter-card strong {
  margin: 0.35rem 0;
  font-size: 1rem;
}

.chapter-card small {
  color: rgba(255, 248, 237, 0.72);
  line-height: 1.45;
}

.chapter-number {
  font-size: 0.75rem;
  color: #f2c078;
  font-weight: 700;
}

.workspace {
  min-width: 0;
  padding: clamp(1rem, 3vw, 2.5rem);
}

.top-alert {
  margin-bottom: 1rem;
}

.hero-panel {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  align-items: end;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  border-radius: 2rem;
  background: #fffaf1;
  border: 1px solid rgba(124, 82, 35, 0.16);
  box-shadow: 0 20px 60px rgba(72, 44, 15, 0.08);
}

.hero-panel h2 {
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -0.05em;
  color: #2f2113;
}

.summary-text,
.body-copy,
.learning-steps,
.progress-card p {
  line-height: 1.75;
  color: #665642;
}

.summary-text {
  max-width: 75ch;
  margin-bottom: 0;
}

.chapter-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(82px, 1fr));
  gap: 0.75rem;
}

.chapter-stats div {
  min-width: 82px;
  padding: 1rem;
  border-radius: 1rem;
  background: #f3e4cd;
  text-align: center;
}

.chapter-stats strong,
.chapter-stats span {
  display: block;
}

.chapter-stats strong {
  font-size: 1.6rem;
  color: #4b2f13;
}

.chapter-stats span {
  font-size: 0.8rem;
  color: #7b684f;
}

.section-tabs {
  position: sticky;
  top: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 1.25rem;
  background: rgba(245, 239, 229, 0.86);
  backdrop-filter: blur(12px);
}

.section-tabs button,
.filter-bar button {
  border: 0;
  border-radius: 1rem;
  padding: 0.85rem 1rem;
  background: transparent;
  color: #6f5b42;
  cursor: pointer;
}

.section-tabs button {
  text-align: left;
}

.section-tabs button.active,
.filter-bar button.active {
  background: #6b431d;
  color: #fff8ed;
  box-shadow: 0 10px 30px rgba(82, 48, 18, 0.18);
}

.section-tabs strong,
.section-tabs span {
  display: block;
}

.section-tabs span {
  margin-top: 0.25rem;
  font-size: 0.78rem;
  opacity: 0.78;
}

.content-section {
  animation: fade-in 180ms ease;
}

.overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 1rem;
}

.grammar-grid,
.vocab-grid,
.exercise-list {
  display: grid;
  gap: 1rem;
}

.grammar-grid {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.study-card,
.vocab-card {
  border: 1px solid rgba(124, 82, 35, 0.14);
  border-radius: 1.25rem;
  overflow: hidden;
}

.card-header,
.section-heading,
.vocab-main,
.vocab-meta,
.progress-layout,
.filter-bar {
  display: flex;
  align-items: center;
}

.card-header,
.section-heading,
.vocab-main,
.progress-layout {
  justify-content: space-between;
  gap: 1rem;
}

.keyword-cloud,
.example-list,
.case-hints {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-cloud {
  margin-top: 1rem;
}

.learning-steps {
  margin: 0;
  padding-left: 1.25rem;
}

.learning-steps li + li {
  margin-top: 0.75rem;
}

.example-list {
  margin-top: 1rem;
}

.example-row {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(180px, 0.8fr) 1fr;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.85rem;
  background: #fbf3e6;
}

.vocab-group + .vocab-group {
  margin-top: 1.5rem;
}

.section-heading {
  margin-bottom: 0.75rem;
}

.section-heading span {
  color: #836d52;
  font-size: 0.9rem;
}

.vocab-grid {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.vocab-card {
  padding: 1rem;
  background: #fffaf1;
}

.vocab-card p {
  min-height: 2.4em;
  margin: 0.75rem 0;
  color: #564734;
  line-height: 1.55;
}

.vocab-main strong {
  font-size: 1.2rem;
}

.vocab-meta {
  flex-wrap: wrap;
  gap: 0.45rem;
}

.vocab-meta span,
.case-hints span {
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  background: #f1e4d0;
  color: #6d5639;
  font-size: 0.8rem;
}

.progress-card {
  margin-bottom: 1rem;
}

.progress-layout p {
  margin-bottom: 0;
}

.filter-bar {
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-bar button {
  background: #fffaf1;
  border: 1px solid rgba(124, 82, 35, 0.14);
}

.exercise-card + .exercise-card {
  margin-top: 0.25rem;
}

.exercise-prompt {
  margin-top: 0;
  font-size: 1.05rem;
  line-height: 1.9;
}

.answer-control {
  margin: 1rem 0;
}

.choice-list {
  display: grid;
  gap: 0.5rem;
  align-items: stretch;
}

.choice-option {
  min-height: 2.5rem;
  margin-right: 0;
  padding: 0.35rem 0.75rem;
  border-radius: 0.75rem;
  background: #fbf3e6;
}

.feedback-alert {
  margin-top: 1rem;
}

.latin-token {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
}

.target-token {
  display: inline-block;
  padding: 0.02rem 0.35rem;
  border-radius: 0.45rem;
  background: #ffe4a8;
  color: #53340f;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
    padding: 1.25rem;
  }

  .chapter-list {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .hero-panel,
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .section-tabs {
    overflow-x: auto;
    grid-template-columns: repeat(4, minmax(140px, 1fr));
  }
}

@media (max-width: 640px) {
  .workspace {
    padding: 1rem;
  }

  .hero-panel {
    border-radius: 1.25rem;
  }

  .chapter-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .chapter-stats div {
    min-width: 0;
    padding: 0.75rem 0.45rem;
  }

  .example-row {
    grid-template-columns: 1fr;
  }

  .progress-layout {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
