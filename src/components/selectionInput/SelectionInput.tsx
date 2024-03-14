import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import "./selectionInput.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectionInputProps {
  options: Option[];
  onChange?: Dispatch<SetStateAction<string>>;
  value: Option;
}

const SelectionInput: React.FC<SelectionInputProps> = ({
  options,
  onChange,
  value,
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={(newValue) => onChange(newValue?.value)}
      className="selection_input"
    />
  );
};

export default SelectionInput;
