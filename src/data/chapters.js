import { capitulum05 } from "./chapters/capitulum-05.js";
import { capitulum06 } from "./chapters/capitulum-06.js";
import { capitulum07 } from "./chapters/capitulum-07.js";

const chapterList = [capitulum05, capitulum06, capitulum07];

export const chapters = Object.fromEntries(
  chapterList.map((chapter) => [String(chapter.id), chapter])
);
