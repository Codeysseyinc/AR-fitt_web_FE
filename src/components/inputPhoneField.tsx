import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const InputPhoneField: React.FC<{}> = ({}) => {
  return (
    <PhoneInput
      inputProps={{
        variant: "standard",
      }}
      country={"us"}
      value={""}
      onChange={() => {}}
    />
  );
};

export default InputPhoneField;
