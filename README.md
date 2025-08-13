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
