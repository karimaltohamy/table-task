import React from "react";

interface ChoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const ChoiceInput: React.FC<ChoiceInputProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="item">
      <div className="input">
        <input type="text" value={value} onChange={handleInputChange} />
      </div>
      <button className="remove cursor-pointer" onClick={onRemove}>
        <i className="fa-solid fa-trash text-red-600 text-[20px]"></i>
      </button>
    </div>
  );
};

export default ChoiceInput;
