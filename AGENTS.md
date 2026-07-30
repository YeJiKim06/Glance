# AGENTS.md

## Project overview
- This workspace contains Glance, a lightweight React + Vite dashboard for scanning news and entertainment updates quickly.
- The main app lives in [my-react-app/src/App.jsx](my-react-app/src/App.jsx) and the shared content definitions live in [my-react-app/src/content.js](my-react-app/src/content.js).
- UI is mostly composed from [my-react-app/src/components](my-react-app/src/components) plus styling in [my-react-app/src/App.css](my-react-app/src/App.css).

## Core conventions
- Keep changes small and focused. Prefer updating existing components and content definitions before introducing new architectural layers.
- The app is client-side only. Do not add a backend server unless the user explicitly asks for it.
- Preserve the existing data flow: category selection -> feed lookup -> loading/error state -> rendered cards.
- When adding a new category or entertainment tab, update the category list, feed mapping, and any highlight copy in [my-react-app/src/content.js](my-react-app/src/content.js).
- Keep UI copy in Korean unless the user explicitly requests otherwise.

## Commands
Run commands from [my-react-app](my-react-app):
- npm test
- npm run build
- npm run dev

## Testing expectations
- Add or update tests in [my-react-app/src/App.test.jsx](my-react-app/src/App.test.jsx) for new UI behavior such as tab switching, loading states, schedule/calendar behavior, and error handling.
- Prefer testing visible behavior rather than implementation details.

## Notes for agents
- The app uses the RSS-to-JSON endpoint in [my-react-app/src/App.jsx](my-react-app/src/App.jsx); keep network failures graceful and avoid breaking the page when the feed is unavailable.
- The project already uses React, Vite, and Vitest. Follow the existing patterns rather than introducing a new framework or state library.
