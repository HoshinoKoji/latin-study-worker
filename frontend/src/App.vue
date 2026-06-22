<script setup>
import { ref, onMounted } from 'vue';

const chapters = ref([]);
const currentChapter = ref(null);
const activeSection = ref('chapter-overview');
const answers = ref({});
const feedback = ref({});

const sectionNavItems = [
  { id: 'chapter-overview', label: 'Overview' },
  { id: 'chapter-grammar', label: 'Grammar' },
  { id: 'chapter-vocabulary', label: 'Vocabulary' },
  { id: 'chapter-exercises', label: 'Exercises' },
];

onMounted(async () => {
  const res = await fetch('/api/chapters');
  chapters.value = await res.json();
});

async function selectChapter(id) {
  const res = await fetch('/api/chapters/' + id);
  currentChapter.value = await res.json();
  activeSection.value = 'chapter-overview';
  answers.value = {};
  feedback.value = {};
}

function sectionSelected(key) {
  activeSection.value = key;
}

function renderPrompt(ex) {
  if (!Array.isArray(ex.questionParts)) {
    return ex.question || ex.prompt || '';
  }
  return ex.questionParts.map(part => {
    if (part.type === 'line_break') {
      return '<br />';
    }
    const classes = [];
    if (part.latin) classes.push('latin-token');
    if (part.target) classes.push('target-token');
    return `<span class="${classes.join(' ')}">${part.text}</span>`;
  }).join('');
}

async function checkAnswer(ex) {
  const response = await fetch('/api/check-answer', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chapterId: currentChapter.value.id,
      exerciseId: ex.id,
      answer: answers.value[ex.id] ?? '',
    }),
  });
  const result = await response.json();
  feedback.value[ex.id] = result;
}

function inferGenitive(item) {
  if (item.declension === '1st' && item.latin.endsWith('a')) {
    return `${item.latin.slice(0, -1)}ae`;
  }
  if (item.declension === '2nd') {
    if (item.latin.endsWith('us') || item.latin.endsWith('um')) {
      return `${item.latin.slice(0, -2)}i`;
    }
  }
  return '';
}
</script>

<template>
  <el-container>
    <el-aside width="280px">
      <div v-if="!currentChapter">
        <h3>Chapters</h3>
        <el-menu>
          <el-menu-item v-for="ch in chapters" :key="ch.id" @click="selectChapter(ch.id)">
            <div style="display: flex; flex-direction: column;">
              <strong>{{ ch.title }}</strong>
              <span>{{ ch.summary }}</span>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <div v-else>
        <el-button type="text" @click="currentChapter = null"><- Back</el-button>
        <p style="font-weight: bold">{{ currentChapter.title }}</p>
        <el-menu :default-active="activeSection" @select="sectionSelected">
          <el-menu-item v-for="item in sectionNavItems" :index="item.id" :key="item.id">{{ item.label }}</el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <div v-if="!currentChapter">
        <el-empty description="Select a chapter to begin" />
      </div>
      <div v-else>
        <section v-show="activeSection === 'chapter-overview'" style="margin-bottom: 1rem;">
          <p class="eyebrow">Capitulum {{ currentChapter.id }}</p>
          <h2>{{ currentChapter.title }}</h2>
          <p>{{ currentChapter.summary.en ?? currentChapter.summary.zh ?? '' }}</p>
          <p>{{ (currentChapter.summary.latinKeywords || []).join(' · ') }}</p>
        </section>
        <section v-show="activeSection === 'chapter-grammar'">
          <h3>Grammar</h3>
          <el-collapse accordion>
            <el-collapse-item
              v-for="item in currentChapter.grammar"
              :title="item.topic"
              :name="item.id"
              :key="item.id"
            >
              <p>{{ item.explanation }}</p>
              <ul>
                <li v-for="ex in item.examples" :key="ex.latin"><em>{{ ex.latin }}</em> — {{ ex.translation }}</li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </section>
        <section v-show="activeSection === 'chapter-vocabulary'">
          <h3>Vocabulary</h3>
          <el-table :data="currentChapter.vocab">
            <el-table-column prop="latin" label="Latin" width="180" />
            <el-table-column v-if="currentChapter.vocabOptions?.showForms" label="Forms">
              <template #default="{ row }">
                <span v-if="row.pos === 'n.'">{{ row.forms?.nomSg || row.latin }}, {{ row.forms?.genSg || inferGenitive(row) }}</span>
                <span v-else-if="row.pos === 'v.'">{{ row.principalParts?.join(', ') || row.latin }}</span>
                <span v-else>—</span>
              </template>
            </el-table-column>
            <el-table-column label="Grammar">
              <template #default="{ row }">
                <span v-if="row.pos === 'n.'">{{ row.declension }} {{ row.gender }}</span>
                <span v-else-if="row.pos === 'v.'">{{ row.conjugation }}</span>
                <span v-else>{{ row.pos }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="meaning" label="Meaning" />
          </el-table>
        </section>
        <section v-show="activeSection === 'chapter-exercises'">
          <h3>Exercises</h3>
          <div v-for="ex in currentChapter.exercises" :key="ex.id" style="margin-bottom: 1rem;">
            <el-card>
              <template #header>
                <span>{{ ex.type }}</span>
              </template>
              <div v-html="renderPrompt(ex)"></div>
              <div v-if="ex.type === 'multiple_choice'" style="margin-top: 0.5rem;">
                <el-radio-group v-model="answers[ex.id]" style="display: flex; flex-direction: column;">
                  <el-radio v-for="choice in ex.choices" :key="choice" :label="choice">{{ choice }}</el-radio>
                </el-radio-group>
              </div>
              <div v-else-if="ex.type === 'short_answer'" style="margin-top: 0.5rem;">
                <el-input type="textarea" v-model="answers[ex.id]" rows="3" />
              </div>
              <div v-else style="margin-top: 0.5rem;">
                <el-input v-model="answers[ex.id]" />
              </div>
              <el-button type="primary" size="small" style="margin-top: 0.5rem;" @click="checkAnswer(ex)">Check</el-button>
              <div v-if="feedback[ex.id]" style="margin-top: 0.5rem;">
                <el-alert v-if="feedback[ex.id].correct" title="Correct!" type="success" show-icon />
                <el-alert v-else :title="`Incorrect`" type="error" :description="`${feedback[ex.id].explanation} Expected: ${feedback[ex.id].expected}`" show-icon />
              </div>
            </el-card>
          </div>
        </section>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.eyebrow {
  font-size: 0.75rem;
  color: #8a6f38;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.latin-token {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
}
.target-token {
  display: inline-block;
  padding: 0.02rem 0.25rem;
  border-radius: 0.35rem;
  background: #fff0b8;
}
</style>
