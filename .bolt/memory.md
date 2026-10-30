# Project memory

## Product intent & audience

- Project "SF Fullstack" imported from GitHub; existing portfolio/company site for SF Fullstack.
- Official production deployment stays on Cloudflare Pages at https://sf-fullstack.pages.dev/
- Goal in Bolt: preview the original site only — no modifications, no rebuild, no framework migration, no GitHub pushes, no new publishes.

## Brand personality & voice

- User communicates in Portuguese (pt-BR). Respond in Portuguese unless context changes.
- Values preservation of original work and explicit consent before changes.

## Visual design & UX direction

- Stack: React + TypeScript + Vite (`vite-react`).
- Layout, styling, and functionality must remain untouched; preview only.

## Decisions, constraints & rationale

- Do not modify any project files, recreate the site, convert to Next.js, alter layout/features, push to GitHub, or publish a new version.
- `npm run dev` is the expected dev command via existing `package.json` scripts.
- TypeScript type-check passed; dependencies are installed; no errors found on inspection.
- Bolt environment blocks manual dev-server start; Bolt Preview is expected to auto-serve the Vite app.
- Rationale: user explicitly forbids changes; any fix requires reporting cause first and awaiting approval.

## Open questions & assumptions

- Assumes Vite dev server runs on default port and Bolt Preview can attach automatically.
- If preview does not load, root cause is unknown (port mismatch, build error, or env restriction) and needs investigation.
- No `.bolt/prompt` currently provided; project-specific conventions beyond stack are not yet established.