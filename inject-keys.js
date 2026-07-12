const fs = require('fs');
const path = require('path');

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
console.log('Successfully injected keys.js with', keys.length, 'keys from environment!');
