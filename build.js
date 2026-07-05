// Build step: copy everything in /src to /dist for deployment.
// The site is hand-authored static HTML, so "build" just assembles the
// deploy folder (and is where any future minification/versioning can live).
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const OUT = path.join(__dirname, 'dist');

function rmrf(p){ if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function copyDir(src, out){
  fs.mkdirSync(out, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })){
    const s = path.join(src, entry.name);
    const o = path.join(out, entry.name);
    if (entry.isDirectory()) copyDir(s, o);
    else fs.copyFileSync(s, o);
  }
}

rmrf(OUT);
copyDir(SRC, OUT);
console.log('Built -> dist/  (' + fs.readdirSync(OUT).length + ' items at root)');
