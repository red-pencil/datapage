# RDV

Minimal tech company website - Ego data for Robot.

## Tech Stack

- Jekyll + minima theme
- GitHub Pages hosting
- Bilingual (EN/ZH) with auto-detect

## Development

```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve
```

## Features

- Single page scroll layout
- Bilingual support (EN/ZH)
- Mobile responsive
- Hero area reserved for future video/slides

## Structure

```
├── _config.yml      # Jekyll config
├── index.html      # Main page
├── _includes/     # Reusable components
│   ├── header.html
│   ├── hero.html
│   └── footer.html
├── assets/
│   ├── css/       # Styles
│   └── js/        # Language switcher
└── _posts/       # Blog posts (future)
```
