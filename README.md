# Latin Study Worker

A Cloudflare Worker and Vue frontend for structured study of *Lingua Latīna per se Illustrata: Familia Romana*.

The app serves static, chapter-based Latin learning content through a Worker API and presents it in a lightweight browser UI built with Vue 3 and Element Plus. It is designed for beginner-friendly review of chapter summaries, grammar notes, vocabulary, and exercises.

## Current goals

- Store chapter learning content as structured JavaScript data.
- Serve chapter content through Cloudflare Worker API routes.
- Provide a warm, readable browser UI for summaries, grammar, vocabulary, and exercises.
- Keep lesson content static for now.
- Leave Cloudflare D1 available for future persistence, such as progress, quiz attempts, notes, or wrong-answer review.

## Current stack

- Cloudflare Workers
- Wrangler
- Vite
- Vue 3
- Element Plus

## Project structure

```txt
frontend/
  index.html
  src/
    main.js                  # Vue entrypoint
    App.vue                  # Main study UI
src/
  index.js                   # Worker API and answer checking
  data/
    chapters.js              # Aggregates chapter modules
    chapters/
      capitulum-05.js
      capitulum-06.js
      capitulum-07.js
migrations/
  0001_init.sql              # Optional future D1 schema
vite.config.js               # Vite frontend build config
wrangler.toml                # Worker, assets, and Cloudflare build config
package.json
```

The current frontend implementation lives under `frontend/`. Do not use the older `public/index.html`, `public/app.js`, or `public/style.css` structure as the primary UI implementation.

## Local development

Install dependencies:

```bash
npm install
```

Run the Vite frontend dev server:

```bash
npm run dev
```

Run the Worker locally with Wrangler:

```bash
npm run dev:worker
```

Check Worker syntax:

```bash
npm run check
```

Build the frontend:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

## Build and deployment model

`vite.config.js` uses `frontend` as the Vite root and outputs the production build to `dist`:

```js
export default defineConfig({
  root: 'frontend',
  plugins: [vue()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
```

`wrangler.toml` serves static assets from `./dist` and runs `npm run build` before deployment:

```toml
[assets]
directory = "./dist"
binding = "ASSETS"
run_worker_first = true

[build]
command = "npm run build"
```

The Worker handles API routes first, then falls back to `env.ASSETS.fetch(request)` for the Vue frontend.

## API routes

```txt
GET  /api/health
GET  /api/chapters
GET  /api/chapters/:id
GET  /api/chapters/:id/summary
GET  /api/chapters/:id/grammar
GET  /api/chapters/:id/vocab
GET  /api/chapters/:id/exercises
GET  /api/chapters/:id/quiz?count=5
POST /api/check-answer
```

### API behavior

- `/api/chapters` returns chapter list metadata: `id`, `title`, and English summary text.
- `/api/chapters/:id` returns the full chapter object.
- Section routes return a single section from the chapter object.
- `/api/chapters/:id/quiz?count=5` returns a shuffled subset of exercises.
- `/api/check-answer` normalizes user input and compares it with `exercise.answer` plus `exercise.acceptableAnswers`.

The frontend intentionally does **not** call `/api/check-answer` for `short_answer` exercises because short answers do not have a single canonical correct answer. They use local reveal behavior instead.

## Content language and style

The UI and lesson content should be in English.

General conventions:

- Use Latin macrons where known: `puella`, `rosam`, `vidēre`, `ātrium`.
- Use `Capitulum V`, `Capitulum VI`, etc. in titles.
- Use case abbreviations: `nom.`, `voc.`, `gen.`, `acc.`, `dat.`, `abl.`.
- Use number abbreviations: `sg.`, `pl.`.
- Use gender abbreviations: `m.`, `f.`, `n.`.
- Use declension abbreviations: `1st`, `2nd`, `3rd`, `4th`, `5th`.
- When a verb is listed alone as a vocabulary headword, use the infinitive: `dare`, `vidēre`, `habēre`.
- Do not put long textbook passages into the data. Use short examples and original summaries or explanations.

## Adding a new chapter

Create a chapter file:

```txt
src/data/chapters/capitulum-08.js
```

Export a named object:

```js
export const capitulum08 = {
  id: 8,
  title: "Capitulum VIII: ...",
  summary: {
    en: "One or two concise English sentences describing the chapter focus.",
    latinKeywords: ["...", "..."]
  },
  vocabOptions: {
    showForms: true
  },
  grammar: [],
  vocab: [],
  exercises: []
};
```

Register it in `src/data/chapters.js`:

```js
import { capitulum08 } from "./chapters/capitulum-08.js";

const chapterList = [capitulum05, capitulum06, capitulum07, capitulum08];
```

## Chapter schema

Each chapter should follow this shape:

```js
{
  id: 7,
  title: "Capitulum VII: Puella et Rosa",
  summary: {
    en: "Short English summary.",
    latinKeywords: ["puella", "rosa"]
  },
  vocabOptions: {
    showForms: true
  },
  grammar: [grammarItem],
  vocab: [vocabItem],
  exercises: [exerciseItem]
}
```

### `summary`

```js
summary: {
  en: "Short English summary.",
  latinKeywords: ["puella", "rosa"]
}
```

- `summary.en` is shown in the chapter list, hero panel, and overview card.
- `summary.latinKeywords` is shown as keyword tags in the overview section.

### `vocabOptions.showForms`

```js
vocabOptions: {
  showForms: true
}
```

This option is retained for data compatibility. The current Vue UI renders vocabulary as cards and uses available form fields directly.

## Grammar item schema

```js
{
  id: "c7-g1",
  topic: "Acc. as direct object",
  explanation: "A short beginner-friendly explanation.",
  examples: [
    {
      latin: "Iūlius puellam videt.",
      translation: "Iulius sees the girl."
    }
  ]
}
```

Guidelines:

- Keep `topic` short and specific; it is rendered as the grammar card heading.
- Keep explanations beginner-friendly.
- Prefer one or two clear examples.
- Use `translation`, not `zh`, in new data.
- Use abbreviations consistently: `nom.`, `acc.`, `dat.`, etc.

## Vocabulary item schema

The vocabulary UI renders cards grouped by part of speech. Each card corresponds to this information structure:

```txt
Latin | Forms | Grammar | Meaning
```

### Nouns

For nouns, provide `forms.nomSg` and `forms.genSg` whenever possible. Grammar is generated from `declension + gender`.

```js
{
  latin: "puella",
  pos: "n.",
  forms: {
    nomSg: "puella",
    genSg: "puellae"
  },
  declension: "1st",
  gender: "f.",
  meaning: "girl"
}
```

Rendered as:

```txt
Latin:   puella
Forms:   puella, puellae
Grammar: 1st f.
Meaning: girl
```

### Verbs

For verbs, the headword should be the infinitive. Provide principal parts and conjugation type. Grammar is generated from `conjugation`.

```js
{
  latin: "dare",
  pos: "v.",
  principalParts: ["dō", "dare", "dedī", "datum"],
  conjugation: "1st conj.",
  meaning: "to give"
}
```

Rendered as:

```txt
Latin:   dare
Forms:   dō, dare, dedī, datum
Grammar: 1st conj.
Meaning: to give
```

Use these conjugation labels:

```txt
1st conj.
2nd conj.
3rd conj.
3rd i-stem conj.
4th conj.
irreg.
```

### Adjectives

For adjectives, provide nominative singular masculine, feminine, and neuter forms when possible:

```js
{
  latin: "bonus",
  pos: "adj.",
  forms: {
    nomSgM: "bonus",
    nomSgF: "bona",
    nomSgN: "bonum"
  },
  meaning: "good"
}
```

## Exercise schema

Common fields:

```js
{
  id: "c7-e1",
  type: "multiple_choice",
  question: "...",
  answer: "...",
  acceptableAnswers: ["..."],
  explanation: "Short explanation shown after checking."
}
```

Supported frontend exercise types:

```txt
multiple_choice
fill_blank
short_answer
case_identification
form_transformation
```

### Multiple choice

```js
{
  id: "c7-e1",
  type: "multiple_choice",
  question: "Choose the correct form.",
  choices: ["puella", "puellam", "puellae"],
  answer: "puellam",
  explanation: "The direct object uses acc. sg."
}
```

The frontend renders multiple choice options as custom text buttons, not Element Plus radio controls.

### Fill in the blank

```js
{
  id: "c7-e2",
  type: "fill_blank",
  question: "Iūlius ____ videt.",
  answer: "puellam",
  acceptableAnswers: ["puellam"],
  explanation: "The direct object is acc. sg."
}
```

### Case identification

Case identification uses a grid: `sg./pl.` × `nom./voc./gen./acc./dat./abl.`.

```js
{
  id: "c7-e3",
  type: "case_identification",
  question: "Identify the form puellam.",
  caseGrid: {
    cases: ["nom.", "voc.", "gen.", "acc.", "dat.", "abl."],
    numbers: ["sg.", "pl."],
    declension: "1st",
    gender: "f."
  },
  answer: "acc.; sg.; 1st; f.",
  explanation: "puellam is acc. sg."
}
```

The frontend constructs the selected value as:

```js
[caseName, numberName, declension, gender].join('; ')
```

Keep answer strings compatible with that format.

### Short answer

Short-answer exercises do not have one unique correct answer. The frontend uses local reveal behavior:

- Button text: `Show answer`
- Header tag after reveal: `Shown`
- Feedback alert title: `Suggested answer`
- No call to `/api/check-answer`
- No `Correct` or `Review` status

Use `acceptableAnswers`, `answer`, and `explanation` as reference material rather than strict grading.

```js
{
  id: "c7-e4",
  type: "short_answer",
  question: "Why is puellam used here?",
  acceptableAnswers: ["It is the direct object."],
  explanation: "Direct objects use the accusative case."
}
```

## Frontend architecture

Core file:

```txt
frontend/src/App.vue
```

The app uses Vue Composition API state:

```js
const chapters = ref([]);
const currentChapter = ref(null);
const activeSection = ref('overview');
const activeExerciseType = ref('all');
const answers = ref({});
const feedback = ref({});
const checking = ref({});
```

Initialization flow:

1. Fetch `/api/chapters`.
2. Load the first chapter by default.
3. `selectChapter(id)` fetches `/api/chapters/:id`.
4. Changing chapter resets active section, exercise filter, answers, feedback, and checking state.

Layout:

```txt
aside.sidebar      # Chapter navigation
main.workspace     # Study content
```

Sections:

```txt
Overview
Grammar
Vocabulary
Exercises
```

## UI design system

The visual style is warm, paper-like, and study-oriented. Avoid Element Plus default blue.

Core CSS variables are defined on `.app-shell`:

```css
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
```

Element Plus theme variables are overridden inside `.app-shell`, including:

```css
--el-color-primary: var(--accent-strong);
--el-color-success: var(--success);
--el-color-danger: var(--danger);
--el-color-warning: #a46f2d;
--el-color-info: var(--ink-soft);
```

When adding Element Plus components, check for default blue and override it with project theme variables when needed.

## Important UI implementation details

### Sidebar scrollbar

The sidebar uses Element Plus `el-scrollbar`, not native browser scrollbar styling:

```vue
<aside class="sidebar">
  <el-scrollbar class="sidebar-scrollbar" always>
    <div class="sidebar-inner">
      ...
    </div>
  </el-scrollbar>
</aside>
```

Relevant styling:

```css
.sidebar-inner { padding: 2rem 1.1rem 2rem 2rem; }
:deep(.sidebar-scrollbar .el-scrollbar__bar.is-vertical) { right: .18rem; width: .36rem; }
:deep(.sidebar-scrollbar .el-scrollbar__thumb) { background-color: rgba(213,185,143,.46); opacity: 1; }
```

This avoids the browser default scrollbar and keeps the sidebar consistent with the Element Plus-based UI.

### Grammar cards

Grammar cards use `el-card`. The `topic` is rendered as a distinctive card heading:

```vue
<span class="grammar-topic">{{ item.topic }}</span>
```

Current styling:

```css
.grammar-card :deep(.el-card__header) {
  border-bottom: 1px solid var(--border-strong);
  background: linear-gradient(90deg, var(--accent-wash), var(--surface));
  padding: 1rem 1.25rem;
}

.grammar-topic {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding-left: .85rem;
  color: var(--accent-strong);
  font-size: 1.05rem;
  font-weight: 850;
  letter-spacing: .01em;
  line-height: 1.25;
}

.grammar-topic::before {
  content: '';
  position: absolute;
  left: 0;
  width: .28rem;
  height: 1.35rem;
  border-radius: 999px;
  background: var(--accent-strong);
}
```

### Vocabulary cards

Vocabulary is rendered as grouped cards rather than a wide table. This makes the content easier to scan and more mobile-friendly while preserving the `Latin | Forms | Grammar | Meaning` information structure.

Default group order:

```js
['n.', 'v.', 'adj.', 'pron.', 'prep.', 'adv.', 'conj.', 'num.', 'other']
```

### Exercise controls

- Multiple choice uses custom buttons with a selected state; do not revert to radio circles.
- Case identification uses a number × case grid.
- Short answer uses `Show answer`, not answer checking.
- Other exercises use `/api/check-answer`.

## Responsive behavior

At `max-width: 960px`:

- App switches from two columns to one column.
- Sidebar becomes static and auto-height.
- Chapter cards become a responsive grid.
- Hero and overview layouts collapse to one column.

At `max-width: 640px`:

- Workspace padding is reduced.
- Example rows and vocabulary details collapse to one column.
- Case grid uses smaller columns.

## Maintenance notes

- Current user preference is to commit directly to `main` unless instructed otherwise.
- Keep UI labels and lesson content in English.
- Do not reintroduce the old `public/` frontend as the main implementation.
- Do not use browser-native scrollbar CSS as the primary sidebar solution; use Element Plus Scrollbar.
- Avoid Element Plus default blue in any new UI.
- Do not grade `short_answer` exercises.
- Prefer small, focused commits.
- Consider splitting `frontend/src/App.vue` into smaller components as the next major refactor.

## Suggested future improvements

- Split `App.vue` into components:
  - `Sidebar.vue`
  - `HeroPanel.vue`
  - `GrammarSection.vue`
  - `VocabularySection.vue`
  - `ExercisesSection.vue`
  - `CaseGrid.vue`
- Move CSS into dedicated files such as:
  - `frontend/src/styles/theme.css`
  - `frontend/src/styles/components.css`
- Add minimal tests for answer normalization and exercise answer formats.
- Add a clearer `sampleAnswer` field for `short_answer` exercises so it does not look like a single canonical `answer`.
- Add persistence through D1 for progress, attempts, notes, and wrong-answer review.

## High-level mental model

```txt
Chapter data modules
        ↓
Cloudflare Worker JSON API
        ↓
Vue app state and computed views
        ↓
Element Plus cards, tags, alerts, inputs, and scrollbar
        ↓
Beginner-friendly study flow: Overview → Grammar → Vocabulary → Exercises
```
