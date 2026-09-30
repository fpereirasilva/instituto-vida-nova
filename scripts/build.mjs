import { build } from 'esbuild';
import { rm, mkdir, readFile, writeFile, readdir, copyFile } from 'node:fs/promises';

const DIST = 'dist';
await rm(DIST, { recursive: true, force: true });
await mkdir(`${DIST}/images`, { recursive: true });

// 1. JS: junta os módulos em um único arquivo minificado
await build({ entryPoints: ['js/main.js'], bundle: true, minify: true, format: 'esm',
  target: 'es2020', outfile: `${DIST}/app.min.js` });

// 2. CSS: reset + estilos em um único arquivo minificado
await build({ entryPoints: ['css/build.css'], bundle: true, minify: true, outfile: `${DIST}/styles.min.css` });

// 3. Imagens: copia JPG/PNG e as versões WebP geradas por npm run images
for (const arquivo of await readdir('images')) {
  await copyFile(`images/${arquivo}`, `${DIST}/images/${arquivo}`);
}

// 4. HTML: ajusta caminhos para a raiz do dist e remove espaços desnecessários
let html = await readFile('html/index.html', 'utf8');
html = html
  .replace(/<link rel="stylesheet" href="\.\.\/css\/reset\.css">\s*/, '')
  .replace('../css/styles.css', 'styles.min.css')
  .replace('../js/main.js', 'app.min.js')
  .replaceAll('../images/', 'images/')
  .replace(/>\s+</g, '><');
await writeFile(`${DIST}/index.html`, html);

console.log('Build gerado em /dist');
