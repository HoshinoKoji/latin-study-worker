export const capitulum05 = {
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
};
