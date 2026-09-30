import sharp from 'sharp';
import { readdir } from 'node:fs/promises';

// Gera a versão WebP de cada JPG/PNG da pasta /images
for (const arquivo of await readdir('images')) {
  if (/\.(jpe?g|png)$/i.test(arquivo)) {
    await sharp(`images/${arquivo}`).webp({ quality: 75 }).toFile(`images/${arquivo.replace(/\.\w+$/, '.webp')}`);
  }
}
console.log('WebP gerados em /images');
