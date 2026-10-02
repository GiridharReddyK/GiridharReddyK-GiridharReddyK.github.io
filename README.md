# giridharreddyk.github.io

My personal academic website, hand-written in plain HTML, CSS and JavaScript.
There is no framework, no build step and nothing to install: the files you see are the website.

## What each file does

```
giridhar-site/
├── index.html            Home: photo, bio, research interests, news, selected papers, contact
├── publications.html     All papers by year, with Bib / Abs / DOI buttons
├── projects.html         Project cards with category filters
├── cv.html               Web CV + "Download PDF" button (also prints cleanly)
├── 404.html              Shown by GitHub Pages for any broken link
├── robots.txt            Tells search engines they may index the site
├── sitemap.xml           List of pages for Google Search Console
├── .nojekyll             Empty file: tells GitHub Pages "serve these files as-is"
├── README.md             This guide
└── assets/
    ├── css/style.css     All styling. Colours and fonts are at the very top.
    ├── js/main.js        Dark-mode button, mobile menu, Bib/Abs toggles, copy, filters
    ├── img/
    │   ├── favicon.svg              Browser-tab icon (antenna mast)
    │   ├── profile-placeholder.svg  Shown until you add profile.jpg
    │   └── profile.jpg              ← YOU ADD THIS (your photo)
    └── pdf/
        └── Giridhar_Reddy_Karnati_CV.pdf   ← YOU ADD THIS (your CV)
```

---

## Step 1: Look at it on your computer

Double-click `index.html` and it opens in your browser. That's enough for editing text.

To test it exactly as GitHub will serve it (needed for the 404 page), open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Step 2: Fill in the blanks

Every place that needs your input is marked with `TODO` in an HTML comment. In VS Code, press
**Ctrl+Shift+F**, search `TODO`, and work through the list.

- [ ] **Photo**: save as `assets/img/profile.jpg` (portrait, about 800×1000 px, under 300 KB)
- [ ] **CV PDF**: save as `assets/pdf/Giridhar_Reddy_Karnati_CV.pdf`
- [ ] **Email, LinkedIn URL, Google Scholar ID, ORCID iD**: in `index.html` (contact section) and `publications.html` (intro)
- [ ] Then add those same profile URLs to the `"sameAs"` list near the top of `index.html`
- [ ] **For each paper**: co-authors (in order), conference name, DOI link, abstract, and the official BibTeX
      (IEEE Xplore → _Cite This_ → _BibTeX_)
- [ ] **Third publication**: LinkedIn shows 3 and only 2 are on the site
- [ ] **Education years** (B.E. and Class XII), plus the third education entry if you want it
- [ ] **Years** for the FPGA hackathon and your amateur radio licence
- [ ] One line each on what you did at **RRI**, **CeNSE**, **NITK**, **IISc summer school**, **India Space Week** and **NIELIT**
- [ ] **Tools you actually use** in the Skills section (e.g. Cadence, ADS, HFSS, MATLAB, Python, Verilog)
- [ ] Any remaining **certifications / memberships / awards** you want to show

Only list what you can back up. A short, true CV reads better than a long, padded one.

## Step 3: Put it online with GitHub Pages (free)

1. Sign in to GitHub as **giridharreddyk**.
2. Click **+ → New repository**.
   - Repository name: **`giridharreddyk.github.io`** (exactly this, so the site lives at the root URL)
   - Visibility: **Public** → **Create repository**
3. On the empty repo page, click **uploading an existing file**.
   Drag in the _contents_ of this folder (`index.html`, the other `.html` files, `robots.txt`, `sitemap.xml`,
   `README.md` and the whole `assets` folder). Don't drag the outer folder itself.
   Click **Commit changes**.
4. `.nojekyll` is a hidden file, so it often gets left out of drag-and-drop. Add it on GitHub instead:
   **Add file → Create new file**, name it `.nojekyll`, leave it empty, **Commit**.
5. Go to **Settings → Pages**. Under _Build and deployment_ choose **Deploy from a branch**,
   branch **main**, folder **/(root)** → **Save**.
6. After 1–2 minutes your site is live at **https://giridharreddyk.github.io**.

> If you use a different repo name (e.g. `website`), the address becomes
> `giridharreddyk.github.io/website/`. You would then have to add `/website` to the start of the paths
> in `404.html` and update the URLs in `<link rel="canonical">`, `sitemap.xml` and `robots.txt`.
> Using `giridharreddyk.github.io` avoids all of that.

Your existing `Prism` repo is a copy of the al-folio template and this site doesn't use it.
You can archive or delete it once your own site is live.

## Step 4: After it's live

- Add the URL to **LinkedIn** (_Contact info → Website_), **ORCID** (_Websites & social links_),
  **Google Scholar** (_Edit profile → Homepage_) and your **GitHub profile**.
- **Google Search Console** (search.google.com/search-console): add the site, verify it with the
  HTML-tag method (paste the tag into the `<head>` of `index.html`), then submit `sitemap.xml`.
  This gets your name → your site on Google faster.
- **Optional custom domain** (e.g. `giridharkarnati.com`): buy it, then go to _Settings → Pages →
  Custom domain_. Afterwards, replace `giridharreddyk.github.io` everywhere (search all files).

---

## Everyday edits

You can edit straight on GitHub: open a file → pencil icon → change → **Commit**. The site updates in about a minute.

| I want to…              | Do this                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Add a news item         | `index.html` → copy one `<li>` inside `<ul class="news">`, put it at the top                                                    |
| Add a paper             | `publications.html` → copy a whole `<li class="pub">` block and give its panels new ids. Also add it to `cv.html` (and to the home page if it's a highlight) |
| Add a project           | `projects.html` → copy a `<li class="card">`; set `data-category` to one or more of `ic rf satcom fab digital`                  |
| Add a project image     | Put the image in `assets/img/projects/` and add `<img class="card-img" src="..." alt="...">` as the first line of the card     |
| Change the accent color | `assets/css/style.css` → change `--accent` (and `--accent-strong`, `--accent-soft`) in **all three** colour blocks at the top  |
| Add a new page          | Copy `cv.html`, rename it, replace the content, then add a link to it in the `<ul class="nav-links">` of **every** page          |

The header and footer are repeated in each `.html` file, so a change to the menu has to be made in all of them (5 files).
That's the trade-off for having no build tools.

## Credits

- Layout ideas (profile header, news list, publication list with BibTeX buttons, web CV) are inspired by
  academic themes such as al-folio. All the code here was written from scratch, with no files taken from those themes.
- GitHub, LinkedIn, ORCID and Google Scholar icons: [Simple Icons](https://simpleicons.org) (CC0, public domain).
- Fonts: IBM Plex Sans / Serif / Mono (SIL Open Font License) via Google Fonts.
