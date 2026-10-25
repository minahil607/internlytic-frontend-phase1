import { isValidUrl } from "../api.js";

// Shows each link only when it holds a valid URL.
export default function Links({ project }) {
  const live = isValidUrl(project.liveUrl);
  const repo = isValidUrl(project.githubUrl);
  if (!live && !repo) return <p className="muted">No links available yet.</p>;
  return (
    <div className="links">
      {live && <a className="btn" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Project</a>}
      {repo && <a className="btn ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub Repository</a>}
    </div>
  );
}
