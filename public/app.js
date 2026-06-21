const sideNav = document.querySelector(".side-nav");
const chapterList = document.querySelector("#chapter-list");
const sectionList = document.querySelector("#section-list");
const chapterContent = document.querySelector("#chapter-content");

const sectionNavItems = [
  { id: "chapter-overview", label: "Overview" },
  { id: "chapter-grammar", label: "Grammar" },
  { id: "chapter-vocabulary", label: "Vocabulary" },
  { id: "chapter-exercises", label: "Exercises" }
];

let activeSectionFrame = 0;

const exerciseTypeLabels = {
  multiple_choice: "Multiple choice",
  fill_blank: "Fill in the blank",
  short_answer: "Short answer",
  case_identification: "Case identification",
  form_transformation: "Form transformation"
};

init().catch((error) => {
  chapterList.textContent = "Failed to load chapters.";
  chapterContent.innerHTML = `<p class="error">${escapeHtml(error.message)}</p>`;
});

async function init() {
  showChapterSelection();

  const chapters = await fetchJson("/api/chapters");
  chapterList.innerHTML = chapters
    .map(
      (chapter) => `
        <button class="chapter-button" type="button" data-chapter-id="${chapter.id}">
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
    <header class="chapter-header" id="chapter-overview">
      <p class="eyebrow">Capitulum ${chapter.id}</p>
      <h2>${escapeHtml(chapter.title)}</h2>
      <p>${escapeHtml(summary)}</p>
      <p class="keywords">${chapter.summary.latinKeywords.map(escapeHtml).join(" · ")}</p>
    </header>

    <section class="content-section" id="chapter-grammar">
      <h3>Grammar</h3>
      ${chapter.grammar.map(renderGrammarCard).join("")}
    </section>

    <section class="content-section" id="chapter-vocabulary">
      <h3>Vocabulary</h3>
      ${renderVocabTable(chapter.vocab, chapter.vocabOptions)}
    </section>

    <section class="content-section" id="chapter-exercises">
      <h3>Exercises</h3>
      ${chapter.exercises.map((exercise) => renderExercise(chapter.id, exercise)).join("")}
    </section>
  `;

  setActiveChapterButton(chapter.id);
  renderSectionNavigation(chapter);
  showPageNavigation();
  setActiveSectionLink("chapter-overview");
  updateActiveSectionFromScroll();
}

function showChapterSelection() {
  sideNav?.classList.remove("has-active-chapter");
  renderSectionNavigation();
}

function showPageNavigation() {
  sideNav?.classList.add("has-active-chapter");
}

function renderSectionNavigation(chapter) {
  if (!sectionList) return;

  if (!chapter) {
    sectionList.innerHTML = "";
    return;
  }

  sectionList.innerHTML = `
    <button class="back-to-chapters" type="button">← Choose chapter</button>
    <p class="current-chapter">${escapeHtml(chapter.title)}</p>
    <div class="section-links">
      ${sectionNavItems
        .map(
          (item) => `
            <a class="section-link" href="#${item.id}" data-section-id="${item.id}">
              ${escapeHtml(item.label)}
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function setActiveChapterButton(chapterId) {
  chapterList.querySelectorAll(".chapter-button").forEach((button) => {
    const isActive = button.dataset.chapterId === String(chapterId);
    button.classList.toggle("is-active", isActive);

    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function setActiveSectionLink(sectionId) {
  if (!sectionList) return;

  sectionList.querySelectorAll(".section-link").forEach((link) => {
    const isActive = link.dataset.sectionId === sectionId;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function scheduleActiveSectionUpdate() {
  if (!sideNav?.classList.contains("has-active-chapter")) return;
  if (activeSectionFrame) return;

  activeSectionFrame = window.requestAnimationFrame(() => {
    activeSectionFrame = 0;
    updateActiveSectionFromScroll();
  });
}

function updateActiveSectionFromScroll() {
  const sections = sectionNavItems.map((item) => document.getElementById(item.id)).filter(Boolean);
  if (!sections.length) return;

  const lastSection = sections[sections.length - 1];
  const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (isAtPageBottom) {
    setActiveSectionLink(lastSection.id);
    return;
  }

  const activationLine = Math.min(window.innerHeight * 0.28, 180);
  let activeSectionId = sections[0].id;

  sections.forEach((section) => {
    const { top } = section.getBoundingClientRect();
    if (top <= activationLine) {
      activeSectionId = section.id;
    }
  });

  setActiveSectionLink(activeSectionId);
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

function renderVocabTable(vocab, options = {}) {
  const showForms = options.showForms ?? true;

  return `
    <div class="table-wrap vocab-wrap">
      <table class="vocab-table ${showForms ? "has-forms" : "no-forms"}">
        <thead>
          <tr>
            <th>Latin</th>
            ${showForms ? "<th>Forms</th>" : ""}
            <th>Grammar</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          ${vocab
            .map(
              (item) => `
                <tr>
                  <td><strong>${escapeHtml(item.latin)}</strong></td>
                  ${showForms ? `<td class="vocab-forms">${escapeHtml(renderVocabForms(item))}</td>` : ""}
                  <td>${escapeHtml(renderVocabGrammar(item))}</td>
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

function renderVocabForms(item) {
  if (item.pos === "n.") {
    const nomSg = item.forms?.nomSg ?? item.latin;
    const genSg = item.forms?.genSg ?? inferGenitiveSingular(item);
    return [nomSg, genSg].filter(Boolean).join(", ");
  }

  if (item.pos === "v.") {
    return (item.principalParts ?? [item.latin]).join(", ");
  }

  return "—";
}

function renderVocabGrammar(item) {
  if (item.pos === "n.") {
    return [item.declension, item.gender].filter(Boolean).join(" ");
  }

  if (item.pos === "v.") {
    return item.conjugation ?? "v.";
  }

  return item.pos ?? "";
}

function inferGenitiveSingular(item) {
  if (item.declension === "1st" && item.latin.endsWith("a")) {
    return `${item.latin.slice(0, -1)}ae`;
  }

  if (item.declension === "2nd") {
    if (item.latin.endsWith("us") || item.latin.endsWith("um")) {
      return `${item.latin.slice(0, -2)}ī`;
    }
  }

  return "";
}

function renderExercise(chapterId, exercise) {
  const name = `${chapterId}-${exercise.id}`;
  const label = exerciseTypeLabels[exercise.type] ?? exercise.type;

  return `
    <article class="card exercise" data-chapter-id="${chapterId}" data-exercise-id="${exercise.id}" data-exercise-type="${escapeHtml(exercise.type)}">
      <p class="exercise-type">${escapeHtml(label)}</p>
      <h4 class="exercise-prompt">${renderPrompt(exercise)}</h4>
      ${renderExerciseInput(name, exercise)}
      <button type="button" class="check-button">Check answer</button>
      <p class="result" aria-live="polite"></p>
    </article>
  `;
}

function renderPrompt(exercise) {
  if (!Array.isArray(exercise.questionParts)) {
    return escapeHtml(exercise.question ?? exercise.prompt ?? "");
  }

  return exercise.questionParts
    .map((part) => {
      if (part.type === "line_break") return "<br />";
      const classes = ["prompt-token"];
      if (part.latin) classes.push("latin-token");
      if (part.target) classes.push("target-token");
      return `<span class="${classes.join(" ")}">${escapeHtml(part.text ?? "")}</span>`;
    })
    .join("");
}

function renderExerciseInput(name, exercise) {
  if (exercise.type === "multiple_choice") {
    return `
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
    `;
  }

  if (exercise.type === "case_identification" && exercise.caseGrid) {
    return renderCaseGrid(exercise.caseGrid);
  }

  if (exercise.type === "short_answer") {
    return `
      <textarea class="answer-input" name="${escapeHtml(name)}" rows="3" placeholder="Type a short answer"></textarea>
    `;
  }

  return `
    <input class="answer-input" type="text" name="${escapeHtml(name)}" placeholder="Type your answer" autocomplete="off" />
  `;
}

function renderCaseGrid(caseGrid) {
  const rows = caseGrid.cases ?? [];
  const columns = caseGrid.numbers ?? caseGrid.functions ?? [];
  const declension = caseGrid.declension ?? "";
  const gender = caseGrid.gender ?? "";
  const morphologyParts = [
    declension ? `Declension: <strong>${escapeHtml(declension)}</strong>` : "",
    gender ? `Gender: <strong>${escapeHtml(gender)}</strong>` : ""
  ].filter(Boolean);
  const cornerLabel = "Case";
  const ariaLabel = caseGrid.numbers ? "Choose case and number" : "Choose case and function";

  return `
    <div class="case-grid" role="group" aria-label="${escapeHtml(ariaLabel)}">
      ${morphologyParts.length ? `<p class="morphology-note">${morphologyParts.join(" · ")}</p>` : ""}
      <div class="case-grid-wrap">
        <table class="case-grid-table">
          <thead>
            <tr>
              <th>${escapeHtml(cornerLabel)}</th>
              ${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <th scope="row">${escapeHtml(row)}</th>
                    ${columns
                      .map((column) => {
                        const value = [row, column, declension, gender].filter(Boolean).join("; ");
                        return `
                          <td>
                            <button type="button" class="case-cell" data-answer="${escapeHtml(value)}" aria-pressed="false">
                              <span class="sr-only">${escapeHtml(value)}</span>
                            </button>
                          </td>
                        `;
                      })
                      .join("")}
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveSectionUpdate);

document.addEventListener("click", async (event) => {
  const backButton = event.target.closest(".back-to-chapters");
  if (backButton) {
    showChapterSelection();
    return;
  }

  const sectionLink = event.target.closest(".section-link");
  if (sectionLink) {
    setActiveSectionLink(sectionLink.dataset.sectionId);
    return;
  }

  const caseCell = event.target.closest(".case-cell");
  if (caseCell) {
    const card = caseCell.closest(".exercise");
    card.querySelectorAll(".case-cell").forEach((cell) => {
      cell.classList.remove("is-selected");
      cell.setAttribute("aria-pressed", "false");
    });
    caseCell.classList.add("is-selected");
    caseCell.setAttribute("aria-pressed", "true");
    return;
  }

  const button = event.target.closest(".check-button");
  if (!button) return;

  const card = button.closest(".exercise");
  const result = card.querySelector(".result");
  const answer = getUserAnswer(card);

  if (!answer) {
    result.textContent = "Enter or choose an answer first.";
    return;
  }

  const response = await fetchJson("/api/check-answer", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chapterId: card.dataset.chapterId,
      exerciseId: card.dataset.exerciseId,
      answer
    })
  });

  result.textContent = `${response.correct ? "Correct" : "Not quite"}. Answer: ${response.expected}. ${response.explanation}`;
});

function getUserAnswer(card) {
  if (card.dataset.exerciseType === "multiple_choice") {
    return card.querySelector("input:checked")?.value.trim() ?? "";
  }

  if (card.dataset.exerciseType === "case_identification") {
    return card.querySelector(".case-cell.is-selected")?.dataset.answer.trim() ?? "";
  }

  return card.querySelector(".answer-input")?.value.trim() ?? "";
}

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
