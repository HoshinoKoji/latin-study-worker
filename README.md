# Latin Study Worker

A Cloudflare Worker + static frontend for structured study of *Lingua Latina per se Illustrata: Familia Romana*.

This repository is designed so that future ChatGPT sessions or human contributors can add chapter content consistently: summaries, grammar notes, vocabulary, and exercises.

## Current goals

- Store chapter learning content as structured JavaScript data.
- Serve chapter content through Cloudflare Worker API routes.
- Provide a lightweight browser UI for summaries, grammar, vocabulary, and exercises.
- Keep lesson content static for now.
- Leave Cloudflare D1 available for future persistence such as progress, quiz attempts, notes, or wrong-answer review.

## Project structure

```txt
src/
  index.js                    # Worker API and answer checking
  data/
    chapters.js               # Aggregates chapter modules
    chapters/
      capitulum-05.js
      capitulum-06.js
      capitulum-07.js
public/
  index.html                  # Static shell
  app.js                      # Frontend rendering logic
  style.css                   # UI styles
migrations/
  0001_init.sql               # Optional future D1 schema
wrangler.toml
package.json
```

## Local development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

This repository may be connected to Cloudflare automatic builds. Prefer batching related changes into as few commits as possible.

## API

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

## Content language and style

The UI and lesson content should be in English.

General conventions:

- Use Latin macrons where known: `puella`, `rosam`, `vidēre`, `ātrium`.
- Use `Capitulum V`, `Capitulum VI`, etc. in titles.
- Use case abbreviations: `nom.`, `voc.`, `acc.`, `gen.`, `dat.`, `abl.`.
- Use number abbreviations: `sg.`, `pl.`.
- Use gender abbreviations: `m.`, `f.`, `n.`.
- Use declension abbreviations: `1st`, `2nd`, `3rd`, `4th`, `5th`.
- When a verb is listed alone as a vocabulary headword, use the infinitive: `dare`, `vidēre`, `habēre`.
- Do not put long textbook passages into the data. Use short examples and original summaries/explanations.

## Adding a new chapter

1. Create a new file:

```txt
src/data/chapters/capitulum-08.js
```

2. Export a named object:

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

3. Register it in `src/data/chapters.js`:

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

### `vocabOptions.showForms`

Controls whether the vocabulary table shows the `Forms` column.

```js
vocabOptions: {
  showForms: true
}
```

- `true`: show noun `nom. sg., gen. sg.` and verb principal parts.
- `false`: hide the `Forms` column and show only `Latin | Grammar | Meaning`.

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

- Keep explanations beginner-friendly.
- Prefer one or two clear examples.
- Use `translation`, not `zh`, in new data.
- Use abbreviations consistently: `nom.`, `acc.`, `dat.`, etc.

## Vocabulary item schema

The vocabulary table currently renders:

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

### Other parts of speech

For prepositions, adverbs, conjunctions, etc., use `pos` and omit forms.

```js
{
  latin: "inter",
  pos: "prep.",
  meaning: "between, among"
}
```

Common `pos` labels:

```txt
n.
v.
adj.
pron.
prep.
adv.
conj.
num.
```

## Exercise schema

All exercises should include:

```js
{
  id: "c7-fill-1",
  type: "fill_blank",
  question: "...",
  answer: "...",
  acceptableAnswers: ["..."],
  explanation: "..."
}
```

`acceptableAnswers` is optional but recommended for typed answers.

Currently supported types:

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
  id: "c7-mc-1",
  type: "multiple_choice",
  questionParts: [
    { text: "In " },
    { text: "Ancilla puellae rosam dat", latin: true },
    { text: ", what is the function of " },
    { text: "puellae", latin: true, target: true },
    { text: "?" }
  ],
  choices: ["subject", "direct object", "indirect object", "predicate noun"],
  answer: "indirect object",
  explanation: "puellae is dat. and means “to the girl.”"
}
```

### Fill in the blank

```js
{
  id: "c7-fill-1",
  type: "fill_blank",
  questionParts: [
    { text: "Complete the sentence: " },
    { text: "Ancilla puellae ", latin: true },
    { text: "____", latin: true, target: true },
    { text: " dat", latin: true },
    { text: "." }
  ],
  answer: "rosam",
  acceptableAnswers: ["rosam."],
  explanation: "rosam is acc. sg.; it is the direct object, the thing being given."
}
```

### Short answer

Use for translation or very short explanation. The current checker is exact after normalization, so add common acceptable variants.

```js
{
  id: "c7-short-1",
  type: "short_answer",
  questionParts: [
    { text: "Translate into English: " },
    { text: "Ancilla puellae rosam dat", latin: true, target: true },
    { text: "." }
  ],
  answer: "The maid gives a rose to the girl",
  acceptableAnswers: [
    "The maid gives the girl a rose",
    "A maid gives a rose to the girl"
  ],
  explanation: "Ancilla is the subject, rosam is the direct object, and puellae is the indirect object."
}
```

### Case identification

This type should test morphology, not syntactic function. Use a clickable table with cases and numbers.

Always include `voc.` in the cases list.

```js
{
  id: "c7-case-1",
  type: "case_identification",
  questionParts: [
    { text: "Identify the morphology of " },
    { text: "puellae", latin: true, target: true },
    { text: " in:" },
    { type: "line_break" },
    { text: "Ancilla ", latin: true },
    { text: "puellae", latin: true, target: true },
    { text: " rosam dat", latin: true },
    { text: "." }
  ],
  caseGrid: {
    cases: ["nom.", "voc.", "acc.", "gen.", "dat.", "abl."],
    numbers: ["sg.", "pl."],
    declension: "1st",
    gender: "f."
  },
  answer: "dat.; sg.; 1st; f.",
  acceptableAnswers: [
    "dative; singular; first; feminine",
    "dat.; singular; 1st; f."
  ],
  explanation: "In this sentence, puellae is dat. sg. of a 1st-declension feminine noun."
}
```

Answer format for case identification should be:

```txt
case; number; declension; gender
```

Examples:

```txt
dat.; sg.; 1st; f.
voc.; sg.; 2nd; m.
acc.; pl.; 2nd; n.
```

### Form transformation

```js
{
  id: "c7-transform-1",
  type: "form_transformation",
  questionParts: [
    { text: "Change " },
    { text: "rosa", latin: true, target: true },
    { text: " to acc. sg." }
  ],
  answer: "rosam",
  explanation: "First-declension acc. sg. ends in -am, so rosa becomes rosam."
}
```

## Rich prompt schema: `questionParts`

Prefer `questionParts` over plain `question` when a prompt refers to a specific Latin word or phrase.

Supported part fields:

```js
{ text: "plain text" }
{ text: "Latin text", latin: true }
{ text: "target word", latin: true, target: true }
{ type: "line_break" }
```

Rules:

- `latin: true` renders the text in Latin styling.
- `target: true` highlights the word or phrase being asked about.
- `line_break` inserts a visual line break.
- Do not store raw HTML in chapter data.

## Answer checking

`POST /api/check-answer` checks a single answer against `answer` plus `acceptableAnswers`.

Normalization currently:

- trims whitespace,
- lowercases,
- removes macron combining marks,
- normalizes curly quotes,
- collapses repeated spaces,
- ignores final punctuation such as `.`, `;`, `:`, `!`, `?`.

For typed answers, still provide common variants in `acceptableAnswers`.

## ID conventions

Use stable IDs with chapter and type prefixes:

```txt
c7-g1          grammar item
c7-mc-1        multiple choice
c7-fill-1      fill blank
c7-short-1     short answer
c7-case-1      case identification
c7-transform-1 form transformation
```

For new chapters, replace `c7` with `c8`, `c9`, etc.

## Contributor checklist for new chapter content

Before committing a new chapter, check:

- The chapter is in its own file under `src/data/chapters/`.
- `src/data/chapters.js` imports and registers the chapter.
- UI-facing content is English.
- `summary.en` is concise and original.
- `latinKeywords` contains useful Latin vocabulary from the chapter.
- Nouns include `forms.nomSg`, `forms.genSg`, `declension`, and `gender`.
- Verbs use infinitive headwords and include `principalParts` and `conjugation` when known.
- `declension` uses abbreviations like `1st`, `2nd`, `3rd`.
- Case labels include `voc.` wherever a full case grid is used.
- `case_identification` asks morphology: case, number, declension, gender.
- Prompts that refer to a specific word use `questionParts` and `target: true`.
- Typed exercises include `acceptableAnswers` when multiple correct phrasings are likely.
- No long copyrighted textbook passages are copied into data.

## Future persistence

The current app does not require a database. If persistence is needed later, use Cloudflare D1 for user-generated data only:

- progress,
- quiz attempts,
- wrong-answer review,
- custom notes.

Static lesson data should remain in chapter modules unless there is a strong reason to move it.
