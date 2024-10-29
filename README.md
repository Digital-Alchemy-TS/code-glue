## 🏗️ Workspace Setup

1. Install bun

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Install dependencies

```bash
bun install
```

3. Bring up dev containers

```bash
docker compose up -d
```

4. Create config file: `.env.template` to `.env` & fill in variables

### 🎛️ General Commands

| Command | Notes |
| --- | --- |
| `bun start` / `bun start:hot` | Start the dev server |
| `bun lint` / `bun lint --fix` | Run `eslint` |
| `bun test` / `bun test --coverage` | Run tests |
| `bun build` | Verify there is no build issues |
