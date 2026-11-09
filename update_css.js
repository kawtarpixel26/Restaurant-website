const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf-8');

const targetRegex = /\.menu-card\s*\{[\s\S]*?\.menu-card\s*\.card-banner\s*\{[\s\S]*?\}/;

const newBlock = `.menu-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: hsla(210, 4%, 11%, 0.65);
  border: 1px solid hsla(0, 0%, 100%, 0.08);
  border-radius: 18px;
  padding: 16px 20px;
  transition: var(--transition-2);
}

.menu-card:hover {
  background: hsla(210, 4%, 14%, 0.9);
  border-color: hsla(38, 61%, 73%, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px hsla(0, 0%, 0%, 0.5);
}

.menu-card .card-banner {
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 14px;
  overflow: hidden;
  background-color: var(--eerie-black-3);
  border: 1px solid hsla(38, 61%, 73%, 0.2);
}

.menu-card .card-banner .img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-2);
}

.menu-card:hover .card-banner .img-cover {
  transform: scale(1.08);
}

.menu-card-body {
  flex: 1;
  min-width: 0;
}`;

if (targetRegex.test(css)) {
  css = css.replace(targetRegex, newBlock);
  console.log('PASS: Replaced menu-card styling');
} else {
  console.error('FAIL: targetRegex not matched');
}

// Also update the gap and vertical line in menu grid-list
css = css.replace(/\.menu\s*\.grid-list\s*::before\s*\{[^}]*\}/g, '.menu .grid-list::before { display: none; }');
css = css.replace(/gap:\s*55px\s*200px;/g, 'gap: 25px 35px;');

// Also add hero dark vignette overlay
if (!css.includes('.hero .slider-bg::after')) {
  css = css.replace(/\.hero\s*\.slider-bg\s*\{/, `.hero .slider-bg::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(to bottom, rgba(10,10,12,0.7) 0%, rgba(10,10,12,0.45) 45%, rgba(10,10,12,0.85) 100%);\n  z-index: 1;\n}\n\n.hero .slider-bg {`);
}

// Fix preload letter-spacing on small devices
css = css.replace(/letter-spacing:\s*16px;/g, 'letter-spacing: clamp(4px, 1.5vw, 10px);');

fs.writeFileSync('assets/css/style.css', css);
console.log('style.css updated successfully!');

