# Project memory

## Product intent & audience

- Project "SF Fullstack" is a portfolio/company site built with React + TypeScript + Vite.
- Official production deployment stays on Cloudflare Pages at https://sf-fullstack.pages.dev/
- Project contains multiple showcased projects; one of them is "Água is life".
- Goal in Bolt: preview and make specific, limited, user-approved edits only — no rebuild, no framework migration, no GitHub pushes, no new publishes.

## Brand personality & voice

- User communicates in Portuguese (pt-BR). Respond in Portuguese unless context changes.
- Values preservation of original work and explicit consent before changes.
- Prefers extremely scoped changes with explicit restrictions; reports of what was/wasn't modified are expected.

## Visual design & UX direction

- Stack: React + TypeScript + Vite (`vite-react`).
- Project data (including images) is centralized in a data file; changing a project's image means updating the image path/import there.
- Project images appear in both the project card and the expanded project modal/detail view, sourced from the same data entry.
- Layout, styling, functionality, project order, texts, links, and buttons must remain untouched unless explicitly approved.

## Decisions, constraints & rationale

- Most recent change: replaced only the "Água is life" project image with a new user-supplied image by updating its path in the project data file. No other projects, texts, links, layout, styles, order, or buttons were altered.
- `npm run dev` is the expected dev command; TypeScript build passes without errors.
- Bolt environment blocks manual dev-server start; Bolt Preview auto-serves the Vite app.
- Rationale: user explicitly forbids changes beyond the approved scope; any additional fix (e.g. image fit/enquadramento) requires reporting cause and awaiting approval.

## Open questions & assumptions

- Assumes Vite dev server runs on default port and Bolt Preview can attach automatically.
- The new "Água is life" image is a logo with white background; it may appear with a different crop/framing than the previous image depending on card config. User was offered an optional fit-only adjustment; awaiting decision.
- No `.bolt/prompt` currently provided; project-specific conventions beyond stack are not yet established.