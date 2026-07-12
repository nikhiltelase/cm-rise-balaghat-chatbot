const fs = require('fs');
const path = require('path');

// Load environment variables from .env file if it exists locally
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Remove surrounding quotes if present
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

// Read keys from environment variable (comma-separated or single)
const keysEnv = process.env.GEMINI_API_KEYS || '';
const keys = keysEnv ? keysEnv.split(',').map(k => k.trim()) : [];

// Content for js/keys.js
const content = `window.GEMINI_KEYS = ${JSON.stringify(keys, null, 2)};\n`;

// Write to js/keys.js
const dir = path.join(__dirname, 'js');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(path.join(dir, 'keys.js'), content);
console.log('Successfully injected keys.js with', keys.length, 'keys!');
