export const capitulum05 = {
  id: 5,
  title: "Capitulum V: Villa et Hortus",
  summary: {
    en: "This chapter describes Iūlius's villa, garden, atrium, peristyle, bedrooms, and the family members inside or away from the house. It consolidates the acc. direct object, introduces the abl. with common prepositions, and contrasts singular and plural imperatives.",
    latinKeywords: [
      "villa",
      "hortus",
      "rosa",
      "līlium",
      "ātrium",
      "impluvium",
      "peristylum",
      "cubiculum",
      "in",
      "ex",
      "ab",
      "cum",
      "sine",
      "accūsātīvus",
      "ablātīvus",
      "imperātīvus"
    ]
  },
  vocabOptions: {
    showForms: true
  },
  grammar: [
    {
      id: "c5-g1",
      topic: "Acc. sg. and pl. direct objects",
      explanation: "The acc. marks the direct object. In this chapter, 1st- and 2nd-declension acc. endings are practiced in both sg. and pl.",
      examples: [
        { latin: "Iūlius duōs fīliōs habet.", translation: "Iulius has two sons." },
        { latin: "Iūlia rosās carpit.", translation: "Iulia picks roses." }
      ]
    },
    {
      id: "c5-g2",
      topic: "Neuter nom. = acc.",
      explanation: "In neuter nouns, nom. and acc. have the same forms. In the 2nd declension, acc. sg. ends in -um and acc. pl. ends in -a, just like the nom.",
      examples: [
        { latin: "Villa multa cubicula habet.", translation: "The villa has many bedrooms." },
        { latin: "Iūlius multa līlia videt.", translation: "Iulius sees many lilies." }
      ]
    },
    {
      id: "c5-g3",
      topic: "Abl. with in for location",
      explanation: "When in means ‘in’ or ‘inside’ and describes a static location, it takes the abl. The question is ubi? — where?",
      examples: [
        { latin: "Aemilia in peristylō est.", translation: "Aemilia is in the peristyle." },
        { latin: "In impluviō aqua est.", translation: "There is water in the impluvium." }
      ]
    },
    {
      id: "c5-g4",
      topic: "Abl. sg. and pl. endings",
      explanation: "For the nouns practiced here, abl. sg. is -ā in 1st-declension nouns and -ō in 2nd-declension nouns. Abl. pl. is -īs in both declensions.",
      examples: [
        { latin: "in villā / in villīs", translation: "in the villa / in the villas" },
        { latin: "in hortō / in hortīs", translation: "in the garden / in the gardens" }
      ]
    },
    {
      id: "c5-g5",
      topic: "ex and ab/ā + abl.",
      explanation: "ex + abl. means ‘out of’ or ‘from inside.’ ab/ā + abl. means ‘away from’ a person or place. Use ā before many words beginning with a vowel, and ab elsewhere.",
      examples: [
        { latin: "Iūlia ex hortō venit.", translation: "Iulia comes out of the garden." },
        { latin: "Iūlia ab Aemiliā discēdit.", translation: "Iulia goes away from Aemilia." }
      ]
    },
    {
      id: "c5-g6",
      topic: "cum and sine + abl.",
      explanation: "cum + abl. means ‘with.’ sine + abl. means ‘without.’ These prepositions are useful for describing who is present with someone and who is absent.",
      examples: [
        { latin: "Aemilia cum līberīs est.", translation: "Aemilia is with the children." },
        { latin: "Aemilia sine virō suō est.", translation: "Aemilia is without her husband." }
      ]
    },
    {
      id: "c5-g7",
      topic: "Imperative sg. and pl.",
      explanation: "A sg. imperative commands one person; a pl. imperative commands more than one. The pl. imperative usually adds -te to the sg. command form.",
      examples: [
        { latin: "Voca Iūliam! Vocāte Iūliam!", translation: "Call Iulia! Call Iulia!" },
        { latin: "Tacē, puer! Tacēte, puerī!", translation: "Be quiet, boy! Be quiet, boys!" }
      ]
    },
    {
      id: "c5-g8",
      topic: "Indicative sg. and pl.: -t / -nt",
      explanation: "The 3rd-person sg. indicative ends in -t, while the 3rd-person pl. indicative ends in -nt. Compare one subject with several subjects.",
      examples: [
        { latin: "Servus dominum salūtat.", translation: "The slave greets the master." },
        { latin: "Servī dominum salūtant.", translation: "The slaves greet the master." }
      ]
    },
    {
      id: "c5-g9",
      topic: "is, ea, id and their forms",
      explanation: "The pronoun is, ea, id can mean ‘he, she, it’ or ‘that one.’ Its form changes according to gender, number, and case.",
      examples: [
        { latin: "Aemilia eum amat.", translation: "Aemilia loves him." },
        { latin: "Iūlius cum eā habitat.", translation: "Iulius lives with her." }
      ]
    }
  ],
  vocab: [
    { latin: "villa", pos: "n.", forms: { nomSg: "villa", genSg: "villae" }, declension: "1st", gender: "f.", meaning: "villa, country house" },
    { latin: "hortus", pos: "n.", forms: { nomSg: "hortus", genSg: "hortī" }, declension: "2nd", gender: "m.", meaning: "garden" },
    { latin: "rosa", pos: "n.", forms: { nomSg: "rosa", genSg: "rosae" }, declension: "1st", gender: "f.", meaning: "rose" },
    { latin: "līlium", pos: "n.", forms: { nomSg: "līlium", genSg: "līliī" }, declension: "2nd", gender: "n.", meaning: "lily" },
    { latin: "nāsus", pos: "n.", forms: { nomSg: "nāsus", genSg: "nāsī" }, declension: "2nd", gender: "m.", meaning: "nose" },
    { latin: "ōstium", pos: "n.", forms: { nomSg: "ōstium", genSg: "ōstiī" }, declension: "2nd", gender: "n.", meaning: "door, entrance" },
    { latin: "fenestra", pos: "n.", forms: { nomSg: "fenestra", genSg: "fenestrae" }, declension: "1st", gender: "f.", meaning: "window" },
    { latin: "ātrium", pos: "n.", forms: { nomSg: "ātrium", genSg: "ātriī" }, declension: "2nd", gender: "n.", meaning: "atrium, main hall" },
    { latin: "impluvium", pos: "n.", forms: { nomSg: "impluvium", genSg: "impluviī" }, declension: "2nd", gender: "n.", meaning: "impluvium, rain-water basin" },
    { latin: "aqua", pos: "n.", forms: { nomSg: "aqua", genSg: "aquae" }, declension: "1st", gender: "f.", meaning: "water" },
    { latin: "peristylum", pos: "n.", forms: { nomSg: "peristylum", genSg: "peristylī" }, declension: "2nd", gender: "n.", meaning: "peristyle, colonnaded courtyard" },
    { latin: "cubiculum", pos: "n.", forms: { nomSg: "cubiculum", genSg: "cubiculī" }, declension: "2nd", gender: "n.", meaning: "bedroom" },
    { latin: "oppidum", pos: "n.", forms: { nomSg: "oppidum", genSg: "oppidī" }, declension: "2nd", gender: "n.", meaning: "town" },
    { latin: "vir", pos: "n.", forms: { nomSg: "vir", genSg: "virī" }, declension: "2nd", gender: "m.", meaning: "man, husband" },
    { latin: "līberī", pos: "n.", forms: { nomSg: "līber", genSg: "līberī" }, declension: "2nd", gender: "m.", meaning: "children" },
    { latin: "pulcher", pos: "adj.", forms: { nomSgM: "pulcher", nomSgF: "pulchra", nomSgN: "pulchrum" }, meaning: "beautiful" },
    { latin: "foedus", pos: "adj.", forms: { nomSgM: "foedus", nomSgF: "foeda", nomSgN: "foedum" }, meaning: "ugly" },
    { latin: "sōlus", pos: "adj.", forms: { nomSgM: "sōlus", nomSgF: "sōla", nomSgN: "sōlum" }, meaning: "alone, only" },
    { latin: "parvus", pos: "adj.", forms: { nomSgM: "parvus", nomSgF: "parva", nomSgN: "parvum" }, meaning: "small" },
    { latin: "magnus", pos: "adj.", forms: { nomSgM: "magnus", nomSgF: "magna", nomSgN: "magnum" }, meaning: "large, great" },
    { latin: "bonus", pos: "adj.", forms: { nomSgM: "bonus", nomSgF: "bona", nomSgN: "bonum" }, meaning: "good" },
    { latin: "habēre", pos: "v.", principalParts: ["habeō", "habēre", "habuī", "habitum"], conjugation: "2nd conj.", meaning: "to have, to hold" },
    { latin: "habitāre", pos: "v.", principalParts: ["habitō", "habitāre", "habitāvī", "habitātum"], conjugation: "1st conj.", meaning: "to live, to dwell" },
    { latin: "amāre", pos: "v.", principalParts: ["amō", "amāre", "amāvī", "amātum"], conjugation: "1st conj.", meaning: "to love" },
    { latin: "vidēre", pos: "v.", principalParts: ["videō", "vidēre", "vīdī", "vīsum"], conjugation: "2nd conj.", meaning: "to see" },
    { latin: "carpere", pos: "v.", principalParts: ["carpō", "carpere", "carpsī", "carptum"], conjugation: "3rd conj.", meaning: "to pick, to pluck" },
    { latin: "dēlectāre", pos: "v.", principalParts: ["dēlectō", "dēlectāre", "dēlectāvī", "dēlectātum"], conjugation: "1st conj.", meaning: "to delight, to please" },
    { latin: "agere", pos: "v.", principalParts: ["agō", "agere", "ēgī", "āctum"], conjugation: "3rd conj.", meaning: "to do, to drive, to act" },
    { latin: "dormīre", pos: "v.", principalParts: ["dormiō", "dormīre", "dormīvī", "dormītum"], conjugation: "4th conj.", meaning: "to sleep" },
    { latin: "discēdere", pos: "v.", principalParts: ["discēdō", "discēdere", "discessī", "discessum"], conjugation: "3rd conj.", meaning: "to go away, to depart" },
    { latin: "venīre", pos: "v.", principalParts: ["veniō", "venīre", "vēnī", "ventum"], conjugation: "4th conj.", meaning: "to come" },
    { latin: "vocāre", pos: "v.", principalParts: ["vocō", "vocāre", "vocāvī", "vocātum"], conjugation: "1st conj.", meaning: "to call" },
    { latin: "tacēre", pos: "v.", principalParts: ["taceō", "tacēre", "tacuī", "tacitum"], conjugation: "2nd conj.", meaning: "to be silent" },
    { latin: "esse", pos: "v.", principalParts: ["sum", "esse", "fuī"], conjugation: "irreg.", meaning: "to be" },
    { latin: "adesse", pos: "v.", principalParts: ["adsum", "adesse", "adfuī"], conjugation: "irreg.", meaning: "to be present" },
    { latin: "abesse", pos: "v.", principalParts: ["absum", "abesse", "āfuī"], conjugation: "irreg.", meaning: "to be away, to be absent" },
    { latin: "etiam", pos: "adv.", meaning: "also, even" },
    { latin: "rūrsus", pos: "adv.", meaning: "again" },
    { latin: "cum", pos: "prep.", meaning: "with + abl." },
    { latin: "sine", pos: "prep.", meaning: "without + abl." },
    { latin: "ab", pos: "prep.", meaning: "from, away from + abl." },
    { latin: "ā", pos: "prep.", meaning: "from, away from + abl." },
    { latin: "ex", pos: "prep.", meaning: "out of, from + abl." },
    { latin: "in", pos: "prep.", meaning: "in, on + abl. for location" },
    { latin: "ea", pos: "pron.", meaning: "she; they, those things; by/with/from her" },
    { latin: "id", pos: "pron.", meaning: "it, that thing" },
    { latin: "eō", pos: "pron.", meaning: "by/with/from him or it" },
    { latin: "eae", pos: "pron.", meaning: "they, those women" },
    { latin: "iī", pos: "pron.", meaning: "they, those men" },
    { latin: "eōs", pos: "pron.", meaning: "them, those men" },
    { latin: "eās", pos: "pron.", meaning: "them, those women" },
    { latin: "eōrum", pos: "pron.", meaning: "of them, of those men or things" },
    { latin: "eārum", pos: "pron.", meaning: "of them, of those women" },
    { latin: "iīs", pos: "pron.", meaning: "to/for/by/with/from them" }
  ],
  exercises: [
    {
      id: "c5-mc-1",
      type: "multiple_choice",
      questionParts: [
        { text: "In " },
        { text: "Aemilia in peristylō est", latin: true },
        { text: ", what case is " },
        { text: "peristylō", latin: true, target: true },
        { text: "?" }
      ],
      choices: ["nom.", "voc.", "acc.", "abl."],
      answer: "abl.",
      explanation: "Static location with in takes the abl.; peristylō is abl. sg."
    },
    {
      id: "c5-mc-2",
      type: "multiple_choice",
      questionParts: [
        { text: "Which phrase means “without the husband”?" }
      ],
      choices: ["cum virō", "sine virō", "ex virō", "in virō"],
      answer: "sine virō",
      explanation: "sine + abl. means ‘without.’ virō is abl. sg."
    },
    {
      id: "c5-fill-1",
      type: "fill_blank",
      questionParts: [
        { text: "Complete the sentence: " },
        { text: "Iūlia rosās in hortō ", latin: true },
        { text: "____", latin: true, target: true },
        { text: "." }
      ],
      answer: "carpit",
      acceptableAnswers: ["carpit."],
      explanation: "carpit means ‘picks’ or ‘plucks’; rosās is the acc. pl. direct object."
    },
    {
      id: "c5-fill-2",
      type: "fill_blank",
      questionParts: [
        { text: "Use the correct case after " },
        { text: "cum", latin: true, target: true },
        { text: ": " },
        { text: "Aemilia cum līber", latin: true },
        { text: "____", latin: true, target: true },
        { text: " est", latin: true },
        { text: "." }
      ],
      answer: "īs",
      acceptableAnswers: ["is", "līberīs", "liberis"],
      explanation: "cum takes the abl.; līberī has abl. pl. līberīs."
    },
    {
      id: "c5-short-1",
      type: "short_answer",
      questionParts: [
        { text: "Translate into English: " },
        { text: "Villa multa cubicula habet", latin: true, target: true },
        { text: "." }
      ],
      answer: "The villa has many bedrooms",
      acceptableAnswers: [
        "A villa has many bedrooms",
        "The country house has many bedrooms",
        "The villa has a lot of bedrooms"
      ],
      explanation: "cubicula is neuter acc. pl.; it is the direct object of habet."
    },
    {
      id: "c5-case-1",
      type: "case_identification",
      questionParts: [
        { text: "Identify the morphology of " },
        { text: "rosās", latin: true, target: true },
        { text: " in:" },
        { type: "line_break" },
        { text: "Iūlia ", latin: true },
        { text: "rosās", latin: true, target: true },
        { text: " carpit", latin: true },
        { text: "." }
      ],
      caseGrid: {
        cases: ["nom.", "voc.", "acc.", "gen.", "dat.", "abl."],
        numbers: ["sg.", "pl."],
        declension: "1st",
        gender: "f."
      },
      answer: "acc.; pl.; 1st; f.",
      acceptableAnswers: ["accusative; plural; first; feminine", "acc.; plural; 1st; f."],
      explanation: "rosās is acc. pl. of rosa, a 1st-declension feminine noun."
    },
    {
      id: "c5-case-2",
      type: "case_identification",
      questionParts: [
        { text: "Identify the morphology of " },
        { text: "hortō", latin: true, target: true },
        { text: " in:" },
        { type: "line_break" },
        { text: "Iūlia in ", latin: true },
        { text: "hortō", latin: true, target: true },
        { text: " est", latin: true },
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
      explanation: "hortō is abl. sg.; in + abl. expresses location here."
    },
    {
      id: "c5-transform-1",
      type: "form_transformation",
      questionParts: [
        { text: "Change " },
        { text: "fīlius", latin: true, target: true },
        { text: " to acc. pl." }
      ],
      answer: "fīliōs",
      acceptableAnswers: ["filios"],
      explanation: "2nd-declension masculine acc. pl. ends in -ōs: fīlius → fīliōs."
    },
    {
      id: "c5-transform-2",
      type: "form_transformation",
      questionParts: [
        { text: "Change " },
        { text: "villa", latin: true, target: true },
        { text: " to abl. sg." }
      ],
      answer: "villā",
      acceptableAnswers: ["villa"],
      explanation: "1st-declension abl. sg. ends in long -ā: villa → villā."
    },
    {
      id: "c5-transform-3",
      type: "form_transformation",
      questionParts: [
        { text: "Change the singular command " },
        { text: "voca", latin: true, target: true },
        { text: " to the plural command." }
      ],
      answer: "vocāte",
      acceptableAnswers: ["vocate"],
      explanation: "The pl. imperative of a 1st-conjugation verb adds -te: vocā → vocāte."
    }
  ]
};
