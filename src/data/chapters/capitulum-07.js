export const capitulum07 = {
  id: 7,
  title: "Capitulum VII: Puella et Rosa",
  summary: {
    en: "This chapter centers on puella, rosa, ancilla, and domina. It focuses on direct objects, indirect objects, giving and showing, and singular/plural forms.",
    latinKeywords: ["puella", "rosa", "ancilla", "domina", "dare", "ostendere"]
  },
  grammar: [
    {
      id: "c7-g1",
      topic: "Acc. as direct object",
      explanation: "The direct object of a verb is usually in the acc. In puellam videt, puellam is the person being seen.",
      examples: [
        { latin: "Iūlius puellam videt.", translation: "Iulius sees the girl." }
      ]
    },
    {
      id: "c7-g2",
      topic: "Dat. as indirect object",
      explanation: "The dat. often marks the recipient: to whom or for whom something is given, shown, or said.",
      examples: [
        { latin: "Ancilla puellae rosam dat.", translation: "The maid gives a rose to the girl." }
      ]
    }
  ],
  vocab: [
    { latin: "puella", pos: "n.", declension: "1st", gender: "f.", meaning: "girl" },
    { latin: "rosa", pos: "n.", declension: "1st", gender: "f.", meaning: "rose" },
    { latin: "ancilla", pos: "n.", declension: "1st", gender: "f.", meaning: "maid, female servant" },
    { latin: "domina", pos: "n.", declension: "1st", gender: "f.", meaning: "mistress, lady of the house" },
    { latin: "dare", pos: "v.", meaning: "to give" },
    { latin: "ostendere", pos: "v.", meaning: "to show, to point out" }
  ],
  exercises: [
    {
      id: "c7-mc-1",
      type: "multiple_choice",
      question: "In Ancilla puellae rosam dat, what is the function of puellae?",
      choices: ["subject", "direct object", "indirect object", "predicate noun"],
      answer: "indirect object",
      explanation: "puellae is dat. and means “to the girl.”"
    },
    {
      id: "c7-mc-2",
      type: "multiple_choice",
      question: "When a verb is listed by itself in this project, which form should be used?",
      choices: ["dat", "dant", "dare", "dedit"],
      answer: "dare",
      explanation: "This project lists verbs by their infinitive form."
    }
  ]
};
