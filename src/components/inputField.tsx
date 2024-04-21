import { TextField } from "@mui/material";
import "./index.css";
import { useState } from "react";
interface InputField {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
const InputField: React.FC<InputField> = ({
  onChange,
  placeholder,
  className,
}) => {
  const [isDateInput, setIsDateInput] = useState(false);
  return (
    <TextField
      className={` ${className} border-0 border-b border-[#646262] m-2 w-full text-xs font-Montserrat`}
      variant="standard"
      type={isDateInput ? "date" : "text"}
      onFocus={() =>
        placeholder === "Date of Birth" ? setIsDateInput(true) : ""
      }
      onBlur={() => setIsDateInput(false)}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputField;
