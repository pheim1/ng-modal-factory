# Project Overview

**ng-modal-factory** is an Angular library that enables rendering modal
components dynamically from anywhere in an application. Consumers place a
`<ng-modal-factory-outlet>` in their template and use `ModalFactoryService`
to open modals on demand, passing component types and optional inputs via
dependency injection. The library is published to npm as `ng-modal-factory`
and currently targets **Angular 21** with **RxJS 7**.

## Repository Structure

- `projects/ng-modal-factory/` — the publishable Angular library
  (built with ng-packagr).
- `projects/ng-modal-factory-example/` — demo Angular application that
  exercises the library using VMware Clarity modals.
- `dist/` — build output (library + example app). Git-ignored at runtime
  but may appear locally.
- `.github/workflows/` — CI/CD: build-and-publish-to-npm on GitHub
  release.
- `scripts/` — helper scripts directory (currently empty).
- `gitflow/` — git-flow related configuration.
- `makefile` — convenience targets for Angular and Clarity updates.

## Build & Development Commands

### Install dependencies

```bash
npm install
```

### Serve the example app (dev server)

```bash
npm start          # alias for: ng serve
```

### Build the library (production)

```bash
npm run lib:build  # ng build ng-modal-factory --configuration production
```

### Build the library in watch mode

```bash
npm run lib:dev    # ng build ng-modal-factory --configuration production --watch
```

### Build the example application

```bash
npm run build      # ng build
```

### Run unit tests

```bash
npm test           # ng test (runs Karma + Jasmine)
```

### Lint

```bash
npm run lint       # ng lint
```

### End-to-end tests

```bash
npm run e2e        # ng e2e
```

### Build library and publish to npm

```bash
npm run lib:bp     # build prod then cd dist/ng-modal-factory && npm publish
```

### Makefile helpers

```bash
make angular-update-wrapper   # ng update @angular/core@latest @angular/cli@latest
make clarity-update-wrapper   # ng update @clr/ui @clr/angular @cds/core
```

## Code Style & Conventions

| Rule | Value |
|------|-------|
| Indent | 2 spaces (`.editorconfig`) |
| Charset | UTF-8 |
| Quotes (TS) | single |
| Final newline | yes |
| Trailing whitespace | trimmed (except `.md`) |
| TypeScript target | ES2022, module resolution `bundler` |
| Component prefix (lib) | `lib` |
| Component prefix (app) | `app` |

- Angular standalone components are preferred where possible.
- The library uses Angular's `@Injectable({ providedIn: 'root' })`
  pattern for the service.
- Commit messages follow conventional style
  (e.g. `feat:`, `refactor:`, `chore:`).
- Branching follows git-flow: `master`, `develop`, `feature/*`,
  `release/*`.

## Architecture Notes

```
┌─────────────────────────────────────────────────────┐
│                   Consumer App                      │
│                                                     │
│  ┌──────────────┐       ┌────────────────────────┐  │
│  │  Any Component│──────▸│  ModalFactoryService   │  │
│  │  calls        │ open  │  (providedIn: 'root')  │  │
│  │  openNewModal()│      │                        │  │
│  └──────────────┘       └───────────┬────────────┘  │
│                                     │ RxJS Subject   │
│                                     ▼                │
│                         ┌────────────────────────┐  │
│                         │ ModalFactoryOutlet      │  │
│                         │ Component               │  │
│                         │ <ng-modal-factory-outlet>│  │
│                         │                        │  │
│                         │ ViewContainerRef        │  │
│                         │  └─ createComponent()   │  │
│                         └────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Data flow:**

1. Any component injects `ModalFactoryService` and calls
   `openNewModal()` with a `BaseModalData` payload (component class,
   optional `InjectionToken`, optional inputs).
2. The service builds a `StaticProvider[]` from the inputs, creates a
   child `Injector`, and pushes the data through an RxJS `Subject`.
3. `ModalFactoryOutletComponent` subscribes to the subject, clears
   the `ViewContainerRef`, and dynamically creates the requested
   component with the custom injector.

**Key types:**

- `BaseModalData<T>` — describes what to open and which data to pass.
- `OpenModalData` — internal payload (component + injector).
- `ClarityModalButton` — convenience interface for Clarity-style
  button configs.

## Testing Strategy

- **Unit tests:** Jasmine + Karma (Chrome launcher).
  - Library specs: `projects/ng-modal-factory/src/lib/*.spec.ts`
  - Example app specs: `projects/ng-modal-factory-example/src/**/*.spec.ts`
  - Run: `npm test` or `ng test ng-modal-factory` /
    `ng test ng-modal-factory-example`
- **E2E tests:** `npm run e2e`
  (e2e config under `projects/ng-modal-factory-example/e2e/`).

> TODO: Add CI step to run tests before publish (currently CI only
> builds and publishes on release).

## Security & Compliance

- **Secrets:** The npm publish token is stored as the GitHub Actions
  secret `npm_token`. Never commit tokens or credentials.
- **License:** MIT (see `LICENSE.txt`).
- **Dependency scanning:** Not currently configured.

> TODO: Add `npm audit` or a tool like Dependabot / Snyk for
> automated dependency scanning.

## Agent Guardrails

- **Never modify or commit** files under `dist/` — these are build
  artifacts.
- **Never modify** `.github/workflows/main.yml` without explicit
  approval — it controls npm publishing.
- **Never expose or log** the `npm_token` secret.
- **Do not publish** to npm (`npm publish`, `npm run lib:publish`,
  `npm run lib:bp`) without explicit user approval.
- Always run `npm test` after modifying library source files before
  proposing a commit.
- Prefer editing existing files over creating new ones.
- Follow the existing commit-message convention (`feat:`, `fix:`,
  `refactor:`, `chore:`).

## Extensibility Hooks

- **Custom modals:** Create any Angular component and pass it via
  `ModalFactoryService.openNewModal()`. Inputs are injected via
  Angular's DI using either a named `InjectionToken<T>` or
  individual string-keyed providers.
- **Environment configs:**
  `projects/ng-modal-factory-example/src/environments/` contains
  `environment.ts` (dev) and `environment.prod.ts` (production)
  for the example app.
- **ng-packagr:** Library packaging is configured via
  `projects/ng-modal-factory/ng-package.json`.

## Further Reading

- [README.md](README.md) — quick-start usage guide.
- [projects/ng-modal-factory/README.md](projects/ng-modal-factory/README.md)
  — library-specific readme (published to npm).
- [.github/workflows/main.yml](.github/workflows/main.yml)
  — CI/CD pipeline definition.
- [.editorconfig](.editorconfig) — editor formatting rules.

> TODO: Add `docs/ARCH.md` for deeper architectural documentation.
> TODO: Add ADR (Architecture Decision Records) directory.
