// Placeholder thumbnail (initials on a brand-colour panel) used when no screenshot URL exists.
export default function Thumbnail({ project }) {
  if (project.thumbnailUrl) {
    return <img className="thumb" src={project.thumbnailUrl} alt={`Screenshot of ${project.projectTitle}`} loading="lazy" />;
  }
  const initials = project.projectTitle.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return <div className="thumb placeholder" role="img" aria-label={`${project.projectTitle} placeholder thumbnail`}>{initials}</div>;
}
