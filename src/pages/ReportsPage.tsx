import { useState } from "react";
import ActionSection from "../components/actionSection/ActionSection";
import HeadTable from "../components/headTable/HeadTable";
import MainTable from "../components/mainTable/MainTable";
import { Questions } from "../interfaces";
import { generateUUID } from "../utils/utilsFunctions";

const ReportsPage = () => {
  const [questions, setQuestions] = useState<Questions[]>([
    {
      id: generateUUID(),
      question: "",
      type: "",
      choices: [],
      stage: "",
      parentQuestion: undefined,
      attachFile: false,
    },
  ]);
  const [filter, setFilter] = useState<string>("allStages");

  return (
    <div className="report_page">
      <div className="container mx-auto py-5">
        <HeadTable filter={filter} setFilter={setFilter} />
        <MainTable
          questions={questions}
          setQuestions={setQuestions}
          filter={filter}
        />
        <ActionSection setQuestions={setQuestions} />
      </div>
    </div>
  );
};

export default ReportsPage;
