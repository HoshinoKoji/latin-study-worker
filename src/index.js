import { chapters } from "./data/chapters.js";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: jsonHeaders });
    }

    if (url.pathname === "/api/health") {
      return json({ ok: true, hasDatabase: Boolean(env.DB) });
    }

    if (url.pathname === "/api/chapters") {
      return json(
        Object.values(chapters).map(({ id, title, summary }) => ({
          id,
          title,
          summary: summary.en ?? summary.zh ?? ""
        }))
      );
    }

    const chapterMatch = url.pathname.match(/^\/api\/chapters\/(\d+)(?:\/(summary|grammar|vocab|exercises|quiz))?$/);
    if (chapterMatch) {
      const [, id, section] = chapterMatch;
      const chapter = chapters[id];

      if (!chapter) {
        return json({ error: "Chapter not found" }, 404);
      }

      if (!section) {
        return json(chapter);
      }

      if (section === "quiz") {
        const count = clampNumber(Number(url.searchParams.get("count") || 5), 1, 20);
        return json(shuffle(chapter.exercises).slice(0, count));
      }

      return json(chapter[section]);
    }

    if (url.pathname === "/api/check-answer" && request.method === "POST") {
      const payload = await request.json().catch(() => null);
      if (!payload || !payload.chapterId || !payload.exerciseId) {
        return json({ error: "chapterId and exerciseId are required" }, 400);
      }

      const chapter = chapters[String(payload.chapterId)];
      const exercise = chapter?.exercises.find((item) => item.id === payload.exerciseId);
      if (!exercise) {
        return json({ error: "Exercise not found" }, 404);
      }

      const normalizedUserAnswer = normalizeAnswer(payload.answer);
      const expectedAnswers = getExpectedAnswers(exercise);
      const correct = expectedAnswers.some((expected) => normalizeAnswer(expected) === normalizedUserAnswer);

      return json({
        correct,
        expected: formatExpectedAnswer(exercise.answer),
        explanation: exercise.explanation
      });
    }

    return env.ASSETS.fetch(request);
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: jsonHeaders
  });
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getExpectedAnswers(exercise) {
  const primaryAnswers = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer];
  return [...primaryAnswers, ...(exercise.acceptableAnswers ?? [])].filter((value) => value !== undefined && value !== null);
}

function formatExpectedAnswer(answer) {
  if (Array.isArray(answer)) return answer.join(" / ");
  return String(answer ?? "");
}

function normalizeAnswer(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.;:!?]+$/g, "");
}
