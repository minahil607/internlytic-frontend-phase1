import Thumbnail from "./Thumbnail.jsx";
import Links from "./Links.jsx";

export default function ProjectCard({ project, onOpen }) {
  return (
    <li className="card">
      <Thumbnail project={project} />
      <div className="card-body">
        <span className="tag track">{project.track}</span>
        <h2>{project.projectTitle}</h2>
        <p className="by">By {project.internName}</p>
        <p>{project.description}</p>
        <button className="link-btn" onClick={onOpen} aria-label={`View details for ${project.projectTitle}`}>Details</button>
        <Links project={project} />
      </div>
    </li>
  );
}
