import { useEffect, useRef } from "react";
import Links from "./Links.jsx";
import Thumbnail from "./Thumbnail.jsx";

// Native <dialog>: gives focus trapping and Esc-to-close for free.
export default function ProjectModal({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.showModal(); }, []);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
    >
      <button className="close" onClick={() => ref.current.close()} aria-label="Close details">×</button>
      <Thumbnail project={project} />
      <span className="tag track">{project.track}</span>
      <h2 id="modal-title">{project.projectTitle}</h2>
      <p className="by">By {project.internName} · Added {project.createdAt}</p>
      <p>{project.longDescription || project.description}</p>
      {project.technologies.length > 0 && (
        <>
          <h3>Technology stack</h3>
          <ul className="tags">{project.technologies.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
        </>
      )}
      <Links project={project} />
    </dialog>
  );
}
