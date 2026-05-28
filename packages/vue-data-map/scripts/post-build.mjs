import { renameSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, '..', 'dist');

// Rename style.css → vue-data-map.css to match package.json `exports`
const src = resolve(dist, 'style.css');
const dst = resolve(dist, 'vue-data-map.css');
if (existsSync(src)) {
  renameSync(src, dst);
  console.log('[post-build] renamed style.css -> vue-data-map.css');
}

// Rewrite any `style.css` references in JS bundles to `vue-data-map.css`
for (const file of ['vue-data-map.js', 'vue-data-map.cjs']) {
  const p = resolve(dist, file);
  if (existsSync(p)) {
    const content = readFileSync(p, 'utf8');
    const replaced = content.replace(/style\.css/g, 'vue-data-map.css');
    if (replaced !== content) {
      writeFileSync(p, replaced);
      console.log(`[post-build] patched ${file}`);
    }
  }
}
