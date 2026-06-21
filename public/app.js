const chapterList = document.querySelector("#chapter-list");
const chapterContent = document.querySelector("#chapter-content");

init().catch((error) => {
  chapterList.textContent = "Failed to load chapters.";
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
  const summary = chapter.summary.en ?? chapter.summary.zh ?? "";

  chapterContent.innerHTML = `
    <header class="chapter-header">
      <p class="eyebrow">Capitulum ${chapter.id}</p>
      <h2>${escapeHtml(chapter.title)}</h2>
      <p>${escapeHtml(summary)}</p>
      <p class="keywords">${chapter.summary.latinKeywords.map(escapeHtml).join(" · ")}</p>
    </header>

    <section class="content-section">
      <h3>Grammar</h3>
      ${chapter.grammar.map(renderGrammarCard).join("")}
    </section>

    <section class="content-section">
      <h3>Vocabulary</h3>
      ${renderVocabTable(chapter.vocab)}
    </section>

    <section class="content-section">
      <h3>Exercises</h3>
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
          .map((example) => {
            const translation = example.translation ?? example.en ?? example.zh ?? "";
            return `<li><em>${escapeHtml(example.latin)}</em> — ${escapeHtml(translation)}</li>`;
          })
          .join("")}
      </ul>
    </article>
  `;
}

function renderVocabTable(vocab) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Latin</th>
            <th>Part of speech</th>
            <th>Decl.</th>
            <th>Gender</th>
            <th>Meaning</th>
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
    </div>
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
      <button type="button" class="check-button">Check answer</button>
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
    result.textContent = "Choose an answer first.";
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

  result.textContent = `${response.correct ? "Correct" : "Not quite"}. Answer: ${response.expected}. ${response.explanation}`;
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
