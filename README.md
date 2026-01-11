# Code Glue

## ❓ Overview

Code Glue is a Home Assistant add-on that lets you create and edit entities and automations using TypeScript and Digital Alchemy from within an embedded IDE.

## 🔧 Install

[![Add repository on my Home Assistant][repository-badge]][repository-url]

1. In Home Assistant, go to: Settings → Add-ons → Add-on Store
2. Click the three dots (⋮) in the top-right → Repositories
3. Add this URL as a custom repository:

- https://github.com/Digital-Alchemy-TS/code-glue

4. Close the dialog

You'll now see two add-ons available:

### Available Add-ons

#### Code Glue
**Stable production releases**
- "Thoroughly tested"
- Recommended for production use
- Pulls from `ghcr.io/digital-alchemy-ts/code-glue:latest`

#### Code Glue (Dev)
**Development builds for testing**
- Latest features and bug fixes
- May (will) be unstable and/or ugly.
- Pulls from `ghcr.io/digital-alchemy-ts/code-glue:dev`
- Can run alongside production version with its own DB.

## 🏗️ Developer Setup

**⚠️ NOTE: This section is for contributors working on Code Glue itself (not end‑users). ⚠️**

#### Repository layout

```
/               # Yarn workspaces monorepo, TypeScript-first
/apps
  /server       # API and runtime for Code Glue features
  /client       # Embedded IDE / UI used inside the add-on
/packages       # Shared libraries (types, utils, SDK)
  /paradigm     # UI Component Library for the client
```

### Development Workflow

Development is done locally with hot reloading:

#### Setup

1. Install Node

> ⚠️ Do not use Node from Homebrew ⚠️

```bash
curl -fsSL https://fnm.vercel.app/install | bash

fnm use 22
fnm default 22
```

2. Init Submodules

```bash
git submodule update --init --recursive
```

3. Install dependencies

```bash
# you may need to do this first to properly set up yarn
corepack enable

# install dependencies for root + all sub-projects
yarn install
```

3. Bring up dev containers

```bash
docker compose up -d
```

4. Create config file:

- `.code_glue.template` to `.code_glue` & fill in variables (for server)

5. Configure development environment:

- Copy `.env.template` to `.env` to get the client dev env setup.

6. Migrate the database:

```bash
yarn workspace @code-glue/server db:migrate
```

7. Start the client and server

```bash
yarn dev
```

Frontend: `http://localhost:3000`
Swagger:  `http://localhost:3789/swagger/`

### 🎛️ General Commands

| Command        | Notes                                      |
| -------------- | ------------------------------------------ |
| `yarn dev`     | Start all workspaces in dev (`start` script) |
| `yarn build`   | Build all workspaces                        |
| `yarn lint`    | Lint all workspaces                         |
| `yarn format`  | Format all workspaces                       |
| `yarn test`    | Run tests across workspaces                 |
| `yarn typecheck` | Type check all workspaces                 |

[repository-badge]: https://img.shields.io/badge/Add%20repository%20to%20my-Home%20Assistant-41BDF5?logo=home-assistant&style=for-the-badge
[repository-url]: https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FDigital-Alchemy-TS%2Fcode-glue
