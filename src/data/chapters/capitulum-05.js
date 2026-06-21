export const capitulum05 = {
  id: 5,
  title: "Capitulum V: Villa et Hortus",
  summary: {
    en: "This chapter describes Iūlius's villa, garden, rooms, doors, windows, and where people are located. It focuses on place expressions and forms of first- and second-declension nouns.",
    latinKeywords: ["villa", "hortus", "ātrium", "cubiculum", "ōstium", "fenestra"]
  },
  vocabOptions: {
    showForms: true
  },
  grammar: [
    {
      id: "c5-g1",
      topic: "in + abl.",
      explanation: "When in expresses a static location, it takes the abl., as in in villā and in hortō.",
      examples: [
        { latin: "Iūlius in villā est.", translation: "Iulius is in the villa." },
        { latin: "Puerī in hortō sunt.", translation: "The boys are in the garden." }
      ]
    },
    {
      id: "c5-g2",
      topic: "Nom. / acc.",
      explanation: "The nom. is usually used for the subject, while the acc. is often used for the direct object. At this stage, focus on identifying subjects and objects.",
      examples: [
        { latin: "Servus dominum videt.", translation: "The slave sees the master." }
      ]
    }
  ],
  vocab: [
    { latin: "villa", pos: "n.", forms: { nomSg: "villa", genSg: "villae" }, declension: "1st", gender: "f.", meaning: "villa, country house" },
    { latin: "hortus", pos: "n.", forms: { nomSg: "hortus", genSg: "hortī" }, declension: "2nd", gender: "m.", meaning: "garden" },
    { latin: "ātrium", pos: "n.", forms: { nomSg: "ātrium", genSg: "ātriī" }, declension: "2nd", gender: "n.", meaning: "atrium, main room" },
    { latin: "cubiculum", pos: "n.", forms: { nomSg: "cubiculum", genSg: "cubiculī" }, declension: "2nd", gender: "n.", meaning: "bedroom" },
    { latin: "ōstium", pos: "n.", forms: { nomSg: "ōstium", genSg: "ōstiī" }, declension: "2nd", gender: "n.", meaning: "door, entrance" },
    { latin: "fenestra", pos: "n.", forms: { nomSg: "fenestra", genSg: "fenestrae" }, declension: "1st", gender: "f.", meaning: "window" },
    { latin: "habēre", pos: "v.", principalParts: ["habeō", "habēre", "habuī", "habitum"], conjugation: "2nd conj.", meaning: "to have, to hold" },
    { latin: "vidēre", pos: "v.", principalParts: ["videō", "vidēre", "vīdī", "vīsum"], conjugation: "2nd conj.", meaning: "to see" }
  ],
  exercises: [
    {
      id: "c5-mc-1",
      type: "multiple_choice",
      question: "What case is villā in in villā?",
      choices: ["nom.", "acc.", "abl.", "gen."],
      answer: "abl.",
      explanation: "When in expresses a static location, it governs the abl."
    },
    {
      id: "c5-mc-2",
      type: "multiple_choice",
      question: "What are the declension and gender of hortus?",
      choices: ["1st f.", "2nd m.", "2nd n.", "3rd m."],
      answer: "2nd m.",
      explanation: "hortus, -ī is a 2nd-declension masculine noun."
    }
  ]
};
