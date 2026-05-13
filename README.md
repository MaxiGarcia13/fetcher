# Fetcher

Fetcher is a lightweight REST API client for sending HTTP requests, inspecting responses, and keeping a local history of work in progress. It is aimed at developers who want a fast, browser-based alternative to desktop tools like Postman or Insomnia, without accounts, workspaces, or heavy setup.

The app runs in the browser and proxies outbound calls through a small server endpoint so you can exercise APIs from a single page while still editing JSON bodies, headers, and query parameters in a familiar editor.

## What it is for

Use Fetcher when you need to:

- **Probe an API** — pick a method, enter a URL, and send a request to see status, headers, and body.
- **Iterate on payloads** — edit JSON request bodies with syntax highlighting and a Monaco-based editor.
- **Tune headers and query params** — manage key/value rows, including optional hidden values for sensitive fields.
- **Resume work later** — save requests in the sidebar (or the mobile history modal); each snapshot stores the full request state encoded in the page URL.
- **Share or bookmark a request** — use **Share link** to copy the current URL, or copy the address bar directly; method, URL, headers, params, and body live in query parameters so the same setup can be reproduced.
- **Document a request** — open the **Documentation** view to see method, URL, and field tables for params, headers, and body with inferred types and example values.

Fetcher is intentionally scoped: it focuses on request construction, execution, and inspection, not collections, environments, or team collaboration.

## Features

- HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`
- Request editor with URL validation
- Tabs for **Headers**, **Params**, and **Body** (body enabled for methods that accept one)
- Read-only response panel backed by the same editor component
- Resizable split between request options and response
- Saved requests in `localStorage`, keyed off URL search state, with method badges and active-session highlighting
- Session actions: **Documentation**, **Share link**, **New request**, and **Saved requests** (history modal on small screens)
- Request documentation page at `/doc`, driven by the same URL query state as the main editor
- Installable web app via `manifest.webmanifest`, app icons, and theme color for standalone use
- Responsive layout: persistent sidebar on larger viewports; compact header actions and history modal on mobile
- Server-side proxy at `/api/v1/http-request` to perform the outbound `fetch`
- Health check at `/api/health`

## Tech stack

| Layer     | Choices                                                                       |
| --------- | ----------------------------------------------------------------------------- |
| Framework | [Astro](https://astro.build/) (SSR, Vercel adapter)                           |
| UI        | [React](https://react.dev/) islands, [Tailwind CSS](https://tailwindcss.com/) |
| State     | [Nanostores](https://github.com/nanostores/nanostores)                        |
| Editor    | [Monaco Editor](https://microsoft.github.io/monaco-editor/)                   |
| Utilities | [`@maxigarcia/js-utils`](https://www.npmjs.com/package/@maxigarcia/js-utils)  |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) with a current LTS release
- npm (or another client compatible with `package-lock.json`)

### Install and run

```bash
git clone https://github.com/MaxiGarcia13/fetcher.git
cd fetcher
npm install
npm run dev
```

Open the URL printed in the terminal (Astro defaults to `http://localhost:4321`).

### Scripts

| Command            | Description                             |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Start the development server            |
| `npm run build`    | Production build                        |
| `npm run preview`  | Serve the production build locally      |
| `npm run lint`     | Run ESLint                              |
| `npm run lint:fix` | Run ESLint with auto-fix                |
| `npm run clean`    | Remove build artifacts and dependencies |
| `npm run phoenix`  | Clean install from scratch              |

## How requests flow

1. The UI keeps request state in Nanostores and mirrors it into the browser URL query string.
2. **Send** posts the composed request to `/api/v1/http-request`.
3. That API route calls the target URL with the chosen method, headers, query string, and JSON body when applicable.
4. The response stream is returned to the client and shown in the response editor.

Saved sessions persist the query string (and metadata such as save time) so selecting an entry restores the same request shape.

## Documentation view

The `/doc` route reads the current request from the same encoded query parameters as the main page. It shows the HTTP method, URL, and tables for params, headers, and body. Each field lists a key, an inferred type (including JSON-aware parsing for body values), and an example value. Use the back control to return to the editor with the request state unchanged.

## Install as an app

Fetcher ships a web app manifest and launcher icons under `public/`. Supported browsers can install it for a standalone window with the app theme color applied. The manifest is linked from the shared app layout alongside standard meta tags for description and Open Graph.

## Project layout

```
public/
  manifest.webmanifest   PWA manifest and install metadata
  icons/                 Launcher icons for installed clients
src/
  components/     UI (request editor, panels, tabs, Monaco wrapper, saved sessions, doc actions)
  domain/         HTTP and session types and helpers
  layouts/        App shell (manifest link, theme color, viewport)
  pages/          Index and documentation routes, API routes
  store/          Nanostores for requests, responses, and saved sessions
  styles/         Global CSS
  utils/          Request documentation parsing and formatting
```

## License

ISC — see [package.json](./package.json).
