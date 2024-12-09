import React, { ChangeEvent } from "react";
import "./CustomSelect.css";

type Option = {
  value: string | number;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  value?: string | number;
  label?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  onChange,
  className = "",
  value = "",
  label = "",
}) => {
  return (
    <div className="custom-select-container">
      {label && (
        <div className="select-form-label">
          <label htmlFor={label}>{label}</label>
        </div>
      )}
      <select
        className={`form-select-input ${className}`}
        value={value}
        onChange={onChange}
      >
        {options.map((data) => (
          <option key={data.value} value={data.value}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
