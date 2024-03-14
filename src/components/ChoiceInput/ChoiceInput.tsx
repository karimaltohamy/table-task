import React, { useState } from "react";

interface ChoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  nested?: boolean;
  showAddNesteedQuestion?: boolean;
  onAddNestedQuestion?: () => void;
}

const ChoiceInput: React.FC<ChoiceInputProps> = ({
  value,
  onChange,
  onRemove,
  nested,
  showAddNesteedQuestion,
  onAddNestedQuestion,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const hanldeAddNestedQuestion = () => {
    onAddNestedQuestion && onAddNestedQuestion();
  };

  return (
    <div className="item">
      <div className="input">
        <input type="text" value={value} onChange={handleInputChange} />
      </div>
      {showAddNesteedQuestion && !nested && (
        <button className="add" onClick={hanldeAddNestedQuestion}>
          <i className="fa-solid fa-plus text-blue-400 text-[20px]"></i>
        </button>
      )}
      {nested && (
        <button className="add disabled" disabled>
          <i className="fa-solid fa-plus text-blue-100 text-[20px]"></i>
        </button>
      )}
      <button className="remove cursor-pointer" onClick={onRemove}>
        <i className="fa-solid fa-trash text-red-600 text-[20px]"></i>
      </button>
    </div>
  );
};

export default React.memo(ChoiceInput);
