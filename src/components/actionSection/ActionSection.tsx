import React, { Dispatch, SetStateAction } from "react";
import MainButton from "../mainButton/MainButton";
import { Questions } from "../../interfaces";
import { generateUUID } from "../../utils/utilsFunctions";

interface ActionSectionProps {
  setQuestions: Dispatch<SetStateAction<Questions[]>>;
}

const ActionSection: React.FC<ActionSectionProps> = ({ setQuestions }) => {
  const addQuestion = () => {
    setQuestions((prev) => {
      return prev
        ? [
            ...prev,
            {
              id: generateUUID(),
              question: "",
              type: "",
              choices: [],
              stage: "",
              parentQuestion: {},
              attachFile: false,
            },
          ]
        : [
            {
              id: generateUUID(),
              question: "",
              type: "",
              choices: [],
              stage: "",
              parentQuestion: {},
              attachFile: false,
            },
          ];
    });
  };
  return (
    <div className="action_sction">
      <MainButton
        text="Add New Question"
        classes="bg-[#359ec7] text-black"
        onClick={addQuestion}
      />
      <div className="flex items-center justify-between">
        <div className="btns flex items-center gap-2 mt-3">
          <MainButton text="Save Changes" classes="bg-black text-white px-10" />
          <MainButton
            text="Cancel"
            classes="bg-white text-balck border border-black px-8"
          />
        </div>
        <div>
          <i className="fa-solid fa-receipt text-[gray] text-[35px]"></i>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActionSection);
