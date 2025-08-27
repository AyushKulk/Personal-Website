# Minimal ECE Portfolio

A sleek, minimal personal portfolio inspired by Apple, Teenage Engineering, and Palantir. Static HTML/CSS/JS. No build tools required.

## Structure

```
/index.html           # Home: hero + projects grid (renders from JSON)
/about.html           # About page with bio and links
/assets/css/style.css # Global styles and design system
/assets/js/main.js    # Interactions + projects renderer
/assets/data/projects.json
/assets/img/favicon.svg
```

## Run locally

Option 1: Python (built-in)

```bash
cd /workspace
python3 -m http.server 5173
# open http://localhost:5173
```

Option 2: Node (if you prefer)

```bash
npx serve -p 5173 .
# open http://localhost:5173
```

## Customize

- Update your name and contact links in `index.html` and `about.html`.
- Edit `assets/data/projects.json` to add/remove projects. Fields:

```json
{
  "title": "Project Title",
  "description": "Short 1–2 line summary",
  "tags": ["Tag1", "Tag2"],
  "repoUrl": "https://github.com/yourhandle/repo",
  "liveUrl": "https://example.com (optional)",
  "image": "/assets/img/cover.png (optional)"
}
```

- Add social preview image at `assets/img/social-card.png` (1200x630) or remove the meta tag.
- Tweak palette and spacing via CSS variables in `assets/css/style.css`.

## Deploy

- GitHub Pages: push to a repo and enable Pages → deploy from `/`.
- Netlify/Vercel: drag-and-drop the folder or connect the repo (no build step).

## Notes

- The site uses system fonts and respects the OS color scheme.
- Animations are subtle and accessible (reduced motion honored by browser).

