export const capitulum07 = {
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
};
