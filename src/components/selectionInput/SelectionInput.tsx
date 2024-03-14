import Select, { SingleValue } from "react-select";
import "./selectionInput.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectionInputProps {
  options: Option[];
  onChange: (value: string) => void;
  value?: Option;
}

const SelectionInput: React.FC<SelectionInputProps> = ({
  options,
  onChange,
  value,
}) => {
  const handleChange = (newValue: SingleValue<Option>) => {
    if (newValue) {
      onChange && onChange(newValue.value as string);
    }
  };
  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      className="selection_input"
    />
  );
};

export default SelectionInput;
