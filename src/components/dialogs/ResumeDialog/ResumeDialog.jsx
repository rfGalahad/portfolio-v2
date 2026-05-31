import { useEffect, useCallback } from 'react';
import { Close, Download, Description } from '@mui/icons-material';

import './ResumeDialog.css';


const RESUME_URL = '/Solloso_Resume.pdf';
const RESUME_FILENAME = 'Ruther_Solloso_Resume.pdf';

const ResumeDialog = ({ open, onClose }) => {

  const handleDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href = RESUME_URL;
    a.download = RESUME_FILENAME;
    a.click();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="resume-dialog-overlay" onClick={handleBackdropClick}>
      <div className="resume-dialog" role="dialog" aria-modal="true" aria-label="Resume / CV">
        {/* DIALOG HEADER */}
        <div className="resume-dialog-header">
          <div className="resume-dialog-title">
            <Description sx={{ fontSize: 18 }} />
            <span>Resume / CV</span>
          </div>
          <div className="resume-dialog-actions">
            <button className="resume-download-btn" onClick={handleDownload} aria-label="Download resume">
              <Download sx={{ fontSize: 15 }} />
              Download
            </button>
            <button className="resume-dialog-close" onClick={onClose} aria-label="Close">
              <Close sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>

        {/* DIALOG BODY */}
        <div className="resume-dialog-body">
          <iframe
            src={`${RESUME_URL}#toolbar=0&navpanes=0&scrollbar=0`}
            title="Resume / CV" 
            className="resume-iframe"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeDialog;