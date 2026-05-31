import './InputField.css';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  multiline, 
  form, 
  errors, 
  touched, 
  limits, 
  handleChange, 
  handleBlur 
}) => {

  const hasError = touched[name] && errors[name];
  const count    = form[name].length;
  const limit    = limits[name];
  const nearLimit = count >= limit * 0.85;

  return (
    <div className={`email-field ${hasError ? 'email-field--error' : ''}`}>
      <div className="email-field-top">
        <label className="email-label" htmlFor={`email-${name}`}>{label}</label>
        <span className={`email-char-count ${nearLimit ? 'email-char-count--warn' : ''} ${count === limit ? 'email-char-count--max' : ''}`}>
          {count}/{limit}
        </span>
      </div>

      {multiline ? (
        <textarea
          id={`email-${name}`}
          className={`email-input email-textarea ${hasError ? 'email-input--error' : ''}`}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
        />
      ) : (
        <input
          id={`email-${name}`}
          className={`email-input ${hasError ? 'email-input--error' : ''}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      )}

      <div className={`email-error-msg ${hasError ? 'email-error-msg--visible' : ''}`}>
        {errors[name] || ' '}
      </div>
    </div>
  );
};

export default InputField;