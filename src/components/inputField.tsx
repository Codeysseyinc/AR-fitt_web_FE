import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import "./index.css";
import { SetStateAction, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../redux/signup/SignupActions";
interface InputField {
  placeholder: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  setValue?: Dispatch<SetStateAction<number | string | any>> | any;
}
const InputField: React.FC<InputField> = ({
  onChange,
  placeholder,
  type,
  className,
  setValue,
}) => {
  const [isDateInput, setIsDateInput] = useState(false);

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleNameChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
    if (setValue) {
      if (type === "date") {
        var today = new Date();
        const birthDate = new Date(e.target.value);
        if (today.getFullYear() - birthDate.getFullYear() >= 10) {
          setValue(e.target.value);
        } else {
          console.log(
            "error in dob",
            today.getFullYear() - birthDate.getFullYear()
          );
          setNameError(true);
          setError("Invalid Date of Birth entered");

          dispatch(setErrorMsg("Invalid Date of Birth entered"));

          return;
        }
      }
    }
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);

      if (placeholder.includes("Email"))
        setError("Should follow the correct email format");
      else setError("Wrong Entry");
    }
    console.log("nameError at end", nameError);
    if (nameError) dispatch(setErrorMsg(error));
    else dispatch(setErrorMsg(null));
  };
  useEffect(() => {
    dispatch(setErrorMsg(null));
  }, []);
  return (
    <>
      <TextField
        // error
        helperText={nameError ? error : ""}
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
