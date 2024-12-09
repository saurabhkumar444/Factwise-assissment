import React, { ChangeEvent } from "react";
import "./CustomTextArea.css";

type CustomTextAreaProps = {
  value?: string,
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>, value: string) => void,
  label?: string,
  rows?: number,
};

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  value = "",
  onChange = () => {},
  label,
  rows = 4,
}) => {
  return (
    <div className="custom-text-area-container">
      <div className="form-group">
        {label && (
          <div className="text-area-form-label">
            <label htmlFor={label}>{label}</label>
          </div>
        )}
        <textarea
          className="form-control rounded-2"
          rows={rows}
          value={value}
          onChange={(e) => {
            onChange(e, e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default CustomTextArea;
