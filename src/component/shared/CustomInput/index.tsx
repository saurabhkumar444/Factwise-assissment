import React, { ChangeEvent } from "react";
import "./CustomInput.css";

type CustomInputProps = {
  type?: "text" | "number" | "password" | "email" | "url";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  type = "text",
  value = "",
  onChange = () => {},
  label,
  placeholder = "",
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (type === "number") {
      if (/^\d*\.?\d*$/.test(newValue)) {
        onChange(event);
      }
    } else {
      onChange(event);
    }
  };

  return (
    <div className="custom-input-container">
      <div className={`form-group`}>
        <div className="input-form-label">
          {label && <label htmlFor={label}>{label}</label>}
        </div>
        <input
          placeholder={placeholder}
          type={type === "number" ? "text" : type}
          className={`form-control`}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomInput;
