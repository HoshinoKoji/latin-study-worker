# Latin Study Worker

一个用于学习 *Lingua Latina per se Illustrata: Familia Romana* 的 Cloudflare Worker 项目。

当前目标：

- 结构化保存章节摘要、语法点、词汇和习题。
- 通过 Worker API 返回章节学习内容。
- 提供一个轻量前端页面用于浏览章节和做练习。
- 暂不实现错题本；未来可用 Cloudflare D1 保存学习进度、答题记录和笔记。

## 项目结构

```txt
src/
  index.js
  data/
    chapters.js
public/
  index.html
  app.js
  style.css
migrations/
  0001_init.sql
```

## 本地开发

```bash
npm install
npm run dev
```

## 部署

```bash
npm run deploy
```

## API

```txt
GET /api/health
GET /api/chapters
GET /api/chapters/:id
GET /api/chapters/:id/summary
GET /api/chapters/:id/grammar
GET /api/chapters/:id/vocab
GET /api/chapters/:id/exercises
GET /api/chapters/:id/quiz?count=5
POST /api/check-answer
```

## 数据约定

- `declension` 使用缩写：`1st`, `2nd`, `3rd`, `4th`, `5th`。
- 动词单列时使用不定式，例如 `esse`, `vidēre`, `habēre`。
- 教材内容作为只读数据维护；用户进度等以后再进入 D1。
