import { Grid, IconButton } from "@mui/material";
import "./index.css";
import React, { ReactNode } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CONSTANTS from "../utils/constants";
import { useNavigate } from "react-router-dom";
interface ContentArea {
  children: ReactNode; // Explicitly define children as ReactNode type
  title?: string;
  removeLogo?: boolean;
  setCurrentForm?: React.Dispatch<React.SetStateAction<string>>;
}

const ContentArea: React.FC<ContentArea> = ({
  children,
  title,
  removeLogo,
  setCurrentForm,
}) => {
  const navigate = useNavigate();
  function getPreviousForm(title?: string, setCurrentForm?: any) {
    if (title === "OTP Verification") {
      setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO);
    } else if (title === "Subscription Plans") {
      setCurrentForm(CONSTANTS.SIGN_UP_OTP_VERIFICATION);
    } else if (title === "Scanning") {
      setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION);
    } //basic Info page
    else {
      navigate(-1);
    }
  }
  return (
    <Grid
      item
      direction="column"
      className=" bg-white rounded-tl-[40px] w-[65%] absolute left-[35%] h-screen flex items-center"
    >
      {/* logo and back button */}
      <Grid direction="row" className=" w-[100%] h-[17%] flex justify-start">
        <div className=" w-[50%] h-[100%] flex justify-start ">
          <ArrowBackRoundedIcon
            onClick={() => {
              console.log("clicked");
              getPreviousForm(title, setCurrentForm);
            }}
            sx={{ color: "white" }}
            className="self-center bg-primary rounded-[50%] scale-150 ml-8 mt-6"
          />
        </div>
        <div className=" w-[50%] h-[100%] flex justify-end ">
          <img
            className="self-end flex justify-end mr-6 h-[75%]"
            style={{ display: `${removeLogo ? "none" : "block"}` }}
            src="./assets/images/logo.png"
          />
        </div>
      </Grid>
      <Grid className="font-Montserrat font-bold text-3xl text-[#408589] flex justify-center ">
        {title}
      </Grid>
      {children}
    </Grid>
  );
};

export default ContentArea;
