import React, { Dispatch, Fragment, SetStateAction } from "react";
import MainButton from "../mainButton/MainButton";
import SelectionInput from "../selectionInput/SelectionInput";
import "./mainTable.scss";
import { Questions } from "../../interfaces";
import ChoiceInput from "../ChoiceInput/ChoiceInput";

// options
const typeOptions = [
  { label: "Essay", value: "essay" },
  { label: "Single Choice", value: "singleChoice" },
  { label: "Multi Choice", value: "multiChoice" },
];
const stageOptions = [
  { value: "opened", label: "Open" },
  { value: "closed", label: "Close" },
];

interface MainTableProps {
  questions: [Questions];
  setQuestions: Dispatch<SetStateAction<[Questions]>>;
  filter: string;
}

const MainTable: React.FC<MainTableProps> = ({
  questions,
  setQuestions,
  filter,
}) => {
  // Function to handle changes in question inputs
  const handleQuestionChange = (
    index: number,
    value: any,
    property: string
  ) => {
    setQuestions((prevQuestions: [Questions]) => {
      const updatedQuestions: [Questions] = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [property]: value,
      };
      return updatedQuestions;
    });
  };

  // function to remove question
  const handleRemoveQuestion = (i: number) => {
    setQuestions(questions.filter((_, index: number) => index !== i));
  };

  // function to add choice to quesion
  const handleAddChoice = (index: number) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question, i) => {
        if (i === index) {
          return {
            ...question,
            choices: [...question.choices, { value: "" }],
          };
        }
        return question;
      });
    });
  };

  // Function to handle changes in question choice inputs
  const handleChoiceChange = (
    questionIndex: number,
    choiceIndex: number,
    newValue: string
  ) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].choices[choiceIndex].value = newValue;
      return updatedQuestions;
    });
  };

  // Function to handle remove question choice
  const handleRemoveChoice = (questionIndex: number, choiceIndex: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
      return updatedQuestions;
    });
  };

  const handleMove = (currentIndex: number, direction: string) => {
    const newList: [Questions] = [...questions];
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < newList.length) {
      const currentItem = newList[currentIndex];
      newList[currentIndex] = newList[newIndex];
      newList[newIndex] = currentItem;
      setQuestions(newList);
    }
  };

  // handle filter questions
  const filteredData =
    filter == "allStages" || filter == ""
      ? questions
      : questions.filter((item) => item.stage == filter);

  return (
    <div className="main_table mb-10">
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Type</th>
            <th>Choices</th>
            <th>Stage</th>
            <th>Parent Question</th>
            <th>Attach File</th>
            <th>Delete</th>
            <th>Sort</th>
          </tr>
        </thead>
        <div className="mt-5"></div>
        <tbody>
          {filteredData.length > 0
            ? filteredData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        placeholder="write Your Question"
                        value={item?.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            e.target.value,
                            "question"
                          )
                        }
                      />
                    </td>
                    <td>
                      <SelectionInput
                        options={typeOptions}
                        value={typeOptions.find(
                          (ele) => ele.value == item.stage
                        )}
                        onChange={(value) => {
                          handleQuestionChange(index, value, "type");
                          if (value == "singleChoice") {
                            handleAddChoice(index);
                          }
                        }}
                      />
                    </td>
                    <td className="choices">
                      {item.type == "singleChoice" && (
                        <Fragment>
                          <div className="items">
                            {item.choices.length > 0 &&
                              item.choices?.map((select, choiceIndex) => {
                                return (
                                  <ChoiceInput
                                    key={choiceIndex}
                                    value={select.value}
                                    onChange={(newValue) =>
                                      handleChoiceChange(
                                        index,
                                        choiceIndex,
                                        newValue
                                      )
                                    }
                                    onRemove={() =>
                                      handleRemoveChoice(index, choiceIndex)
                                    }
                                  />
                                );
                              })}
                          </div>
                          <MainButton
                            text="Add Choice"
                            classes="bg-green-500 text-white"
                            onClick={() => handleAddChoice(index)}
                          />
                        </Fragment>
                      )}
                      {item.type == "multiChoice" && (
                        <Fragment>
                          <div className="items">
                            <div className="item">
                              <div className="input">
                                <input type="text" />
                              </div>
                              <button className="add">
                                <i className="fa-solid fa-plus text-blue-400 text-[20px]"></i>
                              </button>
                              <div className="remove">
                                <i className="fa-solid fa-trash text-red-600 text-[20px]"></i>
                              </div>
                            </div>
                          </div>
                          <MainButton
                            text="Add Choice"
                            classes="bg-green-500 text-white"
                          />
                        </Fragment>
                      )}
                    </td>
                    <td>
                      <SelectionInput
                        options={stageOptions}
                        value={stageOptions.find(
                          (ele) => ele.value == item.stage
                        )}
                        onChange={(value) =>
                          handleQuestionChange(index, value, "stage")
                        }
                      />
                    </td>
                    <td>
                      <span className="text-gray-400 text-[14px] ">
                        No Parent Question
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={item?.attachFile}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            e.target.checked,
                            "attachFile"
                          )
                        }
                      />
                    </td>
                    <td>
                      <MainButton
                        text="Delete Question"
                        classes="bg-red-500 text-white"
                        onClick={() => handleRemoveQuestion(index)}
                      />
                    </td>
                    <td>
                      <div className="sort">
                        <div
                          className={`up ${index === 0 ? "disabled" : ""}`}
                          onClick={() => handleMove(index, "up")}
                        >
                          <i className="fa-solid fa-chevron-up"></i>
                        </div>
                        <div
                          className={`down ${
                            index === filteredData.length - 1 ? "disabled" : ""
                          }`}
                          onClick={() => handleMove(index, "down")}
                        >
                          <i className="fa-solid fa-chevron-down"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MainTable);
