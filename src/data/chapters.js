export const chapters = {
  "5": {
    id: 5,
    title: "Capitulum V: Villa et Hortus",
    summary: {
      zh: "本章围绕 Iūlius 的别墅、花园、房间、门窗以及人物所在位置展开，重点训练地点表达和第一、第二变格名词的形式。",
      latinKeywords: ["villa", "hortus", "ātrium", "cubiculum", "ōstium", "fenestra"]
    },
    grammar: [
      {
        id: "c5-g1",
        topic: "in + abl.",
        explanation: "表示静态位置时，in 后接 abl.，例如 in villā, in hortō。",
        examples: [
          { latin: "Iūlius in villā est.", zh: "尤利乌斯在别墅里。" },
          { latin: "Puerī in hortō sunt.", zh: "男孩们在花园里。" }
        ]
      },
      {
        id: "c5-g2",
        topic: "Nom. / acc. 对比",
        explanation: "nom. 多用于主语，acc. 多用于直接宾语或方向、范围等结构。本阶段重点识别主语和宾语。",
        examples: [
          { latin: "Servus dominum videt.", zh: "奴隶看见主人。" }
        ]
      }
    ],
    vocab: [
      { latin: "villa", pos: "n.", declension: "1st", gender: "f.", meaning: "别墅" },
      { latin: "hortus", pos: "n.", declension: "2nd", gender: "m.", meaning: "花园" },
      { latin: "ātrium", pos: "n.", declension: "2nd", gender: "n.", meaning: "中庭" },
      { latin: "cubiculum", pos: "n.", declension: "2nd", gender: "n.", meaning: "卧室" },
      { latin: "ōstium", pos: "n.", declension: "2nd", gender: "n.", meaning: "门口；入口" },
      { latin: "fenestra", pos: "n.", declension: "1st", gender: "f.", meaning: "窗户" },
      { latin: "habēre", pos: "v.", meaning: "有，持有" },
      { latin: "vidēre", pos: "v.", meaning: "看见" }
    ],
    exercises: [
      {
        id: "c5-mc-1",
        type: "multiple_choice",
        question: "in villā 中 villā 是什么格？",
        choices: ["nom.", "acc.", "abl.", "gen."],
        answer: "abl.",
        explanation: "in 表示静态位置时支配 abl.。"
      },
      {
        id: "c5-mc-2",
        type: "multiple_choice",
        question: "hortus 的 declension 和 gender 是？",
        choices: ["1st f.", "2nd m.", "2nd n.", "3rd m."],
        answer: "2nd m.",
        explanation: "hortus, -ī 是 2nd decl. masculine。"
      }
    ]
  },
  "6": {
    id: 6,
    title: "Capitulum VI: Via Latīna",
    summary: {
      zh: "本章介绍道路、城镇、旅行和位置关系，重点训练介词、方向表达以及地点之间的距离和路线。",
      latinKeywords: ["via", "oppidum", "Rōma", "Tūsculum", "prope", "inter"]
    },
    grammar: [
      {
        id: "c6-g1",
        topic: "介词 + acc.",
        explanation: "若表达方向、移动或某些空间关系，介词常接 acc.。初学阶段要逐个记忆介词的支配格。",
        examples: [
          { latin: "Iūlius ad villam it.", zh: "尤利乌斯往别墅去。" }
        ]
      },
      {
        id: "c6-g2",
        topic: "ubi? / quō?",
        explanation: "ubi? 问在哪里，常对应静态位置；quō? 问到哪里，常对应方向。",
        examples: [
          { latin: "Ubi est Rōma?", zh: "罗马在哪里？" },
          { latin: "Quō it servus?", zh: "奴隶往哪里去？" }
        ]
      }
    ],
    vocab: [
      { latin: "via", pos: "n.", declension: "1st", gender: "f.", meaning: "道路" },
      { latin: "oppidum", pos: "n.", declension: "2nd", gender: "n.", meaning: "城镇" },
      { latin: "fluvius", pos: "n.", declension: "2nd", gender: "m.", meaning: "河流" },
      { latin: "īre", pos: "v.", meaning: "去，走" },
      { latin: "abesse", pos: "v.", meaning: "离开；相距" },
      { latin: "prope", pos: "prep.", meaning: "靠近" },
      { latin: "inter", pos: "prep.", meaning: "在……之间" }
    ],
    exercises: [
      {
        id: "c6-mc-1",
        type: "multiple_choice",
        question: "ubi? 通常问什么？",
        choices: ["在哪里", "到哪里", "从哪里", "为什么"],
        answer: "在哪里",
        explanation: "ubi? 是地点疑问副词，询问静态位置。"
      },
      {
        id: "c6-mc-2",
        type: "multiple_choice",
        question: "via 的 declension 和 gender 是？",
        choices: ["1st f.", "2nd m.", "2nd n.", "3rd f."],
        answer: "1st f.",
        explanation: "via, -ae 是 1st decl. feminine。"
      }
    ]
  },
  "7": {
    id: 7,
    title: "Capitulum VII: Puella et Rosa",
    summary: {
      zh: "本章围绕 puella, rosa, ancilla 等人物和物品展开，重点训练宾语、给予/展示等动词结构，以及单复数形式。",
      latinKeywords: ["puella", "rosa", "ancilla", "domina", "dare", "ostendere"]
    },
    grammar: [
      {
        id: "c7-g1",
        topic: "Acc. 作直接宾语",
        explanation: "动词直接作用的对象通常用 acc.。例如 puellam videt 中 puellam 是被看见的人。",
        examples: [
          { latin: "Iūlius puellam videt.", zh: "尤利乌斯看见女孩。" }
        ]
      },
      {
        id: "c7-g2",
        topic: "Dat. 作间接宾语",
        explanation: "表示给谁、向谁时常用 dat.。例如 puellae rosam dat 表示把玫瑰给女孩。",
        examples: [
          { latin: "Ancilla puellae rosam dat.", zh: "女仆把玫瑰给女孩。" }
        ]
      }
    ],
    vocab: [
      { latin: "puella", pos: "n.", declension: "1st", gender: "f.", meaning: "女孩" },
      { latin: "rosa", pos: "n.", declension: "1st", gender: "f.", meaning: "玫瑰" },
      { latin: "ancilla", pos: "n.", declension: "1st", gender: "f.", meaning: "女仆" },
      { latin: "domina", pos: "n.", declension: "1st", gender: "f.", meaning: "女主人" },
      { latin: "dare", pos: "v.", meaning: "给" },
      { latin: "ostendere", pos: "v.", meaning: "展示，指出" }
    ],
    exercises: [
      {
        id: "c7-mc-1",
        type: "multiple_choice",
        question: "Ancilla puellae rosam dat. 中 puellae 是什么功能？",
        choices: ["主语", "直接宾语", "间接宾语", "表语"],
        answer: "间接宾语",
        explanation: "puellae 是 dat.，表示“给女孩”。"
      },
      {
        id: "c7-mc-2",
        type: "multiple_choice",
        question: "动词单列时应写作哪种形式？",
        choices: ["dat", "dant", "dare", "dedit"],
        answer: "dare",
        explanation: "本项目约定动词单列时统一使用不定式。"
      }
    ]
  }
};
