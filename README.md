# Personal Developer Portfolio

A modern, animated, developer-style portfolio website. Built with plain HTML, CSS and JavaScript — no build step required.

## Structure

```
index.html          # markup
css/style.css       # styles + theme variables
js/main.js          # interactions, data, animations
```

## Customize

Open `js/main.js` and edit the `SITE` and `PROJECTS` objects at the top:

- `SITE.name`, `SITE.role`, `SITE.typing` — hero identity and typing phrases
- `PROJECTS` — array of project cards (title, desc, tags, category, icon, links, details)

Then search `index.html` for `Your Name`, `you@example.com`, `yourhandle` and replace with your real info.

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

Drop the folder on any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages). No build command needed.

## Features

- Dark / light theme toggle (persisted)
- Animated particle background + cursor glow
- Typing hero animation
- Scroll-reveal sections & animated skill bars
- Project filters + detail modal
- Responsive, mobile-friendly
- Accessible, keyboard-navigable
