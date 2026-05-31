import { useCallback, useState } from 'react';

const MY_EMAIL = 'rfsolloso03@gmail.com';
const INITIAL = { name: '', email: '', message: '' };

const LIMITS = {
  name:    60,
  email:   80,
  message: 500,
};

const VALIDATORS = {
  name: (v) => {
    if (!v.trim()) return 'Name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    return null;
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email address.';
    return null;
  },
  message: (v) => {
    if (!v.trim()) return 'Message is required.';
    if (v.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  },
};

export function useEmailForm() {
  
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > LIMITS[name]) return;           
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: VALIDATORS[name](value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: VALIDATORS[name](value) }));
  };

  const validate = () => {
    const allTouched = { name: true, email: true, message: true };
    const allErrors  = {
      name:    VALIDATORS.name(form.name),
      email:   VALIDATORS.email(form.email),
      message: VALIDATORS.message(form.message),
    };
    setTouched(allTouched);
    setErrors(allErrors);
    return !Object.values(allErrors).some(Boolean);
  };

  const handleSend = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  const reset = useCallback(() => {
    setForm(INITIAL);
    setErrors({});
    setTouched({});
    setStatus(null);
  }, []);

  const isValid = !Object.values(VALIDATORS).some(
    (fn, i) => fn(form[Object.keys(INITIAL)[i]])
  );

  return {
    form,
    errors,
    touched,
    status,
    limits: LIMITS,
    handleChange,
    handleBlur,
    handleSend,
    reset,
    isValid,
  };
}