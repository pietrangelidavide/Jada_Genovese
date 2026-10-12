// Produce dist/artifact.html (pagina in un solo file: stile, caratteri e foto dentro, senza <html>/<head>/<body>,
// pronta da pubblicare come anteprima condivisibile) e dist/anteprima.html (stesso contenuto, si apre con doppio clic).
// Uso: node scripts/make-artifact.mjs            (versione editoriale: public/)
//      node scripts/make-artifact.mjs apple      (versione in stile Apple: public/apple/)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const variant = process.argv[2] ?? '';
const pub = join(root, 'public');
const dir = variant ? join(pub, variant) : pub;
const dist = join(root, 'dist');
const suffix = variant ? `-${variant}` : '';
mkdirSync(dist, { recursive: true });
const uri = (file, type) => `data:${type};base64,${readFileSync(join(dir, file)).toString('base64')}`;

const css = readFileSync(join(dir, 'style.css'), 'utf8').replace(/url\('(fonts\/[^']+\.woff)'\)/g, (_, f) => `url('${uri(f, 'font/woff')}')`);
const page = readFileSync(join(dir, 'index.html'), 'utf8');
const title = /<title>([^<]+)<\/title>/.exec(page)[1].split(' · ')[0] + (variant === 'apple' ? ' Apple' : ''); // nome breve per l'anteprima
const body = /<body>([\s\S]*)<\/body>/.exec(page)[1]
  .replace(/<img [^>]*>/g, (img) => img
    .replace(/ srcset="[^"]*"/, '')
    .replace(/ sizes="[^"]*"/, '')
    .replace(/src="((?:\.\.\/)?img\/[^"]+\.jpg)"/, (_, f) => `src="${uri(f, 'image/jpeg')}"`));

const fragment = `<title>${title}</title>
<style>
${css}
</style>
${body}`;
writeFileSync(join(dist, `artifact${suffix}.html`), fragment);
writeFileSync(join(dist, `anteprima${suffix}.html`), `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
</head>
<body>
${fragment}
</body>
</html>
`);
console.log(`dist/artifact${suffix}.html: ${(fragment.length / 1024).toFixed(0)} KB`);
