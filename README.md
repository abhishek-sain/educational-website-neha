# EduSphere — Educational Website

A complete, responsive, static educational website built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step, no backend.

## Running locally

Because the site uses `fetch`-free vanilla JS and relative paths, you can open `index.html` directly in a browser, but for best results (and to avoid any browser file:// restrictions) serve it with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (if you have it)
npx serve .
```

Then visit `http://localhost:8080`.

## Deploying

Upload the contents of this folder as-is to any static host or web server (Apache, Nginx, Netlify, Vercel, GitHub Pages, S3, etc.). No server-side runtime is required.

## Project structure

```
education-website/
├── index.html, about.html, courses.html, course-details.html,
│   programs.html, resources.html, blog.html, blog-details.html,
│   contact.html, login.html, register.html, 404.html
├── assets/
│   ├── css/   style.css (design system/base) · components.css (cards, forms, etc.)
│   │          responsive.css (breakpoints) · animations.css (reveal/motion)
│   ├── js/    data.js (all content datasets) · main.js (header/footer, nav, toasts,
│   │          reveal, counters) · courses.js · blogs.js · forms.js · animations.js
│   ├── images/ (logo, hero, courses, instructors, blogs, testimonials)
│   └── downloads/sample-resources/ (demo downloadable files)
├── robots.txt
└── sitemap.xml
```

## Adding content

All site content lives in `assets/js/data.js` as plain JS arrays — no HTML editing required:

- **Courses** — add an object to `courses`. Required fields: `id`, `title`, `category`,
  `instructorId`, `level` (Beginner/Intermediate/Advanced), `duration`, `rating`, `reviews`,
  `students`, `price`, `free`, `popular`, `newDate`, `thumb`, `description`, `tags`.
- **Programs** — add to `programs` with `title`, `duration`, `level`, `image`, `description`,
  `outcomes`.
- **Blog posts** — add to `blogs` with `title`, `category`, `author`, `date`, `readTime`,
  `thumb`, `excerpt`, and `content` (an HTML string; use `<h2>` tags for sections — they
  automatically populate the table of contents).
- **Study resources** — add to `resources` with `title`, `subject`, `type`, `size`,
  `downloads`, `file` (path under `assets/downloads/`).
- **Instructors / testimonials / FAQs** — add to their respective arrays following the
  existing shape.

Every listing, filter, and detail page reads from this file at runtime, so new entries
appear automatically — no other file needs to change.

## Customizing branding

Colors, fonts, spacing, and radii are defined as CSS variables in
`assets/css/style.css` under `:root`. Change them once and the whole site updates:

```css
:root {
  --color-primary: #1E40AF;   /* Deep Blue */
  --color-secondary: #38BDF8; /* Sky Blue */
  --color-accent: #F59E0B;    /* Orange */
  --font-heading: 'Poppins', 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

Replace the logo text/icon in the `buildHeader()`/`buildFooter()` functions in
`assets/js/main.js`, or swap in an image logo from `assets/images/logo/`.

## Notes on demo behavior

This is a static site with no backend or database:

- The **contact**, **login**, and **register** forms validate input client-side and show a
  simulated success/error state — nothing is sent to a server or stored anywhere real.
- **Course/program enrollment** and **newsletter subscriptions** show a toast confirmation
  but do not process real transactions or emails.
- **Study resource downloads** point to small placeholder files under
  `assets/downloads/sample-resources/` — swap in real PDFs for production use.

## Browser support

Built with modern, broadly-supported CSS/JS (CSS variables, `IntersectionObserver`,
`clamp()`, grid). Tested against current Chrome, Firefox, Safari, and Edge. Respects
`prefers-reduced-motion` for users who disable animations.
