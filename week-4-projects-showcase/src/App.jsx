import { useEffect, useMemo, useState } from "react";
import { fetchProjects } from "./api.js";
import SearchBar from "./components/SearchBar.jsx";
import FilterControls from "./components/FilterControls.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Message from "./components/Message.jsx";
import logo from "./logo.png";

export default function App() {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  const [selected, setSelected] = useState(null);

  function load() {
    setStatus("loading");
    fetchProjects()
      .then((data) => { setProjects(data); setStatus("success"); })
      .catch(() => setStatus("error"));
  }
  useEffect(load, []);

  const tracks = useMemo(() => ["All", ...new Set(projects.map((p) => p.track))], [projects]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) =>
      (track === "All" || p.track === track) &&
      (!q || p.projectTitle.toLowerCase().includes(q) || p.internName.toLowerCase().includes(q))
    );
  }, [projects, query, track]);

  const filtersActive = query.trim() !== "" || track !== "All";
  function reset() { setQuery(""); setTrack("All"); }

  return (
    <>
      <header className="top">
        <div className="brand">
          <img className="logo" src={logo} alt="Internlytic Technologies" />
        </div>
      </header>

      <section className="hero">
        <h1>Projects Showcase</h1>
        <p>Explore work built by interns during Phase 1 and meet the people behind it.</p>
        <p className="sample-note">Demo using clearly labelled sample data.</p>
      </section>

      <main className="container">
        {status === "success" && projects.length > 0 && (
          <div className="controls">
            <SearchBar value={query} onChange={setQuery} />
            <FilterControls tracks={tracks} active={track} onChange={setTrack} />
            {filtersActive && <button className="link-btn" onClick={reset}>Reset filters</button>}
            <p className="count" role="status">
              {results.length} {results.length === 1 ? "project" : "projects"}
            </p>
          </div>
        )}

        {status === "loading" && (
          <ul className="grid" aria-busy="true" aria-label="Loading projects">
            {[1, 2, 3].map((n) => <li key={n} className="card skeleton" />)}
          </ul>
        )}

        {status === "error" && (
          <Message tone="error" title="Projects could not be loaded" text="Check your connection and try again.">
            <button className="btn" onClick={load}>Try again</button>
          </Message>
        )}

        {status === "success" && projects.length === 0 && (
          <Message title="No projects yet" text="Approved intern projects will appear here once they are published." />
        )}

        {status === "success" && projects.length > 0 && results.length === 0 && (
          <Message title="No matching projects" text="Try a different title, intern name or track.">
            <button className="btn" onClick={reset}>Clear search and filters</button>
          </Message>
        )}

        {status === "success" && results.length > 0 && (
          <ul className="grid">
            {results.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
            ))}
          </ul>
        )}
      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <footer>Internlytic Technologies | Learn • Build • Showcase</footer>
    </>
  );
}