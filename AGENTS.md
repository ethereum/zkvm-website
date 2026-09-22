# Repository instructions

## Markdown formatting

Use the Prettier version pinned in the scripts in `package.json` and the settings in `.prettierrc.json` for Markdown changes. CI currently checks this file and `tracking/readiness.md`.

- Use ATX headings (`#`, `##`, `###`) and `-` for unordered lists.
- Separate headings, paragraphs, lists, tables, and fenced code blocks with a single blank line.
- Keep each table row on one source line. Wide tables use compact cells (`| value | value |`) without column-alignment padding; Prettier may still align short tables that fit within its print width.
- Keep prose paragraphs on one source line (`proseWrap: never`); use editor word wrap for readability.
- Use spaces for indentation, LF line endings, and a final newline.
- Keep `<details>` and `<summary>` blocks in the readiness tracker, with blank lines around their Markdown contents.
- Formatting changes must preserve wording, links, status symbols, and the order of rows and sections.

Run:

```sh
pnpm format:markdown
pnpm format:markdown:check
```

These commands format or check `AGENTS.md` and `tracking/readiness.md`. They use `npx` to fetch and cache the pinned formatter, so no application dependency installation is needed. CI runs the same check through `npm run format:markdown:check`.

For another Markdown file, run `npx --yes prettier@3.6.2 --write path/to/file.md`. Keep the formatter version identical in both scripts when upgrading. When expanding CI coverage, update both scripts in `package.json` and the workflow path filters in `.github/workflows/markdown-format.yml`.
