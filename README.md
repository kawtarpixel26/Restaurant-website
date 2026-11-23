# Sakura Sushi — Restaurant Website

A modern, responsive, single-page website for **Sakura Sushi**, a Japanese restaurant in Casablanca, Morocco. Built with plain HTML, CSS and JavaScript — no framework, no build step.

**4.7 ★** (3,943 Google reviews) · MAD 100–200 per guest · Open daily 12:00 – 01:00

---

## Restaurant information

| | |
|---|---|
| **Address** | 2 Rue des Orangers, Casablanca 20000, Morocco (Plus Code `C9FX+37`) |
| **Phone / WhatsApp** | 06 99 77 96 00 · +212 699 77 96 00 |
| **Hours** | Daily, 12:00 PM – 01:00 AM |
| **Services** | Dine-in · Sushi bar counter · Kerbside pickup · No-contact delivery |

> The address, Plus Code, rating and reviews are placeholder content and should be replaced with the restaurant's real details before going live.

## Features

- **Hero slider** — three full-screen slides showcasing sushi, maki and sashimi.
- **Filterable menu** — *Maki & Rolls*, *Starters & Salads*, *Nigiri & Sashimi*, *Drinks & Desserts*, with prices in MAD.
- **Signature dish** and **chef** sections, photo gallery, features and customer reviews.
- **Online table reservation** — booking form with validation, a confirmation summary and a pre-filled WhatsApp message to the restaurant.
- **Google Maps** embed and one-click directions.
- **Mobile action bar** — call, reserve, directions and Instagram, always within reach on phones.
- **SEO and accessibility** — semantic HTML5, meta tags, descriptive `alt` text and ARIA attributes.
- **Fully responsive** — mobile, tablet and desktop layouts.

## Tech stack

- HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript
- [Ionicons](https://ionic.io/ionicons) for icons, Google Fonts (*Forum*, *DM Sans*)
- Optional Node.js server (`server.js`) with no dependencies

## Project structure

```
.
├── index.html          # Single-page site
├── server.js           # Optional local server + reservation endpoint
├── icon.svg            # Favicon
├── assets/
│   ├── css/style.css   # Styles
│   ├── js/script.js    # Interactions, menu filter, reservation form
│   └── images/         # Photos, logo and decorative graphics
└── LICENSE
```

## Getting started

**Option 1 — open the file.** Double-click `index.html`.

**Option 2 — local server (recommended).** Requires [Node.js](https://nodejs.org) 16 or later.

```bash
node server.js
```

Then open <http://localhost:8080/>. Use `PORT=3000 node server.js` to choose another port.

## Reservations and WhatsApp

When a guest submits the booking form, the site:

1. shows a confirmation summary;
2. opens WhatsApp with a ready-to-send message addressed to the restaurant — the guest taps **Send** to confirm;
3. when served by `server.js`, also saves the booking to a local `reservations.json` file (excluded from Git because it contains personal data).

**Fully automatic delivery (optional).** Set `CALLMEBOT_API_KEY` in `assets/js/script.js` with the restaurant owner's [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) key and the message is sent to the owner's WhatsApp without any action from the guest. Note that the key is visible in the page source; for a production setup, send the message from a backend using the WhatsApp Business API or Twilio instead.

## Customisation

- **Colours** — edit the custom properties at the top of `assets/css/style.css` (`:root`).
- **Menu items** — edit the `menu-card` entries in `index.html`; the `data-filter` attribute drives the category filter.
- **Contact details** — update the phone number, address and map in `index.html` and the WhatsApp number in `assets/js/script.js` (`SAKURA_WHATSAPP`).

## Deployment

The site is static and can be hosted on GitHub Pages, Netlify or any web server. On static hosting `server.js` is not available, so reservations are delivered through WhatsApp only.

## License

Released under the [MIT License](LICENSE).
