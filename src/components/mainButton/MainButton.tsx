import React from "react";

interface MainButtonProps {
  text: string;
  classes: string;
  onClick?: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({ text, classes, onClick }) => {
  return (
    <button
      className={`py-[6px] px-[12px] text-[15px] rounded ${classes}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MainButton;
