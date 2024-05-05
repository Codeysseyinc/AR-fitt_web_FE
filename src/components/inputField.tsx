import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import "./index.css";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
interface InputField {
  placeholder: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
const InputField: React.FC<InputField> = ({
  onChange,
  placeholder,
  type,
  className,
}) => {
  const [isDateInput, setIsDateInput] = useState(false);

  const [Error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleNameChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
      if (placeholder.includes("Email"))
        setError("Should follow the correct email format");
      else setError("Wrong Entry");
    }
  };
  return (
    <>
      <TextField
        // error
        helperText={nameError ? Error : ""}
        onChange={handleNameChange}
        error={nameError}
        required
        className={` ${className} border-0 border-b border-[#646262] m-2 w-full text-xs font-Montserrat`}
        variant="standard"
        type={showPassword ? "text" : type}
        onFocus={() =>
          placeholder === "Date of Birth" ? setIsDateInput(true) : ""
        }
        onBlur={() => setIsDateInput(false)}
        placeholder={placeholder}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* {type === "password" && (
        <InputAdornment position="start">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            // onMouseDown={handleMouseDownPassword}
            edge="start"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )} */}
    </>
  );
};

export default InputField;
