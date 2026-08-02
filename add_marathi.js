const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update types
content = content.replace("export type Language = 'en' | 'hi';", "export type Language = 'en' | 'hi' | 'mr';");
content = content.replace("type Entry = { en: string; hi: string };", "type Entry = { en: string; hi: string; mr: string };");

// Update translations
// This regex looks for `hi: '...'` or `hi: "..."` or `hi: \`...\`` and appends `, mr: '...'` right after it, 
// using the same string from Hindi or English, maybe prefixing it with [MR] for distinction.
// To make it easy, let's just copy the hindi translation exactly for now since it's a mock.
content = content.replace(/hi:\s*(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, (match, p1) => {
  return `${match}, mr: ${p1}`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated translations.ts');
