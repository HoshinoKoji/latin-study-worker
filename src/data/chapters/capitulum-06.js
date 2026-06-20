export const capitulum06 = {
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
};
