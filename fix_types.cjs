const fs = require('fs');
const { execSync } = require('child_process');

const result = execSync('git grep -l TranslationKey -- "src/**/*.tsx" "src/**/*.ts"', { encoding: 'utf-8' }).trim().split('\n').filter(Boolean);
const skip = ['src/context/LanguageContext.tsx', 'src/data/translations.ts'];
const files = result.filter(f => !skip.includes(f.replace(/\\\\/g, '/')));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  // Remove import lines for TranslationKey from translations
  content = content.replace(/import\s+type\s*\{\s*TranslationKey\s*\}\s*from\s*['"]@\/data\/translations['"];?\s*\r?\n/g, '');
  // Replace TranslationKey with string
  content = content.replace(/\bTranslationKey\b/g, 'string');
  fs.writeFileSync(file, content, 'utf-8');
  console.log('Updated:', file);
}
