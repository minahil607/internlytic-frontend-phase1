# Internlytic Projects Showcase

A responsive gallery concept where visitors can explore projects built by interns during Phase 1 of the Internlytic Technologies Front-End Development Internship, and see each project's creator and details.

> **Task:** Week 4 (Final Task), Internlytic Technologies Phase 1, 2026
> **Live demo:** https://YOUR-WEEK-4-LINK.vercel.app
> **Repository:** https://github.com/YOUR-USERNAME/internlytic-frontend-phase1

---

## Important: sample data only

This project was built independently, without access to the company's production website or private Supabase database. **Every project, intern name and link in the demo is fictional sample data**, stored in `src/data/sampleProjects.js`. Project links in the sample records are placeholders (`example.com`). No real personal data, passwords or API keys are used or committed.

---

## Features

**Browsing**
- Project cards showing title, thumbnail, intern name, track, and short description
- **View Project** and **GitHub Repository** buttons, shown only when a valid `http(s)` URL exists
- Details modal with the full description, technology stack, creation date and links

**Finding projects**
- Search by project title or intern name
- Filter by track (Front-End, Web Development, AI / ML, Data Science)
- Live result count, plus **Reset filters** and **Clear search** actions

**Interface states**
- Loading (skeleton cards)
- Empty gallery
- No search results
- Error with a **Try again** button

**Quality**
- Responsive layout for phones, tablets, laptops and desktops
- Keyboard accessible: visible focus styles, filter buttons use `aria-pressed`, the modal uses the native `<dialog>` element (focus trap, `Esc` to close)
- Respects `prefers-reduced-motion`
- Only projects with `approvalStatus: "approved"` are displayed. A pending sample record is included to demonstrate this

## Brand guidelines

| Colour | Hex | Use |
|---|---|---|
| Teal Green | `#18B59A` | Accents, primary buttons, active filters |
| Deep Blue-Green | `#073A40` | Headings, hero, strong elements |
| White | `#FFFFFF` | Cards, header |
| Light Tint | `#EAF7F4` | Page background |

The official Internlytic logo is used with its original proportions (fixed height, automatic width). There is no like or heart counter, by design.

## Tech stack

- React 18
- Vite 5
- Plain CSS (custom properties, CSS Grid, Flexbox)

## Getting started

**Requirements:** Node.js 18 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/internlytic-frontend-phase1.git
cd internlytic-frontend-phase1/week-4-projects-showcase

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build in /dist
npm run preview   # preview the production build
```

### Previewing the different states

Add a query string to the page URL:

| URL | Result |
|---|---|
| `/?state=error` | Shows the error state |
| `/?state=empty` | Shows the empty gallery |

## Project structure

```
week-4-projects-showcase/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                  # page state: loading / error / empty / results
    ├── api.js                   # data fetching (simulated) and URL validation
    ├── logo.png                 # official Internlytic logo
    ├── styles.css
    ├── data/
    │   └── sampleProjects.js    # clearly labelled sample data
    └── components/
        ├── SearchBar.jsx
        ├── FilterControls.jsx
        ├── ProjectCard.jsx
        ├── ProjectModal.jsx
        ├── Links.jsx            # shows links only when URLs are valid
        ├── Thumbnail.jsx        # image or placeholder
        └── Message.jsx          # empty, no-results and error messages
```

## Data model

These fields are **suggestions** and may not match the company's actual database columns.

| Field | Type | Description |
|---|---|---|
| `id` | number / uuid | Unique identifier |
| `projectTitle` | text | Project name |
| `internName` | text | Creator's name, or an intern reference (`intern_id`) |
| `track` | text | Category, for example Front-End or AI / ML |
| `description` | text | Short summary shown on the card |
| `longDescription` | text | Full description shown in the modal |
| `thumbnailUrl` | text | Screenshot URL (a placeholder is shown if empty) |
| `liveUrl` | text | Optional live project link |
| `githubUrl` | text | Optional repository link |
| `technologies` | text[] | Technology stack tags |
| `approvalStatus` | text | `pending`, `approved` or `rejected` |
| `createdAt` | date | Submission date |

## Proposed Supabase integration

This outlines how the showcase could later use real data safely. It is a proposal only and is not implemented in this demo.

1. **Tables.** A `projects` table with an `intern_id` column referencing an `interns` table. Joining on `intern_id` returns the creator's name without duplicating personal data.
2. **Fetch approved projects only**, selecting only the public columns:
   ```js
   const { data, error } = await supabase
     .from("projects")
     .select(
       "id, project_title, track, description, thumbnail_url, live_url, github_url, technologies, created_at, interns(full_name)"
     )
     .eq("approval_status", "approved")
     .order("created_at", { ascending: false });
   ```
3. **Enforce privacy on the server.** Enable Row Level Security with a public `SELECT` policy limited to `approval_status = 'approved'`, so unapproved projects cannot be read even if the front-end is bypassed.
4. **Keys.** Use only the public `anon` key, supplied through `VITE_` environment variables. Never use the `service_role` key in front-end code. No secrets are committed to this repository.
5. **Integration point.** Replace the body of `fetchProjects()` in `src/api.js` and map the returned snake_case columns to the field names above. No component changes are required.
6. **Safe links.** Links are validated and restricted to `http` and `https`, and external links use `rel="noopener noreferrer"`.

## Known limitations

- Sample data and placeholder thumbnails are used, because no real screenshots or database access were available.
- Sample project links point to placeholder addresses.
- A technology-stack filter is not included (optional in the brief); technologies are shown as tags in the modal.
- Data is loaded once and filtered on the client, which suits a small gallery. A large dataset would need server-side search and pagination.

## About

Built for the Internlytic Technologies Phase 1 Front-End Development Internship, 2026.

*Learn • Build • Showcase*