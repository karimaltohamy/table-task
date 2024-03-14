import React, { Dispatch, SetStateAction } from "react";
import SelectionInput from "../selectionInput/SelectionInput";

interface Option {
  value: string;
  label: string;
}

interface HeadTableProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const HeadTable: React.FC<HeadTableProps> = ({ setFilter, filter }) => {
  const optionsSelect: Option[] = [
    { value: "allStages", label: "All Stages" },
    { value: "opened", label: "Opened" },
    { value: "closed", label: "Closed" },
  ];

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Report Name:follow</h4>
        </div>
        <div>
          <h4 className="font-semibold">All Stages</h4>
        </div>
        <div>
          <SelectionInput
            value={optionsSelect.find((ele) => ele.value === filter)}
            options={optionsSelect}
            onChange={(value: string) => handleFilterChange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeadTable);
