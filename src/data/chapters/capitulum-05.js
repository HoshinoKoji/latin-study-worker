export const capitulum05 = {
  id: 5,
  title: "Capitulum V: Villa et Hortus",
  summary: {
    en: "This chapter describes Iūlius's villa, garden, rooms, doors, windows, and where people are located. It focuses on place expressions and forms of first- and second-declension nouns.",
    latinKeywords: ["villa", "hortus", "ātrium", "cubiculum", "ōstium", "fenestra"]
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
    { latin: "villa", pos: "n.", declension: "1st", gender: "f.", meaning: "villa, country house" },
    { latin: "hortus", pos: "n.", declension: "2nd", gender: "m.", meaning: "garden" },
    { latin: "ātrium", pos: "n.", declension: "2nd", gender: "n.", meaning: "atrium, main room" },
    { latin: "cubiculum", pos: "n.", declension: "2nd", gender: "n.", meaning: "bedroom" },
    { latin: "ōstium", pos: "n.", declension: "2nd", gender: "n.", meaning: "door, entrance" },
    { latin: "fenestra", pos: "n.", declension: "1st", gender: "f.", meaning: "window" },
    { latin: "habēre", pos: "v.", meaning: "to have, to hold" },
    { latin: "vidēre", pos: "v.", meaning: "to see" }
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
