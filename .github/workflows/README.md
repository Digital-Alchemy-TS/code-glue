# GitHub Actions Workflows

## Build Home Assistant Addon

The `docker-build.yml` workflow automatically builds and publishes multi-architecture Docker images for the Code Glue Home Assistant addon.

### Triggers

- **Push to `main` branch**: Builds and publishes as `:latest` tag
- **Push to `dev` branch**: Builds and publishes as `:dev` tag with modified config
- **Tag push (`v*`)**: Builds and publishes versioned releases
- **Manual trigger**: Via workflow_dispatch

### What it does

1. **Main branch builds**:
   - Uses `config.yaml` as-is
   - Publishes to `ghcr.io/digital-alchemy-ts/code-glue:latest`
   - Suitable for production Home Assistant installations

2. **Dev branch builds**:
   - Automatically modifies `config.yaml` during build to:
     - Change name to "Code Glue (Dev)"
     - Set slug to `code_glue_dev` (allows side-by-side installation with production)
     - Set version to "dev"
     - Change icon to outline variant
     - Update port to 3790
     - Point image to `:dev` tag
   - Publishes to `ghcr.io/digital-alchemy-ts/code-glue:dev`
   - Can be installed alongside the production addon

3. **Multi-architecture support**:
   - Builds for: `linux/amd64`, `linux/arm64`, `linux/arm/v7`
   - Covers all Home Assistant supported architectures

### Installing the Addon

#### Production Version (from `main` branch)
1. Add repository to Home Assistant: `https://github.com/Digital-Alchemy-TS/code-glue`
2. Install "Code Glue" addon
3. Home Assistant will pull the `:latest` image

#### Development Version (from `dev` branch)
1. Add repository to Home Assistant: `https://github.com/Digital-Alchemy-TS/code-glue`
2. Install "Code Glue (Dev)" addon
3. Home Assistant will pull the `:dev` image
4. Uses separate slug `code_glue_dev` - can run alongside production

### Development Workflow

Since the workflow handles config modifications automatically, you don't need to maintain separate config files:

1. Make changes on your branch
2. Merge to `dev` for testing → workflow builds `:dev` image
3. Test in Home Assistant with the dev addon
4. Merge to `main` for release → workflow builds `:latest` image
