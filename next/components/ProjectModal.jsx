'use client';

import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => e.stopPropagation()}>
        <p className="kicker">PROJECT</p>
        <h2>{project.title}</h2>
        <p className="muted">{project.description}</p>
        <ul className="chips">
          {project.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="actions">
          {project.link && (
            <a className="btn" href={project.link} target="_blank" rel="noreferrer">View source</a>
          )}
          <button type="button" className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
