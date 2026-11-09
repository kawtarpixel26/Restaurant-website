<div align="center">

  <h1 align="center">🔥 Blacksmith Agadir - Restaurant, Smokehouse &amp; Lounge</h1>

  <p align="center">
    <strong>A modern, responsive, high-end website for Blacksmith Agadir Restaurant</strong><br>
    4.7 ⭐ (3,943+ Reviews) · MAD 100–200 · 2 Rue des Orangers, Agadir 80000
  </p>

  <p align="center">
    <a href="./index.html"><strong>➥ Open Website</strong></a>
  </p>

</div>

---

## 📋 About Blacksmith Agadir

**Blacksmith Agadir** is a premier charcoal smokehouse, grill, and lounge located in Agadir, Morocco. Known for authentic fire-forged culinary craft, sizzling skewers with hand-cut chips, the signature Flamin' Chicken Burger, traditional Moroccan briouates, and artisanal mocktails.

- **📍 Address:** 2 Rue des Orangers, Agadir 80000, Morocco (Google Maps Plus Code: `C9FX+37 Agadir`)
- **📞 Phone:** `06 99 77 96 00` / `+212 699 77 96 00`
- **⭐ Rating:** 4.7 / 5.0 (3,943+ verified Google reviews)
- **💰 Price Range:** MAD 100–200 per guest
- **⏰ Hours:** Open daily from 12:00 PM to 01:00 AM (Closes 1 AM)
- **🍽️ Services:** Dine-in · Kerbside Pickup · No-Contact Delivery

---

## ✨ Features & Enhancements

- **Brand Customization:** 100% customized for Blacksmith Agadir with custom SVG forge logo, favicon, color harmony, and localized typography.
- **Hero Slider:** 3 responsive, high-impact slides highlighting charcoal grilling, signature burgers, skewers, and night lounge ambiance.
- **Interactive Menu Filter:** Smooth category switching across *Grills & Burgers*, *Briouates & Tapas*, *Moroccan & Seafood*, and *Mojitos & Sweets*.
- **Google Reviews Integration:** Prominent 4.7★ trust badge with verified customer testimonials and pricing indicators.
- **Interactive Online Reservation:** Full booking form with real-time feedback modal, guest details summary, direct WhatsApp confirmation, and phone booking.
- **Google Maps Integration:** Dedicated interactive map embed and one-click navigation links to 2 Rue des Orangers (C9FX+37).
- **Mobile Sticky Action Bar:** Quick-action bar on mobile for instant calls, online reservations, and GPS directions.
- **Performance & Accessibility:** Fully responsive on all device sizes, semantic HTML5, smooth parallax scrolling, and accessible ARIA attributes.

---

## 🚀 How to Run Locally

### Option 1: Using Node.js
```bash
node -e "
const http = require('http'), fs = require('fs'), path = require('path');
http.createServer((req, res) => {
  let p = '.' + req.url.split('?')[0];
  if (p === './') p = './index.html';
  const ext = path.extname(p);
  const m = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); }
    else { res.writeHead(200, { 'Content-Type': m[ext] || 'application/octet-stream' }); res.end(data); }
  });
}).listen(8080, () => console.log('Blacksmith website running at http://localhost:8080/'));
"
```

### Option 2: Direct Browser
Simply double-click `index.html` or open it with any web browser.

---

## 📄 License
MIT License
