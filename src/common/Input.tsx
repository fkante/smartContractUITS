import React from "react";

interface InputProps {
  id: string;
  inputStyle?: string;
  isDisabled?: boolean;
  isMultiligne?: boolean;
  isRequired?: boolean;
  label: string;
  max?: string;
  min?: string;
  onChange: (text: string) => any;
  placeholder: string;
  style?: string;
  step?: number;
  text: string | number;
  type: "email" | "date" | "number" | "password" | "text";
}

export default function Input({
  id,
  inputStyle,
  isDisabled = false,
  isMultiligne = false,
  isRequired = false,
  label,
  max,
  min,
  onChange,
  placeholder,
  style,
  step,
  text,
  type,
}: InputProps) {
  const finalInputStyle = `form-input appearance-none block w-full bg-grey-lighter border py-3 px-4 ${inputStyle}`;

  return (
    <div className={style}>
      <label
        className="block uppercase tracking-wide text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      {isMultiligne && (
        <textarea
          aria-label={label}
          className={`${finalInputStyle} resize-none`}
          disabled={isDisabled}
          id={id}
          name={id}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={isRequired}
          value={text}
        ></textarea>
      )}
      {!isMultiligne && (
        <input
          aria-label={label}
          className={finalInputStyle}
          disabled={isDisabled}
          id={id}
          max={max}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          name={id}
          placeholder={placeholder}
          required={isRequired}
          step={step}
          type={type}
          value={text}
        ></input>
      )}
    </div>
  );
}
