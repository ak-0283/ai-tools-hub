# 🤖 AI Tools Hub

A fully responsive, modern multi-page website built with HTML, CSS, and JavaScript for AI model evaluation utilities.

## 🔗 Live Tools

- 📊 Confusion Matrix Generator: `https://confusion-matrix-generator.vercel.app/`
- 📈 Metrics Table Generator: `https://ml-metrics-table-generator.vercel.app/`

## 📄 Pages

- `index.html` — Home
- `about.html` — About metrics and confusion matrix concepts
- `contact.html` — Contact form with validation

## ✨ Features

- 📌 Sticky responsive navbar + mobile hamburger menu
- 🌙 Dark mode toggle with saved preference (`localStorage`)
- 🎬 Smooth transitions, hover effects, fade-in on scroll
- ⏳ Loading animation and ⬆️ scroll-to-top button
- 🧊 Glassmorphism gradient UI style
- 🪟 Welcome popup with:
	- Time-based greeting (morning/afternoon/evening/night)
	- Live system date & time + timezone
	- Once-per-day display logic
	- Keyboard accessibility (focus trap + `Esc` close)
- 📬 Contact form validation and inline user feedback

## 🔎 SEO & GEO Enhancements

- ✅ Meta tags: title, description, canonical, robots, keywords
- ✅ Social metadata: Open Graph + Twitter cards
- ✅ Structured data (JSON-LD): `Organization`, `WebSite`, `WebPage`, `AboutPage`, `ContactPage`
- ✅ Crawl guidance files:
	- `robots.txt`
	- `sitemap.xml`
	- `llms.txt`

## 🗂️ Project Structure

```text
.
├── index.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── robots.txt
├── sitemap.xml
├── llms.txt
├── .gitignore
└── README.md
```

## 🚀 Run Locally

Open `index.html` directly, or run a simple local server:

```powershell
Set-Location "c:\Users\91600\OneDrive\Desktop\c c++\ai-tools-hub"
python -m http.server 5500
```

Then visit:

- 🌐 `http://localhost:5500/index.html`

## 🧑‍💻 Author

Built by **Abhay Kumar**.