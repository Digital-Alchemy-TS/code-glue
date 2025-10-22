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

There are two ways to dev on this project.

### Option 1: Local

When to use:

- working on client/UI and want hot reloading
- want to work using your own HASS data
- faster dev loop

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
yarn server:db:migrate
```

7. Start the client and server

```bash
yarn dev
```

Access the application at `http://localhost:8081`
Access swagger: `http://localhost:3789/swagger/`

### Option 2: Dev Container

This workspace provides a development container that boots a real Home Assistant instance so the add-on can be exercised in a “real world” environment (ingress, auth, CORS, sidebar, permissions).

Setup Instructions: https://developers.home-assistant.io/docs/add-ons/testing

1. Open the project in VSCode
2. Run the task (Terminal -> Run Task) 'Start Home Assistant'
3. visit http://localhost:7123/

Once running you can rebuild and deploy updated code using: TBD

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
