import { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "../styles/signupStyles";

interface InputFieldProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  setValue?: Dispatch<SetStateAction<number | string | any>> | any;
  onErrorUpdate: (isError: boolean) => void;
}
const DateOfBirthPicker: React.FC<InputFieldProps> = ({
  onChange,
  className,
  setValue,
  onErrorUpdate,
}) => {
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const handleNameChange = (e: any) => {
    var today = new Date();
    const birthDate = new Date(e);
    if (today.getFullYear() - birthDate.getFullYear() >= 10) {
      setValue(dayjs(birthDate).format("YYYY-MM-DD"));
      setNameError(false);
      onErrorUpdate(false);
    } else {
      setNameError(true);
      setError("Invalid Date of Birth entered");
      onErrorUpdate(true);
      return;
    }
  };

  useEffect(() => {
    onErrorUpdate(false);
  }, [onErrorUpdate]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={selectedDate}
          onChange={(e) => {
            handleNameChange(e);
            setSelectedDate(e);
          }}
          className={` ${className} border-0 border-b border-[#646262] m-2 w-full text-xs font-Montserrat`}
          slotProps={{
            textField: {
              variant: "standard",
              error: nameError,
              helperText: nameError && error,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateOfBirthPicker;
