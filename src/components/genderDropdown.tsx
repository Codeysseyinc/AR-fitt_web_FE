import { Grid } from "@mui/material";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch } from "redux";
interface GenderDropDownFieldProps {
  setGender: Dispatch<React.SetStateAction<string | any>> | any;
}
const GenderDropDown = ({ setGender }: GenderDropDownFieldProps) => {
  // const [gender, setGender] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="gender-label"
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => (selected ? selected : "Gender")}
          sx={{
            color: "rgb(148 148 148)",
          }}
        >
          <MenuItem value="" disabled>
            Gender
          </MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default GenderDropDown;
