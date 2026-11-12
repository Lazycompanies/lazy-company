/*
 * indexnow.js — avisa a Bing (y a los buscadores que usan IndexNow) que hay paginas nuevas o cambiadas.
 * Google no usa IndexNow: alli se pide la indexacion desde Search Console.
 *
 * Uso (desde la raiz del repo, DESPUES de hacer push y de que GitHub Pages publique):
 *   node scripts/indexnow.js                         -> envia todas las URLs de sitemap.xml
 *   node scripts/indexnow.js /sectores/clinicas.html -> envia solo esas rutas
 *
 * La clave vive en 663b0d4fc6e909834205eda9667da176.txt en la raiz del sitio: no borrarlo ni cambiarlo.
 */
const fs = require('fs'), path = require('path');
const SITE = 'https://lazycompanies.com';
const KEY = '663b0d4fc6e909834205eda9667da176';

const args = process.argv.slice(2);
const urls = args.length
  ? args.map(a => a.startsWith('http') ? a : SITE + (a.startsWith('/') ? a : '/' + a))
  : [...fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({host: 'lazycompanies.com', key: KEY, keyLocation: SITE + '/' + KEY + '.txt', urlList: urls})
}).then(async r => {
  console.log('IndexNow: HTTP ' + r.status + ' (200/202 = recibido) · ' + urls.length + ' URLs');
  const t = await r.text(); if (t) console.log(t);
  if (r.status >= 300) process.exitCode = 1;
}).catch(e => { console.error('IndexNow: error de red', e.message); process.exitCode = 1; });
