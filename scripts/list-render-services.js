#!/usr/bin/env node

/**
 * Script to list Render services using the Render API
 * 
 * Usage:
 *   RENDER_API_KEY=your_api_key node scripts/list-render-services.js
 * 
 * Or set RENDER_API_KEY in your environment and run:
 *   node scripts/list-render-services.js
 * 
 * Get your API key from: https://dashboard.render.com/u/settings#api-keys
 */

const https = require('https');

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const RENDER_API_BASE = 'api.render.com';

if (!RENDER_API_KEY) {
  console.error('Error: RENDER_API_KEY environment variable is required');
  console.error('');
  console.error('Usage:');
  console.error('  RENDER_API_KEY=your_api_key node scripts/list-render-services.js');
  console.error('');
  console.error('Get your API key from: https://dashboard.render.com/u/settings#api-keys');
  process.exit(1);
}

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: RENDER_API_BASE,
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RENDER_API_KEY}`,
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function listServices() {
  try {
    console.log('Fetching Render services...\n');
    
    const response = await makeRequest('/v1/services?limit=100');
    
    if (!response || !Array.isArray(response)) {
      console.error('Unexpected response format:', response);
      return;
    }

    if (response.length === 0) {
      console.log('No services found.');
      return;
    }

    console.log(`Found ${response.length} service(s):\n`);
    console.log('═'.repeat(80));
    
    response.forEach((service, index) => {
      console.log(`\n${index + 1}. ${service.name || 'Unnamed Service'}`);
      console.log('─'.repeat(80));
      console.log(`   ID:          ${service.id || 'N/A'}`);
      console.log(`   Type:        ${service.type || 'N/A'}`);
      console.log(`   Status:      ${service.suspended || 'N/A'}`);
      console.log(`   Region:      ${service.serviceDetails?.region || 'N/A'}`);
      console.log(`   Environment: ${service.serviceDetails?.env || 'N/A'}`);
      console.log(`   Repo:        ${service.repo || 'N/A'}`);
      console.log(`   Branch:      ${service.branch || 'N/A'}`);
      console.log(`   Created:     ${service.createdAt ? new Date(service.createdAt).toLocaleString() : 'N/A'}`);
      console.log(`   Updated:     ${service.updatedAt ? new Date(service.updatedAt).toLocaleString() : 'N/A'}`);
      
      if (service.serviceDetails?.url) {
        console.log(`   URL:         ${service.serviceDetails.url}`);
      }
    });
    
    console.log('\n' + '═'.repeat(80));
    console.log(`\nTotal: ${response.length} service(s)`);
    
  } catch (error) {
    console.error('Error fetching services:', error.message);
    
    if (error.message.includes('401')) {
      console.error('\nPossible causes:');
      console.error('  - Invalid API key');
      console.error('  - API key expired');
      console.error('  - Incorrect API key format');
      console.error('\nPlease verify your API key at: https://dashboard.render.com/u/settings#api-keys');
    }
    
    process.exit(1);
  }
}

listServices();
