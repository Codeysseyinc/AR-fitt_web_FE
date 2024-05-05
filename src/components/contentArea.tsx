/* eslint-disable jsx-a11y/alt-text */
import { Grid } from "@mui/material";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { setCurrentForm } from '../redux/signup/SignupActions';
import CONSTANTS from "../utils/constants/CONSTANTS";
import "./index.css";

interface ContentAreaProps {
  children: ReactNode;
  title?: string;
  removeLogo?: boolean;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  title,
  removeLogo,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPreviousForm = (title?: string, setCurrentForm?: any) => {
    if (title === "OTP Verification") {
      dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
    } else if (title === "Subscription Plans") {
      dispatch(setCurrentForm(CONSTANTS.SIGN_UP_OTP_VERIFICATION));
    } else if (title === "Scanning") {
      dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
    } else navigate(-1);
  }
  return (
    <Grid
      item
      direction="column"
      className=" bg-white rounded-tl-[40px] w-[65%] absolute left-[35%] h-screen flex items-center"
    >
      {/* logo and back button */}
      <Grid direction="row" className=" w-[100%] h-[17%] flex justify-start">
        <div className=" w-[50%] h-[100%] flex justify-start">
          <ArrowBackRoundedIcon
            onClick={() => {
              getPreviousForm(title, setCurrentForm);
            }}
            sx={{ color: "white" }}
            className="self-center bg-primary rounded-[50%] scale-150 ml-8 mt-6 cursor-pointer"
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
