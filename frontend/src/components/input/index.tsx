import { h } from "preact";
import "./style.scss";

type InputProps = {
  type?: "text" | "textarea" | "email" | "password" | "file";
  label: string;
  name: string;
  accept?: string;
  value?: string;
  ref?: any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: any) => void;
};

export default function Input({
  type = "text",
  label,
  name,
  accept,
  value,
  ref,
  placeholder,
  disabled = false,
  required = true,
  onChange,
}: InputProps) {
  // Add all classs to an array
  const addAllClasses: string[] = ["field-wrapper"];

  // Add disabled class
  if (disabled) addAllClasses.push("disabled");

  // Make Label value to htmlFor
  const htmlFor = label.replace(/\s+/g, "_").toLowerCase();

  // Init variable for Label For and Input element
  let inputElement;

  // Set Input element based on type prop
  if (type === "textarea") {
    inputElement = (
      <div className="inner-wrap">
        <textarea
          id={htmlFor}
          name={name}
          aria-label={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
        />
      </div>
    );
  } else {
    inputElement = (
      <div className="inner-wrap">
        <input
          id={htmlFor}
          type={type}
          name={name}
          accept={accept}
          aria-label={name}
          value={value}
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          autocomplete="off"
        />
      </div>
    );
  }

  return (
    <div className={addAllClasses.join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>
      {inputElement}
    </div>
  );
}
