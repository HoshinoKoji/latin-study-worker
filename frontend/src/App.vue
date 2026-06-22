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
  { id: 'overview', label: 'Overview', hint: 'Chapter focus' },
  { id: 'grammar', label: 'Grammar', hint: 'Rules + examples' },
  { id: 'vocabulary', label: 'Vocabulary', hint: 'Grouped by part of speech' },
  { id: 'exercises', label: 'Exercises', hint: 'Practice + feedback' }
];

const exerciseTypeLabels = {
  multiple_choice: 'Multiple choice',
  fill_blank: 'Fill in the blank',
  short_answer: 'Short answer',
  case_identification: 'Case identification',
  form_transformation: 'Form transformation'
};

const posLabels = {
  'n.': 'Nouns',
  'v.': 'Verbs',
  'adj.': 'Adjectives',
  'adv.': 'Adverbs',
  'prep.': 'Prepositions',
  'conj.': 'Conjunctions',
  'pron.': 'Pronouns',
  'num.': 'Numbers'
};

const defaultCases = ['nom.', 'voc.', 'gen.', 'acc.', 'dat.', 'abl.'];
const defaultNumbers = ['sg.', 'pl.'];

onMounted(async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const res = await fetch('/api/chapters');
    if (!res.ok) throw new Error('Unable to load chapters.');

    chapters.value = await res.json();
    if (chapters.value.length > 0) {
      await selectChapter(chapters.value[0].id);
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load chapters.';
  } finally {
    loading.value = false;
  }
});

const chapterSummary = computed(() => currentChapter.value?.summary?.en ?? '');
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
    { id: 'all', label: `All ${exerciseItems.value.length}` },
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
    if (!res.ok) throw new Error('Unable to load this chapter.');

    currentChapter.value = await res.json();
    activeSection.value = 'overview';
    activeExerciseType.value = 'all';
    answers.value = {};
    feedback.value = {};
    checking.value = {};
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load this chapter.';
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
        explanation: error instanceof Error ? error.message : 'Unable to check this answer.',
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

function groupLabel(group) {
  if (group.key === 'other') return 'Other';
  return group.label;
}

function formsDisplay(item) {
  if (item.pos === 'n.') {
    return [item.forms?.nomSg ?? item.latin, item.forms?.genSg].filter(Boolean).join(', ');
  }

  if (item.pos === 'v.') {
    return item.principalParts?.join(', ') ?? item.latin;
  }

  if (item.pos === 'adj.' && item.forms) {
    return [item.forms.nomSgM, item.forms.nomSgF, item.forms.nomSgN].filter(Boolean).join(', ');
  }

  return item.forms ? Object.values(item.forms).filter(Boolean).join(', ') : '';
}

function grammarMeta(item) {
  if (item.pos === 'n.') {
    return [item.declension, item.gender].filter(Boolean).join(' ');
  }

  if (item.pos === 'v.') {
    return item.conjugation ?? '';
  }

  return item.pos ?? '';
}

function selectChoice(exercise, choice) {
  answers.value = { ...answers.value, [exercise.id]: choice };
}

function caseOptions(exercise) {
  return exercise.caseGrid?.cases ?? defaultCases;
}

function numberOptions(exercise) {
  return exercise.caseGrid?.numbers ?? defaultNumbers;
}

function caseAnswer(exercise, caseName, numberName) {
  return [caseName, numberName, exercise.caseGrid?.declension, exercise.caseGrid?.gender]
    .filter(Boolean)
    .join('; ');
}

function selectCaseAnswer(exercise, caseName, numberName) {
  answers.value = { ...answers.value, [exercise.id]: caseAnswer(exercise, caseName, numberName) };
}

function isSelectedCaseAnswer(exercise, caseName, numberName) {
  return answers.value[exercise.id] === caseAnswer(exercise, caseName, numberName);
}

function expectedAnswerText(result) {
  if (!result?.expected) return result?.explanation ?? '';
  return `${result.explanation || ''} Expected: ${result.expected}`;
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-block">
        <p class="eyebrow">Lingua Latīna</p>
        <h1>Latin Study</h1>
        <p>Review chapter summaries, grammar, vocabulary, and exercises.</p>
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

      <el-empty v-if="!currentChapter && !loading" description="No chapter data available" />

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
              <span>Grammar</span>
            </div>
            <div>
              <strong>{{ vocabularyItems.length }}</strong>
              <span>Words</span>
            </div>
            <div>
              <strong>{{ exerciseItems.length }}</strong>
              <span>Exercises</span>
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
                <span>Chapter focus</span>
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
                <span>Suggested study flow</span>
                <el-tag type="success" effect="plain">Flow</el-tag>
              </div>
            </template>
            <ol class="learning-steps">
              <li>Scan the Latin keywords and chapter focus first.</li>
              <li>Read the grammar cards one rule at a time.</li>
              <li>Review vocabulary by part of speech, paying close attention to forms and grammar labels.</li>
              <li>Finish with exercises, then revisit the grammar card behind each wrong answer.</li>
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
              <h3>{{ groupLabel(group) }}</h3>
              <span>{{ group.items.length }} items</span>
            </div>

            <div class="vocab-grid">
              <article v-for="item in group.items" :key="`${group.key}-${item.latin}-${item.meaning}`" class="vocab-card">
                <div class="vocab-main">
                  <strong class="latin-token">{{ item.latin }}</strong>
                  <el-tag size="small" effect="plain">{{ item.pos }}</el-tag>
                </div>
                <p>{{ item.meaning }}</p>
                <dl class="vocab-details">
                  <div v-if="formsDisplay(item)">
                    <dt>Forms</dt>
                    <dd>{{ formsDisplay(item) }}</dd>
                  </div>
                  <div v-if="grammarMeta(item)">
                    <dt>Grammar</dt>
                    <dd>{{ grammarMeta(item) }}</dd>
                  </div>
                </dl>
              </article>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'exercises'" class="content-section exercises-section">
          <el-card class="study-card progress-card" shadow="never">
            <div class="progress-layout">
              <div>
                <p class="eyebrow">Practice</p>
                <h3>Exercise progress</h3>
                <p>{{ answeredCount }} / {{ exerciseItems.length }} submitted, {{ correctCount }} correct.</p>
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

              <div v-if="exercise.caseGrid" class="case-context">
                <span>{{ exercise.caseGrid.declension }}</span>
                <span>{{ exercise.caseGrid.gender }}</span>
              </div>

              <div v-if="exercise.type === 'multiple_choice'" class="answer-control">
                <div class="choice-list" role="radiogroup" :aria-label="exerciseLabel(exercise.type)">
                  <button
                    v-for="choice in exercise.choices"
                    :key="choice"
                    type="button"
                    class="choice-button"
                    :class="{ selected: answers[exercise.id] === choice }"
                    :aria-pressed="answers[exercise.id] === choice"
                    @click="selectChoice(exercise, choice)"
                  >
                    {{ choice }}
                  </button>
                </div>
              </div>
              <div v-else-if="exercise.type === 'case_identification'" class="answer-control">
                <div class="case-grid" role="grid" aria-label="Choose number and case">
                  <div class="case-grid-corner" aria-hidden="true"></div>
                  <div v-for="caseName in caseOptions(exercise)" :key="caseName" class="case-grid-heading">
                    {{ caseName }}
                  </div>
                  <template v-for="numberName in numberOptions(exercise)" :key="numberName">
                    <div class="case-grid-heading row-heading">{{ numberName }}</div>
                    <button
                      v-for="caseName in caseOptions(exercise)"
                      :key="`${exercise.id}-${numberName}-${caseName}`"
                      type="button"
                      class="case-cell"
                      :class="{ selected: isSelectedCaseAnswer(exercise, caseName, numberName) }"
                      :aria-pressed="isSelectedCaseAnswer(exercise, caseName, numberName)"
                      @click="selectCaseAnswer(exercise, caseName, numberName)"
                    >
                      {{ numberName }} {{ caseName }}
                    </button>
                  </template>
                </div>
              </div>
              <div v-else-if="exercise.type === 'short_answer'" class="answer-control">
                <el-input
                  v-model="answers[exercise.id]"
                  type="textarea"
                  :rows="3"
                  placeholder="Type your answer in English"
                />
              </div>
              <div v-else class="answer-control">
                <el-input v-model="answers[exercise.id]" placeholder="Type your answer" />
              </div>

              <el-button
                type="primary"
                :loading="checking[exercise.id]"
                @click="checkAnswer(exercise)"
              >
                Check answer
              </el-button>

              <el-alert
                v-if="feedback[exercise.id]?.correct"
                class="feedback-alert"
                title="Correct"
                type="success"
                :description="feedback[exercise.id].explanation"
                show-icon
              />
              <el-alert
                v-else-if="feedback[exercise.id]"
                class="feedback-alert"
                title="Review this point"
                type="error"
                :description="expectedAnswerText(feedback[exercise.id])"
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
  background: var(--page-bg);
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

:global(*) {
  box-sizing: border-box;
}

.app-shell {
  --page-bg: #f3eee6;
  --sidebar-bg: #2f2a22;
  --sidebar-panel: #3b342a;
  --sidebar-panel-active: #4a4034;
  --surface: #fbf7ef;
  --surface-soft: #f7f0e6;
  --surface-muted: #eee4d5;
  --border: #ded1bf;
  --border-strong: #c9b69d;
  --ink: #302820;
  --ink-muted: #6f6255;
  --ink-soft: #8a7a68;
  --accent: #8a5a2b;
  --accent-strong: #6f421d;
  --accent-soft: #ead8bf;
  --accent-wash: #f1e3d0;
  --sidebar-ink: #f8efe2;
  --sidebar-muted: #cfc1ad;
  --success: #6f7440;
  --success-soft: #edf0dc;
  --danger: #9d4e35;
  --danger-soft: #f3dfd7;
  --shadow: 0 18px 48px rgba(73, 54, 34, 0.10);

  --el-color-primary: var(--accent-strong);
  --el-color-primary-dark-2: #553111;
  --el-color-primary-light-3: #9a7656;
  --el-color-primary-light-5: #b99d83;
  --el-color-primary-light-7: #d7c4b2;
  --el-color-primary-light-8: #e6d8ca;
  --el-color-primary-light-9: #f3ebe4;
  --el-color-success: var(--success);
  --el-color-success-light-3: #9ba06d;
  --el-color-success-light-5: #b8bc94;
  --el-color-success-light-7: #d4d7bd;
  --el-color-success-light-8: #e1e4cf;
  --el-color-success-light-9: var(--success-soft);
  --el-color-danger: var(--danger);
  --el-color-danger-light-3: #bb7e69;
  --el-color-danger-light-5: #d0a596;
  --el-color-danger-light-7: #e4cbc2;
  --el-color-danger-light-8: #ecd8d2;
  --el-color-danger-light-9: var(--danger-soft);
  --el-color-warning: #a46f2d;
  --el-color-info: var(--ink-soft);
  --el-fill-color-blank: var(--surface);
  --el-fill-color-light: var(--surface-soft);
  --el-border-color: var(--border);
  --el-border-color-light: var(--border);
  --el-border-color-lighter: #e8dfd2;
  --el-text-color-primary: var(--ink);
  --el-text-color-regular: var(--ink-muted);
  --el-text-color-secondary: var(--ink-soft);

  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
  background: var(--page-bg);
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
  padding: 2rem;
  background: var(--sidebar-bg);
  color: var(--sidebar-ink);
  border-right: 1px solid rgba(222, 209, 191, 0.16);
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
  color: var(--sidebar-muted);
  line-height: 1.7;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.sidebar .eyebrow {
  color: #d5b98f;
}

.chapter-list {
  display: grid;
  gap: 0.85rem;
}

.chapter-card {
  width: 100%;
  border: 1px solid rgba(222, 209, 191, 0.14);
  border-radius: 1.25rem;
  padding: 1rem;
  background: var(--sidebar-panel);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
}

.chapter-card:hover,
.chapter-card.active {
  transform: translateY(-2px);
  background: var(--sidebar-panel-active);
  border-color: rgba(213, 185, 143, 0.58);
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
  color: var(--sidebar-muted);
  line-height: 1.45;
}

.chapter-number {
  color: #d5b98f;
  font-size: 0.75rem;
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
  border: 1px solid var(--border);
  border-radius: 2rem;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.hero-panel h2 {
  color: var(--ink);
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -0.05em;
}

.summary-text,
.body-copy,
.learning-steps,
.progress-card p {
  color: var(--ink-muted);
  line-height: 1.75;
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
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--surface-soft);
  text-align: center;
}

.chapter-stats strong,
.chapter-stats span {
  display: block;
}

.chapter-stats strong {
  color: var(--accent-strong);
  font-size: 1.6rem;
}

.chapter-stats span {
  color: var(--ink-soft);
  font-size: 0.8rem;
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
  border: 1px solid rgba(222, 209, 191, 0.68);
  border-radius: 1.25rem;
  background: rgba(243, 238, 230, 0.9);
  backdrop-filter: blur(12px);
}

.section-tabs button,
.filter-bar button {
  border: 0;
  border-radius: 1rem;
  padding: 0.85rem 1rem;
  background: transparent;
  color: var(--ink-muted);
  cursor: pointer;
}

.section-tabs button {
  text-align: left;
}

.section-tabs button.active,
.filter-bar button.active {
  background: var(--accent-strong);
  color: #fff9f0;
  box-shadow: 0 10px 30px rgba(93, 63, 33, 0.18);
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
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  background: var(--surface);
  overflow: hidden;
}

.card-header,
.section-heading,
.vocab-main,
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
.example-list {
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
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  background: var(--surface-soft);
}

.vocab-group + .vocab-group {
  margin-top: 1.5rem;
}

.section-heading {
  margin-bottom: 0.75rem;
}

.section-heading span {
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.vocab-grid {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.vocab-card {
  padding: 1rem;
}

.vocab-card p {
  min-height: 2.4em;
  margin: 0.75rem 0;
  color: var(--ink-muted);
  line-height: 1.55;
}

.vocab-main strong {
  font-size: 1.2rem;
}

.vocab-details {
  display: grid;
  gap: 0.45rem;
  margin: 0;
}

.vocab-details div {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 0.75rem;
  align-items: baseline;
}

.vocab-details dt {
  color: var(--ink-soft);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.vocab-details dd {
  margin: 0;
  color: var(--ink-muted);
  line-height: 1.45;
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
  border: 1px solid var(--border);
  background: var(--surface);
}

.exercise-card + .exercise-card {
  margin-top: 0.25rem;
}

.exercise-prompt {
  margin-top: 0;
  font-size: 1.05rem;
  line-height: 1.9;
}

.case-context {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.case-context span {
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  background: var(--surface-soft);
  color: var(--ink-muted);
  font-size: 0.8rem;
}

.answer-control {
  margin: 1rem 0;
}

.choice-list {
  display: grid;
  gap: 0.5rem;
  align-items: stretch;
}

.choice-button,
.case-cell {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  background: var(--surface-soft);
  color: var(--ink);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: background 140ms ease, border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
}

.choice-button {
  min-height: 2.75rem;
  padding: 0.7rem 0.85rem;
}

.choice-button:hover,
.case-cell:hover {
  border-color: var(--border-strong);
  background: var(--accent-wash);
}

.choice-button.selected,
.case-cell.selected {
  border-color: var(--accent-strong);
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent-strong);
  color: var(--accent-strong);
  font-weight: 700;
}

.case-grid {
  display: grid;
  grid-template-columns: 4rem repeat(6, minmax(4.5rem, 1fr));
  gap: 0.4rem;
  overflow-x: auto;
}

.case-grid-corner,
.case-grid-heading,
.case-cell {
  min-width: 4.5rem;
}

.case-grid-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.3rem;
  border-radius: 0.75rem;
  background: var(--surface-muted);
  color: var(--ink-soft);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.case-grid-heading.row-heading {
  color: var(--ink-muted);
}

.case-cell {
  min-height: 2.7rem;
  padding: 0.45rem 0.5rem;
  text-align: center;
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
  background: var(--accent-soft);
  color: var(--accent-strong);
}

:deep(.el-button--primary) {
  --el-button-bg-color: var(--accent-strong);
  --el-button-border-color: var(--accent-strong);
  --el-button-hover-bg-color: var(--accent);
  --el-button-hover-border-color: var(--accent);
  --el-button-active-bg-color: #553111;
  --el-button-active-border-color: #553111;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__inner) {
  background: var(--surface-soft);
  border-color: var(--border);
  box-shadow: 0 0 0 1px var(--border) inset;
}

:deep(.el-input__wrapper.is-focus),
:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px var(--accent-strong) inset;
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

  .example-row,
  .vocab-details div {
    grid-template-columns: 1fr;
  }

  .case-grid {
    grid-template-columns: 3.5rem repeat(6, minmax(4rem, 1fr));
  }

  .case-grid-heading,
  .case-cell {
    font-size: 0.72rem;
  }

  .progress-layout {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
