export const capitulum06 = {
  id: 6,
  title: "Capitulum VI: Via Latīna",
  summary: {
    en: "This chapter follows roads, towns, travel, and movement toward and away from places, especially Rōma, Tūsculum, and Iūlius's villa. It introduces many prepositions with acc. or abl., the locative of town names, and the first contrast between active and passive verb forms.",
    latinKeywords: [
      "via",
      "mūrus",
      "porta",
      "lectīca",
      "saccus",
      "umerus",
      "equus",
      "Rōma",
      "Tūsculum",
      "Ōstia",
      "ad",
      "ante",
      "post",
      "inter",
      "prope",
      "circum",
      "apud",
      "per",
      "ubi",
      "unde",
      "quō",
      "locātīvus",
      "passīvum"
    ]
  },
  vocabOptions: {
    showForms: true
  },
  grammar: [
    {
      id: "c6-g1",
      topic: "Prepositions + acc.",
      explanation: "Many prepositions in this chapter take the acc. Learn the preposition together with the case it governs instead of translating the preposition alone.",
      examples: [
        { latin: "Iūlius ad villam it.", translation: "Iulius goes to the villa." },
        { latin: "Servī lectīcam per portam portant.", translation: "The slaves carry the litter through the gate." }
      ]
    },
    {
      id: "c6-g2",
      topic: "Prepositions + abl.",
      explanation: "Several familiar prepositions take the abl.: ab/ā, cum, ex/ē, in, and sine. In this chapter they often express source, accompaniment, or location.",
      examples: [
        { latin: "Iūlius ab oppidō venit.", translation: "Iulius comes from the town." },
        { latin: "Cornēlius equō vehitur.", translation: "Cornelius is carried by horse; he rides a horse." }
      ]
    },
    {
      id: "c6-g3",
      topic: "ubi? unde? quō?",
      explanation: "ubi? asks where something is, unde? asks from where, and quō? asks to where. The answers use different case patterns.",
      examples: [
        { latin: "Ubi habitat Lȳdia? Rōmae habitat.", translation: "Where does Lydia live? She lives at Rome." },
        { latin: "Unde venit Iūlius? Tūsculō venit.", translation: "From where does Iulius come? He comes from Tusculum." }
      ]
    },
    {
      id: "c6-g4",
      topic: "Acc. for motion to a town",
      explanation: "With names of towns, the acc. can express motion toward the town without ad. This is common with verbs of going.",
      examples: [
        { latin: "Mēdus Rōmam it.", translation: "Medus goes to Rome." },
        { latin: "Cornēlius Tūsculum it.", translation: "Cornelius goes to Tusculum." }
      ]
    },
    {
      id: "c6-g5",
      topic: "Abl. for motion from a town",
      explanation: "With names of towns, the abl. can express motion from the town without ab or ex.",
      examples: [
        { latin: "Iūlius Tūsculō venit.", translation: "Iulius comes from Tusculum." },
        { latin: "Cornēlius Rōmā venit.", translation: "Cornelius comes from Rome." }
      ]
    },
    {
      id: "c6-g6",
      topic: "Locative of town names",
      explanation: "Town names have a special locative form for ‘at’ or ‘in’ a town. For 1st- and 2nd-declension singular town names, the locative looks like the gen. sg.",
      examples: [
        { latin: "Lȳdia Rōmae habitat.", translation: "Lydia lives at Rome." },
        { latin: "Cornēlius Tūsculī habitat.", translation: "Cornelius lives at Tusculum." }
      ]
    },
    {
      id: "c6-g7",
      topic: "Active and passive: -t / -tur",
      explanation: "An active verb form presents the subject as doing the action. A passive form presents the subject as receiving the action. In the sg., -t becomes -tur.",
      examples: [
        { latin: "Servus saccum portat.", translation: "The slave carries the sack." },
        { latin: "Saccus ā servō portātur.", translation: "The sack is carried by the slave." }
      ]
    },
    {
      id: "c6-g8",
      topic: "Active and passive: -nt / -ntur",
      explanation: "In the pl., active -nt corresponds to passive -ntur. The agent with a passive verb is often expressed by ab/ā + abl.",
      examples: [
        { latin: "Servī saccōs portant.", translation: "The slaves carry sacks." },
        { latin: "Saccī ā servīs portantur.", translation: "The sacks are carried by the slaves." }
      ]
    },
    {
      id: "c6-g9",
      topic: "tam ... quam",
      explanation: "tam ... quam means ‘as ... as.’ It is used to compare the degree of an adjective or adverb.",
      examples: [
        { latin: "Syrus non tam fessus est quam Leander.", translation: "Syrus is not as tired as Leander." },
        { latin: "Via Latīna non tam longa est quam via Appia.", translation: "The Latin Road is not as long as the Appian Road." }
      ]
    },
    {
      id: "c6-g10",
      topic: "nam, itaque, autem",
      explanation: "These small words organize the logic of a sentence: nam gives a reason, itaque gives a result, and autem marks contrast or continuation.",
      examples: [
        { latin: "Mēdus laetus est, nam amīca eius Rōmae habitat.", translation: "Medus is happy, for his girlfriend lives at Rome." },
        { latin: "Cornēlius autem Tūsculum it.", translation: "Cornelius, however, goes to Tusculum." }
      ]
    }
  ],
  vocab: [
    { latin: "via", pos: "n.", forms: { nomSg: "via", genSg: "viae" }, declension: "1st", gender: "f.", meaning: "road, way" },
    { latin: "mūrus", pos: "n.", forms: { nomSg: "mūrus", genSg: "mūrī" }, declension: "2nd", gender: "m.", meaning: "wall" },
    { latin: "porta", pos: "n.", forms: { nomSg: "porta", genSg: "portae" }, declension: "1st", gender: "f.", meaning: "gate" },
    { latin: "lectīca", pos: "n.", forms: { nomSg: "lectīca", genSg: "lectīcae" }, declension: "1st", gender: "f.", meaning: "litter, carrying chair" },
    { latin: "saccus", pos: "n.", forms: { nomSg: "saccus", genSg: "saccī" }, declension: "2nd", gender: "m.", meaning: "sack, bag" },
    { latin: "umerus", pos: "n.", forms: { nomSg: "umerus", genSg: "umerī" }, declension: "2nd", gender: "m.", meaning: "shoulder" },
    { latin: "amīcus", pos: "n.", forms: { nomSg: "amīcus", genSg: "amīcī" }, declension: "2nd", gender: "m.", meaning: "friend" },
    { latin: "inimīcus", pos: "n.", forms: { nomSg: "inimīcus", genSg: "inimīcī" }, declension: "2nd", gender: "m.", meaning: "enemy" },
    { latin: "equus", pos: "n.", forms: { nomSg: "equus", genSg: "equī" }, declension: "2nd", gender: "m.", meaning: "horse" },
    { latin: "amīca", pos: "n.", forms: { nomSg: "amīca", genSg: "amīcae" }, declension: "1st", gender: "f.", meaning: "female friend, girlfriend" },
    { latin: "oppidum", pos: "n.", forms: { nomSg: "oppidum", genSg: "oppidī" }, declension: "2nd", gender: "n.", meaning: "town" },
    { latin: "Rōma", pos: "n.", forms: { nomSg: "Rōma", genSg: "Rōmae" }, declension: "1st", gender: "f.", meaning: "Rome" },
    { latin: "Tūsculum", pos: "n.", forms: { nomSg: "Tūsculum", genSg: "Tūsculī" }, declension: "2nd", gender: "n.", meaning: "Tusculum" },
    { latin: "Ōstia", pos: "n.", forms: { nomSg: "Ōstia", genSg: "Ōstiae" }, declension: "1st", gender: "f.", meaning: "Ostia" },
    { latin: "Capua", pos: "n.", forms: { nomSg: "Capua", genSg: "Capuae" }, declension: "1st", gender: "f.", meaning: "Capua" },
    { latin: "Brundisium", pos: "n.", forms: { nomSg: "Brundisium", genSg: "Brundisiī" }, declension: "2nd", gender: "n.", meaning: "Brundisium" },
    { latin: "longus", pos: "adj.", forms: { nomSgM: "longus", nomSgF: "longa", nomSgN: "longum" }, meaning: "long" },
    { latin: "malus", pos: "adj.", forms: { nomSgM: "malus", nomSgF: "mala", nomSgN: "malum" }, meaning: "bad" },
    { latin: "fessus", pos: "adj.", forms: { nomSgM: "fessus", nomSgF: "fessa", nomSgN: "fessum" }, meaning: "tired" },
    { latin: "duodecim", pos: "num.", meaning: "twelve" },
    { latin: "īre", pos: "v.", principalParts: ["eō", "īre", "iī", "itum"], conjugation: "irreg.", meaning: "to go" },
    { latin: "portāre", pos: "v.", principalParts: ["portō", "portāre", "portāvī", "portātum"], conjugation: "1st conj.", meaning: "to carry" },
    { latin: "ambulāre", pos: "v.", principalParts: ["ambulō", "ambulāre", "ambulāvī", "ambulātum"], conjugation: "1st conj.", meaning: "to walk" },
    { latin: "vehere", pos: "v.", principalParts: ["vehō", "vehere", "vēxī", "vectum"], conjugation: "3rd conj.", meaning: "to carry, to transport" },
    { latin: "vehī", pos: "v.", principalParts: ["vehor", "vehī", "vectus sum"], conjugation: "3rd conj.", meaning: "to be carried, to ride" },
    { latin: "timēre", pos: "v.", principalParts: ["timeō", "timēre", "timuī"], conjugation: "2nd conj.", meaning: "to fear, to be afraid of" },
    { latin: "intrāre", pos: "v.", principalParts: ["intrō", "intrāre", "intrāvī", "intrātum"], conjugation: "1st conj.", meaning: "to enter" },
    { latin: "venīre", pos: "v.", principalParts: ["veniō", "venīre", "vēnī", "ventum"], conjugation: "4th conj.", meaning: "to come" },
    { latin: "tam", pos: "adv.", meaning: "so, as" },
    { latin: "quam", pos: "adv.", meaning: "as, than" },
    { latin: "inter", pos: "prep.", meaning: "between, among + acc." },
    { latin: "prope", pos: "prep.", meaning: "near + acc." },
    { latin: "procul ab", pos: "prep.", meaning: "far from + abl." },
    { latin: "circum", pos: "prep.", meaning: "around + acc." },
    { latin: "ad", pos: "prep.", meaning: "to, toward + acc." },
    { latin: "ante", pos: "prep.", meaning: "before, in front of + acc." },
    { latin: "post", pos: "prep.", meaning: "after, behind + acc." },
    { latin: "ā", pos: "prep.", meaning: "from, away from; by + abl." },
    { latin: "apud", pos: "prep.", meaning: "among, at the house of, with + acc." },
    { latin: "per", pos: "prep.", meaning: "through, along + acc." },
    { latin: "nam", pos: "conj.", meaning: "for, because" },
    { latin: "itaque", pos: "conj.", meaning: "and so, therefore" },
    { latin: "autem", pos: "conj.", meaning: "however, moreover" },
    { latin: "unde", pos: "adv.", meaning: "from where?" },
    { latin: "quō", pos: "adv.", meaning: "to where?" },
    { latin: "ubi", pos: "adv.", meaning: "where?" },
    { latin: "praepositiō", pos: "n.", forms: { nomSg: "praepositiō", genSg: "praepositiōnis" }, declension: "3rd", gender: "f.", meaning: "preposition" },
    { latin: "locātīvus", pos: "n.", forms: { nomSg: "locātīvus", genSg: "locātīvī" }, declension: "2nd", gender: "m.", meaning: "locative case" },
    { latin: "āctīvum", pos: "n.", forms: { nomSg: "āctīvum", genSg: "āctīvī" }, declension: "2nd", gender: "n.", meaning: "active voice" },
    { latin: "passīvum", pos: "n.", forms: { nomSg: "passīvum", genSg: "passīvī" }, declension: "2nd", gender: "n.", meaning: "passive voice" }
  ],
  exercises: [
    {
      id: "c6-mc-1",
      type: "multiple_choice",
      questionParts: [
        { text: "Which question word asks “to where?”" }
      ],
      choices: ["ubi?", "unde?", "quō?", "num?"],
      answer: "quō?",
      acceptableAnswers: ["quō", "quo"],
      explanation: "quō? asks about motion toward a place."
    },
    {
      id: "c6-mc-2",
      type: "multiple_choice",
      questionParts: [
        { text: "Which preposition takes the acc. in this chapter?" }
      ],
      choices: ["sine", "cum", "per", "ex"],
      answer: "per",
      explanation: "per takes the acc.; per portam means ‘through the gate.’"
    },
    {
      id: "c6-mc-3",
      type: "multiple_choice",
      questionParts: [
        { text: "Which form means “at Rome”?" }
      ],
      choices: ["Rōmam", "Rōmā", "Rōmae", "ad Rōmam"],
      answer: "Rōmae",
      acceptableAnswers: ["Romae"],
      explanation: "Rōmae is the locative form meaning ‘at Rome’ or ‘in Rome.’"
    },
    {
      id: "c6-fill-1",
      type: "fill_blank",
      questionParts: [
        { text: "Complete the sentence with the passive form: " },
        { text: "Saccus ā servō ", latin: true },
        { text: "____", latin: true, target: true },
        { text: "." }
      ],
      answer: "portātur",
      acceptableAnswers: ["portatur"],
      explanation: "portātur is the passive sg. form: ‘is carried.’"
    },
    {
      id: "c6-fill-2",
      type: "fill_blank",
      questionParts: [
        { text: "Complete the town-name motion phrase: " },
        { text: "Mēdus ", latin: true },
        { text: "____", latin: true, target: true },
        { text: " it", latin: true },
        { text: " = Medus goes to Rome." }
      ],
      answer: "Rōmam",
      acceptableAnswers: ["Romam"],
      explanation: "Motion toward a town can be expressed by the acc. alone: Rōmam."
    },
    {
      id: "c6-short-1",
      type: "short_answer",
      questionParts: [
        { text: "Translate into English: " },
        { text: "Cornēlius equō vehitur", latin: true, target: true },
        { text: "." }
      ],
      answer: "Cornelius rides a horse",
      acceptableAnswers: [
        "Cornelius is carried by horse",
        "Cornelius is carried on a horse",
        "Cornelius travels by horse"
      ],
      explanation: "vehitur is passive in form, but here it naturally means ‘rides’ or ‘travels by horse.’"
    },
    {
      id: "c6-case-1",
      type: "case_identification",
      questionParts: [
        { text: "Identify the morphology of " },
        { text: "portam", latin: true, target: true },
        { text: " in:" },
        { type: "line_break" },
        { text: "Servī per ", latin: true },
        { text: "portam", latin: true, target: true },
        { text: " intrant", latin: true },
        { text: "." }
      ],
      caseGrid: {
        cases: ["nom.", "voc.", "acc.", "gen.", "dat.", "abl."],
        numbers: ["sg.", "pl."],
        declension: "1st",
        gender: "f."
      },
      answer: "acc.; sg.; 1st; f.",
      acceptableAnswers: ["accusative; singular; first; feminine", "acc.; singular; 1st; f."],
      explanation: "portam is acc. sg.; per takes the acc."
    },
    {
      id: "c6-case-2",
      type: "case_identification",
      questionParts: [
        { text: "Identify the morphology of " },
        { text: "equō", latin: true, target: true },
        { text: " in:" },
        { type: "line_break" },
        { text: "Cornēlius ", latin: true },
        { text: "equō", latin: true, target: true },
        { text: " vehitur", latin: true },
        { text: "." }
      ],
      caseGrid: {
        cases: ["nom.", "voc.", "acc.", "gen.", "dat.", "abl."],
        numbers: ["sg.", "pl."],
        declension: "2nd",
        gender: "m."
      },
      answer: "abl.; sg.; 2nd; m.",
      acceptableAnswers: ["ablative; singular; second; masculine", "abl.; singular; 2nd; m."],
      explanation: "equō is abl. sg. of equus."
    },
    {
      id: "c6-transform-1",
      type: "form_transformation",
      questionParts: [
        { text: "Change the active form " },
        { text: "portat", latin: true, target: true },
        { text: " to passive sg." }
      ],
      answer: "portātur",
      acceptableAnswers: ["portatur"],
      explanation: "In the sg., active -t changes to passive -tur: portat → portātur."
    },
    {
      id: "c6-transform-2",
      type: "form_transformation",
      questionParts: [
        { text: "Change " },
        { text: "Rōma", latin: true, target: true },
        { text: " to the form meaning “to Rome.”" }
      ],
      answer: "Rōmam",
      acceptableAnswers: ["Romam"],
      explanation: "Motion toward a town uses acc.; Rōma becomes Rōmam."
    },
    {
      id: "c6-transform-3",
      type: "form_transformation",
      questionParts: [
        { text: "Change " },
        { text: "Tūsculum", latin: true, target: true },
        { text: " to the form meaning “from Tusculum.”" }
      ],
      answer: "Tūsculō",
      acceptableAnswers: ["Tusculo"],
      explanation: "Motion from a town uses abl.; Tūsculum becomes Tūsculō."
    }
  ]
};
