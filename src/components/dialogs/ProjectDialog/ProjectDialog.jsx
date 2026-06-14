import { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

import './ProjectDialog.css';

const ProjectDialog = ({ open, onClose, project }) => {

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || !project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="pd-overlay" onClick={handleBackdropClick}>
      <div className="pd-dialog" role="dialog" aria-modal="true" aria-label={project.title}>

        <div className="pd-header">
          <div className="pd-title">
            <GridViewRoundedIcon sx={{ fontSize: 16 }} />
            <span>{project.title}</span>
          </div>
          <button className="pd-close" onClick={onClose} aria-label="Close">
            <Close sx={{ fontSize: 16 }} />
          </button>
        </div>

        <div className="pd-body">

          {/* Screenshot preview */}
          {project.image && (
            <div className="pd-preview">
              <img src={project.image} alt={`${project.title} screenshot`} />
            </div>
          )}

          <div className="pd-meta">
            {project.status && (
              <span className={`pd-badge pd-badge--${project.status.toLowerCase()}`}>
                {project.status === 'Live' && <span className="pd-badge-dot" />}
                {project.status}
              </span>
            )}
            {project.year && (
              <span className="pd-badge pd-badge--year">{project.year}</span>
            )}
            {project.role && (
              <span className="pd-role">{project.role}</span>
            )}
          </div>

          {project.description && (
            <p className="pd-description">{project.description}</p>
          )}

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <>
              <div className="pd-divider" />
              <div className="pd-section">
                <p className="pd-section-label">Highlights</p>
                <div className="pd-highlights">
                  {project.highlights.map((item) => (
                    <div key={item} className="pd-highlight-item">
                      <span className="pd-highlight-dot" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {project.stack?.length > 0 && (
            <>
              <div className="pd-divider" />
              <div className="pd-section">
                <p className="pd-section-label">Tech stack</p>
                <div className="pd-stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="pd-stack-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {project.link && (
            <>
              <div className="pd-divider" />
              <a
                className="pd-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
                View live project
              </a>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;