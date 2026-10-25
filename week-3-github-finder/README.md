# GitHub Profile Finder

Internlytic Technologies — Phase 1, Week 3 (Front-End Development).
Search any GitHub username and view the public profile and latest repositories.

**Live demo:** https://internlytic-frontend-phase1.vercel.app

## Features
- Username input, Search button and Enter-key support (native `<form>`)
- Avatar, display name, username, bio, location, company (optional fields are hidden when missing)
- Public repo count, followers and following
- Repository cards: name, description, language, stars, link
- Loading spinner, empty-input message, "user not found", rate-limit and network error states
- Responsive layout, keyboard focus styles, ARIA live region, reduced-motion support
- Old results are cleared and in-flight requests are cancelled (`AbortController`) so a previous
  user's data never appears under a new search

## API endpoints used
- `GET https://api.github.com/users/{username}`
- `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=30`

No token is used. Unauthenticated requests are limited to 60 per hour per IP.

## Setup
```bash
npm install
npm run dev      # development
npm run build    # production build in /dist
npm run preview  # preview the build
```

## Structure
```
src/
  api.js                 fetch helpers + error types
  App.jsx                state (idle/loading/success/error)
  components/
    SearchForm.jsx  ProfileCard.jsx  RepoList.jsx  RepoCard.jsx  Message.jsx
  styles.css
```

## Known limitations
- Shows the 30 most recently updated repositories; a link to GitHub shows the rest.
- Subject to GitHub's unauthenticated rate limit.
