const chapterList = document.querySelector("#chapter-list");
const chapterContent = document.querySelector("#chapter-content");

init().catch((error) => {
  chapterList.textContent = "加载失败";
  chapterContent.innerHTML = `<p class="error">${escapeHtml(error.message)}</p>`;
});

async function init() {
  const chapters = await fetchJson("/api/chapters");
  chapterList.innerHTML = chapters
    .map(
      (chapter) => `
        <button class="chapter-button" data-chapter-id="${chapter.id}">
          <strong>${escapeHtml(chapter.title)}</strong>
          <span>${escapeHtml(chapter.summary)}</span>
        </button>
      `
    )
    .join("");

  chapterList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-chapter-id]");
    if (!button) return;
    await renderChapter(button.dataset.chapterId);
  });
}

async function renderChapter(id) {
  const chapter = await fetchJson(`/api/chapters/${id}`);

  chapterContent.innerHTML = `
    <h2>${escapeHtml(chapter.title)}</h2>
    <section>
      <h3>课文摘要</h3>
      <p>${escapeHtml(chapter.summary.zh)}</p>
      <p class="keywords">${chapter.summary.latinKeywords.map(escapeHtml).join(" · ")}</p>
    </section>

    <section>
      <h3>语法</h3>
      ${chapter.grammar.map(renderGrammarCard).join("")}
    </section>

    <section>
      <h3>词汇</h3>
      ${renderVocabTable(chapter.vocab)}
    </section>

    <section>
      <h3>练习</h3>
      ${chapter.exercises.map((exercise) => renderExercise(chapter.id, exercise)).join("")}
    </section>
  `;
}

function renderGrammarCard(item) {
  return `
    <article class="card">
      <h4>${escapeHtml(item.topic)}</h4>
      <p>${escapeHtml(item.explanation)}</p>
      <ul>
        ${item.examples
          .map((example) => `<li><em>${escapeHtml(example.latin)}</em> — ${escapeHtml(example.zh)}</li>`)
          .join("")}
      </ul>
    </article>
  `;
}

function renderVocabTable(vocab) {
  return `
    <table>
      <thead>
        <tr>
          <th>Latin</th>
          <th>词性</th>
          <th>decl.</th>
          <th>gender</th>
          <th>中文</th>
        </tr>
      </thead>
      <tbody>
        ${vocab
          .map(
            (item) => `
              <tr>
                <td><strong>${escapeHtml(item.latin)}</strong></td>
                <td>${escapeHtml(item.pos ?? "")}</td>
                <td>${escapeHtml(item.declension ?? "")}</td>
                <td>${escapeHtml(item.gender ?? "")}</td>
                <td>${escapeHtml(item.meaning ?? "")}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderExercise(chapterId, exercise) {
  const name = `${chapterId}-${exercise.id}`;
  return `
    <article class="card exercise" data-chapter-id="${chapterId}" data-exercise-id="${exercise.id}">
      <h4>${escapeHtml(exercise.question)}</h4>
      <div class="choices">
        ${exercise.choices
          .map(
            (choice) => `
              <label>
                <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(choice)}" />
                ${escapeHtml(choice)}
              </label>
            `
          )
          .join("")}
      </div>
      <button type="button" class="check-button">检查答案</button>
      <p class="result" aria-live="polite"></p>
    </article>
  `;
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest(".check-button");
  if (!button) return;

  const card = button.closest(".exercise");
  const checked = card.querySelector("input:checked");
  const result = card.querySelector(".result");

  if (!checked) {
    result.textContent = "请先选择一个答案。";
    return;
  }

  const response = await fetchJson("/api/check-answer", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chapterId: card.dataset.chapterId,
      exerciseId: card.dataset.exerciseId,
      answer: checked.value
    })
  });

  result.textContent = `${response.correct ? "正确" : "不正确"}。答案：${response.expected}。${response.explanation}`;
});

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
