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
      id: "c7-fill-1",
      type: "fill_blank",
      question: "Complete the sentence: Ancilla puellae ____ dat.",
      answer: "rosam",
      acceptableAnswers: ["rosam."],
      explanation: "rosam is acc. sg.; it is the direct object, the thing being given."
    },
    {
      id: "c7-short-1",
      type: "short_answer",
      question: "Translate into English: Ancilla puellae rosam dat.",
      answer: "The maid gives a rose to the girl",
      acceptableAnswers: [
        "The maid gives the girl a rose",
        "A maid gives a rose to the girl",
        "The maid gives a rose to a girl"
      ],
      explanation: "Ancilla is the subject, rosam is the direct object, and puellae is the indirect object."
    },
    {
      id: "c7-case-1",
      type: "case_identification",
      question: "Identify the case and function of puellae in: Ancilla puellae rosam dat.",
      answer: "dat.; indirect object",
      acceptableAnswers: [
        "dative indirect object",
        "dat indirect object",
        "dat. indirect object",
        "dative; indirect object"
      ],
      explanation: "puellae is dat. sg. and marks the recipient: to the girl."
    },
    {
      id: "c7-transform-1",
      type: "form_transformation",
      question: "Change rosa to acc. sg.",
      answer: "rosam",
      explanation: "First-declension acc. sg. ends in -am, so rosa becomes rosam."
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
