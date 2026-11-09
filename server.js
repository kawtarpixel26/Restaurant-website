const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const OWNER_PHONE = "212699779600"; // 06 99 77 96 00

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  // Handle POST /api/reservation
  if (req.method === 'POST' && req.url === '/api/reservation') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('\n========================================');
        console.log('🔥 NOUVELLE RÉSERVATION BLACKSMITH AGADIR');
        console.log('========================================');
        console.log(`👤 Client      : ${data.name}`);
        console.log(`📞 Téléphone   : ${data.phone}`);
        console.log(`👥 Couverts    : ${data.person}`);
        console.log(`📅 Date & Heure: ${data.date} à ${data.time}`);
        console.log(`📍 Formule     : ${data.serviceType}`);
        console.log(`📝 Remarques   : ${data.message}`);
        console.log(`⏰ Enregistré le: ${data.createdAt || new Date().toISOString()}`);
        console.log('📱 Destinataire WhatsApp: +212 699 77 96 00');
        console.log('========================================\n');

        // Save to reservations.json ledger
        const ledgerFile = path.join(__dirname, 'reservations.json');
        let reservations = [];
        if (fs.existsSync(ledgerFile)) {
          try { reservations = JSON.parse(fs.readFileSync(ledgerFile, 'utf-8')); } catch (e) {}
        }
        reservations.push(data);
        fs.writeFileSync(ledgerFile, JSON.stringify(reservations, null, 2));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Reservation logged and sent!' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle static files
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Blacksmith Agadir Website running at:`);
  console.log(`   👉 http://localhost:${PORT}/`);
  console.log(`📱 WhatsApp Destination: 06 99 77 96 00 (+212699779600)`);
  console.log(`======================================================\n`);
});

