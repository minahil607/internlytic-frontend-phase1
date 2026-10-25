# Internlytic Projects Showcase

Internlytic Technologies — Phase 1, Week 4 (Front-End Development).
A gallery where visitors can browse projects built by interns and see each project's creator and details.

**Live demo:** _add your Vercel link here_

> **All data is sample data.** The records in `src/data/sampleProjects.js` are fictional and clearly labelled.
> No access to the company website or Supabase database was used.

## Features
- Projects gallery: title, thumbnail, intern name, track, short description
- **View Project** and **GitHub Repository** buttons, shown only when the URL is valid (`http(s)` only)
- Search by project title or intern name
- Filter by track, with a Reset filters / Clear search action
- Details modal: full description, technology stack, links (native `<dialog>`: focus trap, Esc to close)
- Loading skeletons, empty gallery, no results and error states (with Try again)
- Responsive grid, keyboard focus styles, `aria-pressed` filters, reduced-motion support
- Official palette: Teal `#18B59A`, Deep Blue-Green `#073A40`, White `#FFFFFF`, Light `#EAF7F4`. No like/heart counter.

## Try the states
Add a query string to the page URL:
- `?state=error` — shows the error state
- `?state=empty` — shows the empty gallery

## Data model (suggested fields)
| Field | Type | Notes |
|---|---|---|
| id | number/uuid | |
| projectTitle | text | |
| internName | text | or `intern_id` referencing an interns table |
| track | text | Front-End, Web Development, AI / ML, Data Science |
| description / longDescription | text | |
| thumbnailUrl | text | screenshot; placeholder shown if empty |
| liveUrl / githubUrl | text | optional; hidden unless a valid URL |
| technologies | text[] | |
| approvalStatus | text | `pending` / `approved` / `rejected` |
| createdAt | date | |

These are suggestions and may not match the company's real columns.

## Proposed safe Supabase integration
1. Store projects in a `projects` table with `intern_id` referencing an `interns` table (a join returns the creator's name, so no personal data is duplicated).
2. Fetch only approved rows, selecting only public columns:
   ```js
   const { data, error } = await supabase
     .from("projects")
     .select("id, project_title, track, description, thumbnail_url, live_url, github_url, technologies, created_at, interns(full_name)")
     .eq("approval_status", "approved")
     .order("created_at", { ascending: false });
   ```
3. Enforce this on the **server**, not just in the UI: enable Row Level Security with a public `SELECT` policy `using (approval_status = 'approved')`.
4. Use only the public **anon** key in the front-end (via `VITE_` environment variables); never the service-role key. No keys are committed to this repo.
5. Map the returned snake_case columns to the field names above inside `src/api.js` (the only file that needs to change).

## Setup
```bash
npm install
npm run dev
npm run build
```

## Structure
```
src/
  api.js                   data fetch (simulated) + URL validation
  data/sampleProjects.js   labelled sample data
  App.jsx                  state: loading / error / empty / results
  components/
    SearchBar  FilterControls  ProjectCard  ProjectModal  Links  Thumbnail  Message
  styles.css
```

## Known limitations
- Placeholder logo mark: replace with the official logo file, keeping its proportions.
- Placeholder thumbnails are shown because sample records have no screenshots.
- Technology filter is not included (optional in the brief).
