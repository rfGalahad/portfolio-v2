import { useState, useEffect, useCallback } from 'react';
import { Phone, Close, ContentCopy, Check } from '@mui/icons-material';

import './ContactDialog.css';

const PHONE_NUMBER = '09284995166';
const DISPLAY_NUMBER = '(+63) 928 499 5166';

const ContactDialog = ({ open, onClose }) => {

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('input');
      el.value = PHONE_NUMBER;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // Close on Escape + reset copied when dialog closes
  useEffect(() => {
    if (!open) return;

    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      setCopied(false); // runs when open becomes false (cleanup)
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="phone-dialog-overlay" onClick={handleBackdropClick}>
      <div className="phone-dialog" role="dialog" aria-modal="true" aria-label="Contact number">
        {/* DIALOG HEADER */}
        <div className="phone-dialog-header">
          <div className="phone-dialog-title">
            <Phone sx={{ fontSize: 18 }} />
            <span>Contact Number</span>
          </div>
          <button className="phone-dialog-close" onClick={onClose} aria-label="Close">
            <Close sx={{ fontSize: 18 }} />
          </button>
        </div>

        {/* DIALOG BODY */}
        <div className="phone-dialog-body">
          <p className="phone-dialog-label">Feel free to reach out anytime.</p>

          <div className="phone-number-row">
            <span className="phone-number">{DISPLAY_NUMBER}</span>
            <button
              className={`phone-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              aria-label={copied ? 'Copied!' : 'Copy number'}
            >
              {copied
                ? <><Check sx={{ fontSize: 15 }} /> Copied</>
                : <><ContentCopy sx={{ fontSize: 15 }} /> Copy</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDialog;