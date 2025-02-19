import React from "react";
import "../styles/input.scss";

interface InputComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ value, onChange }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Search for a stop..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
