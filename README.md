## 🏗️ Workspace Setup

1. Install node

> ⚠️ DO NOT USE NODE PROVIDED BY BREW ⚠️

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
yarn install --cwd server
```

3. Bring up dev containers

```bash
docker compose up -d
```

4. Create config file:

- `.code_glue.template` to `.code_glue` & fill in variables (for server)

### 🎛️ General Commands

#### Server

| Command | Notes |
| --- | --- |
| `yarn server:start` / `yarn server:start:hot` | Start the dev server |
| `yarn server:lint` / `yarn server:lint --fix` | Run `eslint` |
| `yarn server:test` / `yarn server:test --coverage` | Run tests |
| `yarn server:build` | Verify there is no build issues |
