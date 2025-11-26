# Scripts Directory

This directory contains utility scripts for deployment, management, and operations.

## Available Scripts

### list-render-services.js

Lists all Render services associated with your account using the Render API.

**Usage:**
```bash
RENDER_API_KEY=your_api_key npm run list-render-services
```

**Documentation:** See [../docs/list-render-services.md](../docs/list-render-services.md)

## Adding New Scripts

When adding new scripts to this directory:

1. Make them executable with `chmod +x scripts/your-script.js`
2. Add a shebang line at the top: `#!/usr/bin/env node`
3. Add usage documentation in the script header
4. Add an npm script in the root `package.json` for easy execution
5. Create documentation in the `docs/` directory if needed
6. Update this README with a brief description
