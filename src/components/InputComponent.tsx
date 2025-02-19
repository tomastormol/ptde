import React from "react";
import "../styles/input.scss";
import { FiSearch } from "react-icons/fi";

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
      <FiSearch className="search-icon" />
    </div>
  );
};

export default InputComponent;
