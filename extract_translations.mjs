/**
 * Extracts translations from the monolithic translations.ts into per-language JSON files.
 * Run with: node extract_translations.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const content = readFileSync('src/data/translations.ts', 'utf-8');

const languages = ['en', 'hi', 'mr', 'gu'];
const result = {};
languages.forEach(lang => { result[lang] = {}; });

// Match patterns like:  keyName: { en: 'value', hi: 'value', mr: 'value', gu: 'value' }
// We'll parse line by line looking for key-value entries
const lines = content.split('\n');

let currentKey = null;

for (const line of lines) {
  // Match a translation entry line like:
  //   appTitle: { en: 'Supervisor Dashboard', hi: '...', mr: '...', gu: '...' },
  const entryMatch = line.match(/^\s*(\w+)\s*:\s*\{(.+)\}\s*,?\s*$/);
  if (entryMatch) {
    const key = entryMatch[1];
    const valuesStr = entryMatch[2];
    
    // Extract each language value
    for (const lang of languages) {
      // Match patterns like: en: 'value' or en: "value" or en: `value`
      const langPattern = new RegExp(`${lang}:\\s*'((?:[^'\\\\]|\\\\.)*)'|${lang}:\\s*"((?:[^"\\\\]|\\\\.)*)"|${lang}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``);
      const langMatch = valuesStr.match(langPattern);
      if (langMatch) {
        const value = langMatch[1] ?? langMatch[2] ?? langMatch[3] ?? '';
        // Unescape single quotes
        result[lang][key] = value.replace(/\\'/g, "'");
      }
    }
  }
}

// Write JSON files
mkdirSync('messages', { recursive: true });
for (const lang of languages) {
  const count = Object.keys(result[lang]).length;
  writeFileSync(`messages/${lang}.json`, JSON.stringify(result[lang], null, 2) + '\n', 'utf-8');
  console.log(`messages/${lang}.json: ${count} keys`);
}
