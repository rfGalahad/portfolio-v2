import { useEffect } from 'react';
import { Mail, Close, Send } from '@mui/icons-material';

import { useEmailForm } from './useEmailForm';

import './EmailDialog.css';
import InputField from '../../InputField';


const FIELDS = [
  { 
    label: 'Name',    
    name: 'name',    
    placeholder: 'Your name' 
  },
  { 
    label: 'Email',   
    name: 'email',   
    placeholder: 'your@email.com', 
    type: 'email' 
  },
  { 
    label: 'Message', 
    name: 'message', 
    placeholder: "What's on your mind?", 
    multiline: true 
  },
];

const EmailDialog = ({ open, onClose }) => {

  const {
    form, 
    errors, 
    touched, 
    status, 
    limits,
    handleChange, 
    handleBlur, 
    handleSend, 
    reset,
  } = useEmailForm();

  // Auto-close after sent state
  useEffect(() => {
    if (status === 'sent') {
      const t = setTimeout(() => { reset(); onClose(); }, 1600);
      return () => clearTimeout(t);
    }
  }, [status, reset, onClose]);

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
    <div className="email-dialog-overlay" onClick={handleBackdropClick}>
      <div className="email-dialog" role="dialog" aria-modal="true" aria-label="Send a message">
        {/* Dialog Header */}
        <div className="email-dialog-header">
          <div className="email-dialog-title">
            <Mail sx={{ fontSize: 18 }} />
            <span>Send a Message</span>
          </div>
          <button className="email-dialog-close" onClick={onClose} aria-label="Close">
            <Close sx={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Dialog Body */}
        <div className="email-dialog-body">
          {FIELDS.map(f => (
            <InputField
              key={f.name}
              {...f}
              form={form}
              errors={errors}
              touched={touched}
              limits={limits}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          ))}
        </div>

        {/* Dialog Footer */} 
        <div className="email-dialog-footer">
          <button 
            className="email-cancel-btn" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`email-send-btn ${status === 'sent' ? 'sent' : ''}`}
            onClick={handleSend}
            disabled={status === 'sent'}
          >
            {status === 'sent' ? <>Sent ✓</> : <><Send sx={{ fontSize: 15 }} /> Send</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailDialog;