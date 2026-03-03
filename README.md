# Tsiliii.github.io — Personal Academic Website

Personal website for **Thodoris Tsilivis**, PhD student in Computing & Data Science at Boston University.

Built with vanilla HTML, CSS, and JavaScript. No build tools or frameworks needed.

## 🚀 Quick Start (Local Preview)

Simply open `index.html` in your browser:

```bash
open index.html
```

## 📂 File Structure & Placeholders to Replace

```
Tsiliii.github.io/
├── index.html              # Main page (all content here)
├── styles.css              # Design system & styling
├── script.js               # Animations & interactivity
├── README.md               # This file
└── assets/
    ├── profile.jpg          ← YOUR PROFILE PHOTO (Mani 2019 photo)
    ├── cv.pdf               ← YOUR CV PDF
    ├── thesis.pdf           ← YOUR THESIS PDF (Learning Augmented Combinatorial Auctions)
    ├── gallery/
    │   ├── gelato.jpg       ← PHOTO: Gelato - Cinque Terre
    │   ├── cats.jpg         ← PHOTO: Hadiaris & Mavroula
    │   ├── sunset.jpg       ← PHOTO: Sunset - Kitries
    │   └── puzzles.jpg      ← PHOTO: Some Puzzles
    ├── slides/
    │   ├── bilateral-trade-northeastern-2026.pdf   ← SLIDES
    │   ├── bilateral-trade-harvard-2026.pdf        ← SLIDES
    │   ├── secretary-prophet-2024.pdf              ← SLIDES
    │   ├── thesis-2022.pdf                         ← SLIDES
    │   └── subadditive-drexel-2021.pdf             ← SLIDES
    └── notes/
        └── prophet-secretary-2024.pdf              ← NOTES PDF
```

> **All files marked with ← are placeholders.** Replace them with your actual files, keeping the same filenames.

## 🌐 Deploy to GitHub Pages

### 1. Create the repository

Go to [github.com/new](https://github.com/new) and create a repository named exactly:
```
Tsiliii.github.io
```
- Set it to **Public**
- Do NOT add a README (we already have one)

### 2. Push the code

From this project folder, run:
```bash
cd /Users/theotsili/.gemini/antigravity/scratch/Tsiliii.github.io
git init
git add .
git commit -m "Initial commit: personal academic website"
git branch -M main
git remote add origin https://github.com/Tsiliii/Tsiliii.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo: `https://github.com/Tsiliii/Tsiliii.github.io`
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Set branch to **main** and folder to **/ (root)**
5. Click **Save**

### 4. Visit your site! 🎉

Your site will be live at: **https://tsiliii.github.io**

It may take 1–2 minutes for the first deployment.

## ✏️ Updating Content

All content lives in `index.html`. To update:
- **Add a new paper**: Copy a `<div class="paper-card">` block in the Research section
- **Add a presentation**: Copy a `<div class="presentation-item">` block
- **Add a gallery photo**: Copy a `<div class="gallery-card">` block and add the image to `assets/gallery/`
- **Update bio**: Edit the text in the About section

After editing, commit and push:
```bash
git add .
git commit -m "Update: description of change"
git push
```

Changes go live automatically within ~1 minute.

## 🎨 Customization

Colors and styles are controlled via CSS custom properties at the top of `styles.css`:
- `--bg-primary`: Main background color
- `--accent`: Accent color (teal by default)
- `--text-primary`: Main text color

## 📋 Migrating from Google Sites

Once your new site is live, update your old Google Sites page to redirect visitors:
1. Edit your Google Sites page
2. Replace the content with a notice: *"This site has moved to [https://tsiliii.github.io](https://tsiliii.github.io)"*
3. Publish the changes
