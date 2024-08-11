import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  Grid,
} from "@mui/material";
import InputField from "./inputField";
import GenderDropDown from "./genderDropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCurrentForm,
  setErrorMsg,
  setGuestDetails,
} from "../redux/signup/SignupActions";
import { useMutation } from "react-query";
import signupService from "../services/signup.service";
import HTTPService from "../services/base.service";

interface GuestLoginCardFieldProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const GuestLoginCard = ({ open, setOpen }: GuestLoginCardFieldProps) => {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const [errors, setErrors] = useState({
    dateOfBirth: false,
  });
  const handleErrorUpdate = (field: any) => (isError: boolean) => {
    setErrors({
      ...errors,
      [field]: isError,
    });
  };
  const { mutate: guestSignup } = useMutation(
    async () => signupService.guestSignup({ gender: gender, dob: dob }),
    {
      onSuccess: (res) => {
        if (gender && dob) {
          dispatch(
            setGuestDetails({
              id: res.data.message.id,
              dob: res.data.message.dob,
              gender: res.data.message.gender,
              isFaceScanned: res.data.message.isFaceScanned,
              isBodyScanned: res.data.message.isBodyScanned,
            })
          );
          const token = res.headers.access_token;
          if (token) {
            localStorage.setItem("access_token", token);
            HTTPService.setToken(token);
          }
          navigate("/home");
        }
      },
      onError: (err: any) => {
        dispatch(setErrorMsg(err?.response.data.message));
      },
    }
  );
  return (
    <Dialog
      open={open}
      PaperProps={{
        className:
          "bg-[#F3F3F3] flex flex-col xs:pb-[30px] md:pb-[36px]  h-[450px] ",
      }}
    >
      {" "}
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleClose();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </DialogActions>
      <DialogContentText
        id="alert-dialog-description"
        className="flex flex-col items-center justify-center"
      >
        <h1 className="font-Montserrat font-bold text-3xl text-[#408589] flex justify-center ">
          Guest Login
        </h1>

        {/* DOB & Gender*/}
        <Grid className="flex flex-col items-center justify-center w-3/4 mt-2 space-y-8">
          <p className="font-Montserrat text-sm flex justify-center text-center">
            We will require your gender and date of birth for you to continue as
            guest
          </p>
          <GenderDropDown className="w-[100%]" setGender={setGender} />

          <InputField
            type="date"
            placeholder="Date of Birth"
            setValue={setDob}
            onErrorUpdate={handleErrorUpdate("dateOfBirth")}
          />
          {/* Guest Button */}
          <Button
            className="bg-white text-primary border-solid border-black border h-[80%] font-bold"
            variant="contained"
            disableElevation={true}
            style={{
              width: "100%",
              fontFamily: "Montserrat",

              borderRadius: "10px",
              height: "60px",
            }}
            onClick={() => {
              guestSignup();
            }}
          >
            Continue As Guest
          </Button>
        </Grid>
      </DialogContentText>
    </Dialog>
  );
};
export default GuestLoginCard;
