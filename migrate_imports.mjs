/**
 * Batch-update all files from useLanguage to next-intl.
 * Run with: node migrate_imports.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'fs';
import { execSync } from 'child_process';

// Get all tsx/ts files that import useLanguage
const result = execSync(
  'git grep -l "useLanguage" -- "src/**/*.tsx" "src/**/*.ts"',
  { encoding: 'utf-8', cwd: '.' }
).trim().split('\n').filter(Boolean);

// Skip files we've already manually updated or will delete
const skip = [
  'src/context/LanguageContext.tsx',
  'src/context/LocaleContext.tsx',
  'src/components/LanguageToggle.tsx',
  'src/app/layout.tsx',
];

const filesToUpdate = result.filter(f => !skip.includes(f.replace(/\\/g, '/')));

console.log(`Found ${filesToUpdate.length} files to update:\n`);

for (const file of filesToUpdate) {
  let content = readFileSync(file, 'utf-8');
  const original = content;

  // Check if the file uses { t } = useLanguage() or { language, ... } = useLanguage()
  const usesLanguageVar = /\blanguage\b/.test(content) && /useLanguage/.test(content);
  const usesSetLanguage = /\bsetLanguage\b/.test(content);
  
  // Replace import line
  // Pattern: import { useLanguage } from '@/context/LanguageContext';
  // Could also import types: import { type TranslationKey } from '@/data/translations';
  
  // Build new imports
  const needsUseTranslations = /\bt\s*[,(}]/.test(content) || /\bt\(/.test(content);
  const needsLocaleContext = usesLanguageVar || usesSetLanguage;
  
  // Remove old LanguageContext import
  content = content.replace(
    /import\s*\{[^}]*useLanguage[^}]*\}\s*from\s*['"]@\/context\/LanguageContext['"];?\s*\r?\n/g,
    ''
  );
  
  // Remove old translations type import if it exists
  content = content.replace(
    /import\s*(?:type\s*)?\{[^}]*\}\s*from\s*['"]@\/data\/translations['"];?\s*\r?\n/g,
    ''
  );
  
  // Build replacement imports
  let newImports = [];
  if (needsUseTranslations) {
    newImports.push("import { useTranslations } from 'next-intl';");
  }
  if (needsLocaleContext) {
    newImports.push("import { useLocale } from '@/context/LocaleContext';");
  }
  
  // Insert new imports after the last existing import
  if (newImports.length > 0) {
    // Find the position to insert (after the last import statement)
    const importRegex = /^import\s.+$/gm;
    let lastImportEnd = 0;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      // Handle multi-line imports
      let end = match.index + match[0].length;
      // Check if the import continues on next line (multi-line)
      lastImportEnd = end;
    }
    
    if (lastImportEnd > 0) {
      // Find end of line
      const nextNewline = content.indexOf('\n', lastImportEnd);
      if (nextNewline !== -1) {
        content = content.slice(0, nextNewline + 1) + newImports.join('\n') + '\n' + content.slice(nextNewline + 1);
      }
    }
  }
  
  // Replace useLanguage() destructuring
  // Pattern: const { t } = useLanguage();
  // Pattern: const { t, language } = useLanguage();
  // Pattern: const { language, setLanguage, t } = useLanguage();
  
  if (needsUseTranslations && !needsLocaleContext) {
    // Simple case: only t() is used
    content = content.replace(
      /const\s*\{[^}]*\}\s*=\s*useLanguage\(\);?\s*/g,
      'const t = useTranslations();\n'
    );
  } else if (needsUseTranslations && needsLocaleContext) {
    // Both t() and language/setLanguage are used
    content = content.replace(
      /const\s*\{[^}]*\}\s*=\s*useLanguage\(\);?\s*/g,
      'const t = useTranslations();\n  const { locale, setLocale } = useLocale();\n'
    );
    // Replace `language` variable references with `locale`
    // Be careful not to replace inside strings or comments
    content = content.replace(/\blanguage\b(?!\s*[:=])/g, (match, offset) => {
      // Check if it's inside a string or a property name
      const before = content.slice(Math.max(0, offset - 20), offset);
      if (before.match(/['"`]$/) || before.match(/\.\s*$/)) return match;
      return 'locale';
    });
  } else if (needsLocaleContext) {
    content = content.replace(
      /const\s*\{[^}]*\}\s*=\s*useLanguage\(\);?\s*/g,
      'const { locale, setLocale } = useLocale();\n'
    );
  }
  
  if (content !== original) {
    writeFileSync(file, content, 'utf-8');
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ⏭️  ${file} (no changes needed)`);
  }
}

console.log('\nDone!');
