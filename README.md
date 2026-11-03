# Rajasthan Facts

राजस्थान सामान्य ज्ञान (GK), इतिहास, भूगोल, कला-संस्कृति, राजनीति, अर्थव्यवस्था व प्रतियोगी परीक्षा तैयारी (RAS, RPSC, RSSB/RSMSSB, Rajasthan Police, Patwari, Rajasthan CET, REET, LDC) के लिए एक पूर्णतः स्टैटिक शैक्षणिक वेबसाइट।

## Tech stack

HTML5 + CSS3 + vanilla JavaScript only — no frameworks, no backend, no database. All content lives in local JS data files under `assets/js/data/`.

## Running locally

No build step is required. Any static file server works:

```bash
cd education-website
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Opening `index.html` directly via `file://` also works, since the site has no server-side dependencies.

## Hosting on Apache / Nginx

Copy the contents of this folder to your web root (e.g. `/var/www/html/`). No special server config is required beyond serving static files. A sample Nginx block:

```nginx
server {
  listen 80;
  server_name your-domain.example;
  root /var/www/rajasthan-facts;
  index index.html;
  error_page 404 /404.html;
}
```

## Project structure

```
education-website/
├── index.html, rajasthan-gk.html, topic-details.html
├── districts.html, district-details.html
├── quizzes.html, quiz-details.html, quiz-result.html
├── daily-gk.html
├── mock-tests.html, mock-test-details.html
├── previous-year-questions.html
├── study-material.html, notes-details.html
├── blog.html, blog-details.html
├── search.html, contact.html, about.html
├── privacy-policy.html, terms-and-conditions.html, disclaimer.html, 404.html
├── robots.txt, sitemap.xml
└── assets/
    ├── css/ (style, components, content, quiz, animations, responsive)
    ├── js/
    │   ├── data/ (topics.js, districts.js, quizzes.js, blogs.js, resources.js, daily-gk.js)
    │   ├── navigation.js, search.js, main.js, forms.js, animations.js
    │   ├── topic-details.js, district-details.js, blogs.js, listings.js
    │   └── quiz.js, mock-test.js, quiz-result.js
    ├── images/ (logo, hero, forts, culture, districts, history, blogs, icons)
    └── downloads/ (notes, current-affairs, sample-papers — demo placeholder PDFs)
```

## Adding content

- **New GK topic**: add an object to the `RF_TOPICS` array in `assets/js/data/topics.js` (id, category, title, intro, sections, facts, mcqs, related, lastUpdated, source). It automatically appears on `rajasthan-gk.html` and is reachable at `topic-details.html?id=<your-id>`.
- **New district**: add an object to `RF_DISTRICTS` in `assets/js/data/districts.js`.
- **New quiz / question**: edit `RF_QUIZZES` in `assets/js/data/quizzes.js`. New mock tests go in `RF_MOCK_TESTS`; previous-year-style practice questions go in `RF_PYQ`.
- **New blog article**: add an object to `RF_BLOGS` in `assets/js/data/blogs.js`.
- **New study resource**: add an object to `RF_RESOURCES` in `assets/js/data/resources.js` and drop the real file under `assets/downloads/`.
- **New daily GK question**: append to `RF_DAILY_GK` in `assets/js/data/daily-gk.js` with a `date` field.

All of the above datasets are also used to build the client-side search index in `assets/js/search.js` — nothing else needs to change for new entries to become searchable.

## Important content notes

- **District count**: Rajasthan's administrative district count/boundaries have changed more than once in recent years. This project uses the long-standing 33-district structure as a stable educational baseline and flags this explicitly on `districts.html`. Verify the current official count from the Rajasthan Revenue Department before using this for exam purposes.
- **Quizzes / mock tests / previous-year questions**: all scoring happens entirely in the browser (`sessionStorage`), nothing is sent to or stored on a server. Sample/demo questions are explicitly labeled and are **not** official previous-year papers unless stated otherwise.
- **Study material PDFs**: the files under `assets/downloads/` are minimal placeholder PDFs for demonstrating the download flow — replace them with verified real content before using this in production.
- **Officeholders / current affairs**: names of current officeholders and current-affairs items change frequently and are intentionally not hardcoded as facts here — see `rajasthan-polity-overview` topic notes for guidance on where to verify the latest information.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `IntersectionObserver`, `sessionStorage`/`localStorage` (with try/catch fallbacks), and CSS custom properties.
