# giridharreddyk.github.io

My personal academic website, hand-written in plain HTML, CSS and JavaScript.
There is no framework, no build step and nothing to install: the files you see are the website.
It is published by GitHub Pages from the `main` branch at **https://giridharreddyk.github.io**.

## What each file does

```
giridharreddyk.github.io/
├── index.html            Home: photo, bio, research interests, news, selected papers, contact
├── publications.html     All papers by year (Bib / Summary / link buttons) + talks
├── projects.html         Project cards with category filters + smaller builds
├── cv.html               Web CV + "Download PDF" button (also prints cleanly, even in dark mode)
├── 404.html              Shown by GitHub Pages for any broken link
├── robots.txt            Tells search engines they may index the site
├── sitemap.xml           List of pages for Google Search Console
├── .nojekyll             Empty file: tells GitHub Pages "serve these files as-is"
├── README.md             This guide
└── assets/
    ├── css/style.css     All styling. Colours and fonts are at the very top; print styles at the bottom.
    ├── js/main.js        Dark-mode button, mobile menu, Bib/Summary toggles, copy, filters
    ├── img/
    │   ├── favicon.svg              Browser-tab icon (antenna mast)
    │   ├── og-card.jpg              Preview image shown when a page is shared (LinkedIn, WhatsApp, X)
    │   ├── profile-placeholder.svg  Shown only if profile.jpg is missing
    │   ├── profile.jpg              Your photo (4:5 portrait, 600×750 px)
    │   └── projects/                Figures shown on project cards (from your reports)
    └── pdf/
        └── Giridhar_Reddy_Karnati_CV.pdf   Printed from cv.html (no phone number)
```

## Look at it on your computer

Double-click `index.html` and it opens in your browser. That's enough for editing text.

To test it exactly as GitHub will serve it (needed for the 404 page), open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Still to fill in

What's left is marked `TODO` in HTML comments (VS Code: **Ctrl+Shift+F** → search `TODO`).
None of it shows on the live site.

- [ ] **IEEE paper**: paste the official BibTeX and abstract (IEEE Xplore → _Cite This_ → _BibTeX_) in `publications.html`
- [ ] **Google Scholar / ORCID**: when you have them, un-comment the two buttons in `index.html` (contact section) and add the
      links to `"sameAs"` near the top of that file
- [ ] Optional: link your SatNOGS station page (`projects.html`) and add a PDF of the RAW 2024 article (`publications.html`)

Only list what you can back up. A short, true CV reads better than a long, padded one.

## Updating the CV PDF

The PDF is printed from the CV page, so keep `cv.html` up to date first. Then open the CV page in Chrome →
**Print** → _Destination_: **Save as PDF**, _Paper size_: **A4**, _Margins_: **Default** → save it as
`assets/pdf/Giridhar_Reddy_Karnati_CV.pdf`. You can also replace it with a CV made in LaTeX or Word: keep the same file name.

## After it's live

- Add the URL to **LinkedIn** (_Contact info → Website_), **ORCID** (_Websites & social links_),
  **Google Scholar** (_Edit profile → Homepage_) and your **GitHub profile**.
- **Google Search Console** (search.google.com/search-console): add the site, verify it with the
  HTML-tag method (paste the tag into the `<head>` of `index.html`), then submit `sitemap.xml`.
  This gets your name → your site on Google faster.
- **Optional custom domain** (e.g. `giridharkarnati.com`): buy it, then go to _Settings → Pages →
  Custom domain_. Afterwards, replace `giridharreddyk.github.io` everywhere (search all files).

Your existing `Prism` repo is a copy of the al-folio template and this site doesn't use it.
You can archive or delete it.

---

## Everyday edits

You can edit straight on GitHub: open a file → pencil icon → change → **Commit**. The site updates in about a minute.

| I want to…              | Do this                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Add a news item         | `index.html` → copy one `<li>` inside `<ul class="news">`, put it at the top                                                    |
| Add a paper             | `publications.html` → copy a whole `<li class="pub">` block and give its panels new ids. Also add it to `cv.html` (and to the home page if it's a highlight) |
| Add a project           | `projects.html` → copy a `<li class="card">`; set `data-category` to one or more of `rf radio ic fab digital`                   |
| Add a project image     | Put the image in `assets/img/projects/` and add `<figure class="card-figure"><img src="..." alt="..." /></figure>` as the first line of the card |
| Add an award or membership | `cv.html` → copy an `<li class="entry">` in the right section (newest first)                                                 |
| Change your photo       | Replace `assets/img/profile.jpg` with a 4:5 portrait (e.g. 600×750 px, under 300 KB), keeping the same file name |
| Change the accent color | `assets/css/style.css` → change `--accent` (and `--accent-strong`, `--accent-soft`) in **all three** colour blocks at the top  |
| Add a new page          | Copy `cv.html`, rename it, replace the content, then add a link to it in the `<ul class="nav-links">` of **every** page          |

The header and footer are repeated in each `.html` file, so a change to the menu has to be made in all of them (5 files).
That's the trade-off for having no build tools.

## Credits

- Layout ideas (profile header, news list, publication list with BibTeX buttons, web CV) are inspired by
  academic themes such as al-folio. All the code here was written from scratch, with no files taken from those themes.
- GitHub, LinkedIn, ORCID and Google Scholar icons: [Simple Icons](https://simpleicons.org) (CC0, public domain).
- Fonts: IBM Plex Sans / Serif / Mono (SIL Open Font License) via Google Fonts.
