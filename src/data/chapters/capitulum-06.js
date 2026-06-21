export const capitulum06 = {
  id: 6,
  title: "Capitulum VI: Via Latīna",
  summary: {
    en: "This chapter introduces roads, towns, travel, and spatial relationships. It focuses on prepositions, direction, distance, and routes between places.",
    latinKeywords: ["via", "oppidum", "Rōma", "Tūsculum", "prope", "inter"]
  },
  vocabOptions: {
    showForms: true
  },
  grammar: [
    {
      id: "c6-g1",
      topic: "Prepositions + acc.",
      explanation: "When a preposition expresses direction, movement, or certain spatial relationships, it often takes the acc. Learn each preposition together with the case it governs.",
      examples: [
        { latin: "Iūlius ad villam it.", translation: "Iulius goes toward the villa." }
      ]
    },
    {
      id: "c6-g2",
      topic: "ubi? / quō?",
      explanation: "ubi? asks where something is and usually points to location. quō? asks where something is going and usually points to direction.",
      examples: [
        { latin: "Ubi est Rōma?", translation: "Where is Rome?" },
        { latin: "Quō it servus?", translation: "Where is the slave going?" }
      ]
    }
  ],
  vocab: [
    { latin: "via", pos: "n.", forms: { nomSg: "via", genSg: "viae" }, declension: "1st", gender: "f.", meaning: "road, way" },
    { latin: "oppidum", pos: "n.", forms: { nomSg: "oppidum", genSg: "oppidī" }, declension: "2nd", gender: "n.", meaning: "town" },
    { latin: "fluvius", pos: "n.", forms: { nomSg: "fluvius", genSg: "fluviī" }, declension: "2nd", gender: "m.", meaning: "river" },
    { latin: "īre", pos: "v.", principalParts: ["eō", "īre", "iī", "itum"], conjugation: "irreg.", meaning: "to go" },
    { latin: "abesse", pos: "v.", principalParts: ["absum", "abesse", "āfuī"], conjugation: "irreg.", meaning: "to be away, to be distant" },
    { latin: "prope", pos: "prep.", meaning: "near" },
    { latin: "inter", pos: "prep.", meaning: "between, among" }
  ],
  exercises: [
    {
      id: "c6-mc-1",
      type: "multiple_choice",
      question: "What does ubi? usually ask?",
      choices: ["where", "to where", "from where", "why"],
      answer: "where",
      explanation: "ubi? is a place-question word used for location."
    },
    {
      id: "c6-mc-2",
      type: "multiple_choice",
      question: "What are the declension and gender of via?",
      choices: ["1st f.", "2nd m.", "2nd n.", "3rd f."],
      answer: "1st f.",
      explanation: "via, -ae is a 1st-declension feminine noun."
    }
  ]
};
