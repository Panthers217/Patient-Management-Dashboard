# List Render Services

This guide explains how to list your Render services using the provided script.

## Prerequisites

1. A Render account with active services
2. A Render API key

## Getting Your Render API Key

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Navigate to Account Settings > API Keys: https://dashboard.render.com/u/settings#api-keys
3. Click "Create API Key"
4. Give it a descriptive name (e.g., "CLI Access")
5. Copy the generated API key (you won't be able to see it again)

## Usage

### Option 1: Using npm script (recommended)

From the repository root:

```bash
RENDER_API_KEY=your_api_key_here npm run list-render-services
```

### Option 2: Direct execution

```bash
RENDER_API_KEY=your_api_key_here node scripts/list-render-services.js
```

### Option 3: Using environment variable

Set the environment variable first:

```bash
export RENDER_API_KEY=your_api_key_here
npm run list-render-services
```

Or for a single session:

```bash
export RENDER_API_KEY=your_api_key_here
node scripts/list-render-services.js
```

## Example Output

```
Fetching Render services...

Found 2 service(s):

════════════════════════════════════════════════════════════════════════════════

1. patient-dashboard-backend
────────────────────────────────────────────────────────────────────────────────
   ID:          srv-abc123def456
   Type:        web_service
   Status:      false
   Region:      oregon
   Environment: node
   Repo:        https://github.com/Panthers217/Patient-Management-Dashboard
   Branch:      main
   Created:     11/10/2024, 3:45:12 PM
   Updated:     11/13/2024, 9:22:38 AM
   URL:         https://patient-dashboard-backend.onrender.com

2. patient-dashboard-postgres
────────────────────────────────────────────────────────────────────────────────
   ID:          dpg-xyz789uvw012
   Type:        postgres
   Status:      false
   Region:      oregon
   Environment: N/A
   Repo:        N/A
   Branch:      N/A
   Created:     11/10/2024, 3:40:05 PM
   Updated:     11/13/2024, 9:20:15 AM

════════════════════════════════════════════════════════════════════════════════

Total: 2 service(s)
```

## Service Information Displayed

The script displays the following information for each service:

- **ID**: Unique identifier for the service
- **Type**: Service type (e.g., web_service, postgres, static_site, cron_job)
- **Status**: Whether the service is suspended (false = active, true = suspended)
- **Region**: Geographic region where the service is deployed
- **Environment**: Runtime environment (e.g., node, python, docker)
- **Repo**: Connected GitHub repository (if applicable)
- **Branch**: Deployed branch (if applicable)
- **Created**: When the service was created
- **Updated**: Last update timestamp
- **URL**: Service URL (for web services)

## Troubleshooting

### Error: RENDER_API_KEY environment variable is required

**Solution**: Make sure you provide the API key as shown in the usage examples above.

### Error: API request failed with status 401

**Possible causes:**
- Invalid API key
- API key expired
- Incorrect API key format

**Solution**: Verify your API key at https://dashboard.render.com/u/settings#api-keys and generate a new one if necessary.

### Error: API request failed with status 403

**Cause**: The API key doesn't have permission to access the services.

**Solution**: Ensure you're using an API key from the correct Render account that owns the services.

### No services found

If you have services but the script shows "No services found," this could mean:
- The API key is for a different account
- All services were recently deleted
- There's a network connectivity issue

## Security Notes

- **Never commit your API key** to version control
- Store API keys securely (use environment variables or secret management tools)
- Rotate API keys regularly
- Use API keys with minimal required permissions
- Consider using different API keys for different purposes (e.g., read-only vs. full access)

## API Rate Limits

Render's API has rate limits. If you need to make frequent calls, consider:
- Caching results
- Implementing exponential backoff
- Monitoring your API usage

For more information, see [Render API Documentation](https://api-docs.render.com).

## Additional Resources

- [Render API Documentation](https://api-docs.render.com)
- [Render Dashboard](https://dashboard.render.com)
- [Render Community Forums](https://community.render.com)
