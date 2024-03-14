import React, { Dispatch, Fragment, SetStateAction } from "react";
import MainButton from "../mainButton/MainButton";
import SelectionInput from "../selectionInput/SelectionInput";
import "./mainTable.scss";
import { Questions } from "../../interfaces";
import ChoiceInput from "../ChoiceInput/ChoiceInput";
import { generateUUID } from "../../utils/utilsFunctions";

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
  questions: Questions[];
  setQuestions: Dispatch<SetStateAction<Questions[]>>;
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
    setQuestions((prevQuestions: Questions[]) => {
      const updatedQuestions: Questions[] = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [property]: value,
      };

      const nestedQuestions = updatedQuestions.filter(
        (item) =>
          item.parentQuestion &&
          item.parentQuestion.parentId == updatedQuestions[index].id
      );

      if (nestedQuestions.length > 0 && property === "question") {
        nestedQuestions.forEach((nestedQuestion) => {
          nestedQuestion.parentQuestion !== undefined &&
            (nestedQuestion.parentQuestion.parentQuestion = value);
        });
      }

      return updatedQuestions;
    });
  };

  // function to remove question
  const handleRemoveQuestion = (i: number, question: Questions) => {
    let updatedQuestions = [...questions];
    const parentChoiceId =
      question.parentQuestion && question.parentQuestion.parentChoiceId;

    updatedQuestions = updatedQuestions.map((item) => {
      if (item.choices.some((ele) => ele.id === parentChoiceId)) {
        return {
          ...item,
          choices: item.choices.map((ele) =>
            ele.id === parentChoiceId ? { ...ele, nested: false } : ele
          ),
        };
      } else {
        return item;
      }
    });

    updatedQuestions.splice(i, 1);

    setQuestions(updatedQuestions);
  };

  // function to add choice to quesion
  const handleAddChoice = (index: number) => {
    setQuestions((prevQuestions: Questions[]) => {
      return prevQuestions.map((question, i) => {
        if (i === index) {
          const updatedChoices = [
            ...question.choices,
            { id: generateUUID(), value: "", nested: false },
          ];
          return {
            ...question,
            choices: updatedChoices,
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

      const nestedQuestionIndex = updatedQuestions.findIndex(
        (item) =>
          item.parentQuestion &&
          item.parentQuestion.parentChoiceId ==
            updatedQuestions[questionIndex].choices[choiceIndex].id
      );

      if (
        nestedQuestionIndex !== -1 &&
        updatedQuestions[nestedQuestionIndex]!.parentQuestion !== undefined
      ) {
        updatedQuestions[nestedQuestionIndex]!.parentQuestion!.parentChoice =
          newValue;
      }

      return updatedQuestions;
    });
  };

  // Function to handle remove question choice
  const handleRemoveChoice = (questionIndex: number, choiceIndex: number) => {
    setQuestions((prevQuestions) => {
      let updatedQuestions = [...prevQuestions];

      const questionsWithoutNestedQuestion = updatedQuestions.filter(
        (question) => {
          return !(
            question.parentQuestion &&
            question.parentQuestion.parentChoiceId ===
              updatedQuestions[questionIndex].choices[choiceIndex].id
          );
        }
      );

      console.log(questionsWithoutNestedQuestion);

      return questionsWithoutNestedQuestion.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        const updatedChoices = question.choices.filter(
          (_, idx) => idx !== choiceIndex
        );

        return {
          ...question,
          choices: updatedChoices,
        };
      });
    });
  };

  const addNestedQuestion = (
    currentQuestion: Questions,
    valueChoice: string,
    idChoice: string
  ) => {
    const updatedChoices = currentQuestion.choices.map((choice) =>
      choice.id === idChoice ? { ...choice, nested: true } : choice
    );

    const newQuestion: Questions = {
      id: generateUUID(),
      question: "",
      type: "",
      choices: [],
      stage: "",
      parentQuestion: {
        parentId: currentQuestion.id,
        parentQuestion: currentQuestion.question,
        parentChoice: valueChoice,
        parentChoiceId: idChoice,
      },
      attachFile: false,
    };

    const updatedCurrentQuestion: Questions = {
      ...currentQuestion,
      choices: updatedChoices,
    };

    const currentIndex = questions.findIndex(
      (question) => question.id === currentQuestion.id
    );

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = updatedCurrentQuestion;

    updatedQuestions.push(newQuestion);

    setQuestions(updatedQuestions);
  };

  const handleMove = (currentIndex: number, direction: string) => {
    const newList: Questions[] = [...questions];
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
                  <tr
                    key={index}
                    className={`${
                      Object.keys(
                        item.parentQuestion !== undefined && item.parentQuestion
                      ).length > 0
                        ? " bg-sky-100"
                        : ""
                    }`}
                  >
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
                          if (
                            value == "singleChoice" ||
                            value == "multiChoice"
                          ) {
                            handleAddChoice(index);
                          }
                        }}
                      />
                    </td>
                    <td className="choices">
                      {item.type == "multiChoice" && (
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
                      {item.type == "singleChoice" &&
                        Object.keys(
                          item.parentQuestion !== undefined &&
                            item.parentQuestion
                        ).length == 0 && (
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
                                      nested={select.nested}
                                      showAddNesteedQuestion={true}
                                      onAddNestedQuestion={() =>
                                        addNestedQuestion(
                                          item,
                                          select.value,
                                          select.id
                                        )
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
                    <td className="parent">
                      {Object.keys(
                        item.parentQuestion !== undefined && item.parentQuestion
                      ).length > 0 ? (
                        <div>
                          <h4 className=" font-medium">
                            Parent Question:{" "}
                            {item.parentQuestion !== undefined &&
                              item.parentQuestion.parentQuestion}
                          </h4>
                          <h4 className=" font-medium">
                            Parent Choice: {item.parentQuestion?.parentChoice}
                          </h4>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[14px] ">
                          No Parent Question
                        </span>
                      )}
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
                        onClick={() => handleRemoveQuestion(index, item)}
                      />
                    </td>
                    {Object.keys(
                      item.parentQuestion !== undefined && item.parentQuestion
                    ).length == 0 ? (
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
                              index === filteredData.length - 1
                                ? "disabled"
                                : ""
                            }`}
                            onClick={() => handleMove(index, "down")}
                          >
                            <i className="fa-solid fa-chevron-down"></i>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <td></td>
                    )}
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
