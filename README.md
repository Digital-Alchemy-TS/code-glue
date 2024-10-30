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

yarn install
```

3. Bring up dev containers

```bash
docker compose up -d
```

4. Create config file: `.env.template` to `.env` & fill in variables

### 🎛️ General Commands

| Command | Notes |
| --- | --- |
| `yarn start` / `yarn start:hot` | Start the dev server |
| `yarn lint` / `yarn lint --fix` | Run `eslint` |
| `yarn test` / `yarn test --coverage` | Run tests |
| `yarn build` | Verify there is no build issues |
