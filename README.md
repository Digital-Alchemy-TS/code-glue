# Code Glue

## ❓ Overview

Code Glue is a Home Assistant add-on that lets you create and edit entities and automations using TypeScript and Digital Alchemy from within an embedded IDE.

## 🔧 Install (Add custom add-on repository)

1. In Home Assistant, go to: Settings → Add-ons → Add-on Store
2. Click the three dots (⋮) in the top-right → Repositories
3. Add this URL as a custom repository:

- https://github.com/Digital-Alchemy-TS/code-glue

4. Close the dialog, search for “Code Glue,” and open the add-on
5. Click Install, then Start
6. Optional: enable “Start on boot” and “Show in sidebar”
7. Open the add-on via the sidebar or its Web UI
8. 💰 Profit!

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

#### Dev Container info

- This workspace provides a development container that boots a real Home Assistant instance so the add-on can be exercised in a “real world” environment (ingress, auth, CORS, sidebar, permissions).

Setup Instructions: https://developers.home-assistant.io/docs/add-ons/testing

### Setup

1. Install Node

> ⚠️ Do not use Node from Homebrew ⚠️

```bash
curl -fsSL https://fnm.vercel.app/install | bash

fnm use 22
fnm default 22
```

2. Install dependencies

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

### 🎛️ General Commands

#### Server

| Command                                            | Notes                                 |
| -------------------------------------------------- | ------------------------------------- |
| `yarn server:start` / `yarn server:start:hot`      | Start the dev server                  |
| `yarn server:lint` / `yarn server:lint --fix`      | Run `eslint`                          |
| `yarn server:test` / `yarn server:test --coverage` | Run tests                             |
| `yarn server:build`                                | Verify there is no build issues       |
| -------------------------------------------------- | ------------------------------------- |
| `yarn dev`                                         | Run the server and client in dev mode |

## 🔧 Development Workflows

### Option 1: Full Local Development

Run both client and server on your local machine:

```bash
yarn dev
```

Access the application at `http://localhost:8081` (Expo dev server)

### Option 2: Addon Development (Testing addon integration)

Develop and test the addon within Home Assistant:

1. **Open the addon in Home Assistant:** `http://localhost:7123`
2. **Go to Settings → Add-ons → Store -> Code Glue** and install
3. **Start the addon**
4. **Access through the addon panel**
