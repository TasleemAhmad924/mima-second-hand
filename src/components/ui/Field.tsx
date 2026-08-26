interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  type = "text",
  autoComplete,
  placeholder,
  multiline = false,
  rows = 5,
}: FieldProps) {
  const errorId = `${name}-error`;
  const controlClasses = `w-full border-b bg-transparent py-2.5 text-base text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-charcoal ${
    error ? "border-[#9a3b2e]" : "border-line-strong"
  }`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted"
      >
        {label}
        {required ? (
          <span className="text-taupe-ink" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${controlClasses} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          spellCheck={type === "email" ? false : undefined}
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={controlClasses}
        />
      )}

      {error ? (
        <p id={errorId} className="text-sm text-[#9a3b2e]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
