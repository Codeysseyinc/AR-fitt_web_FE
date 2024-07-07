/* eslint-disable jsx-a11y/alt-text */
import { Alert, Grid } from "@mui/material";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { setCurrentForm } from "../redux/signup/SignupActions";
import "./index.css";

interface ContentAreaProps {
  children: ReactNode;
  title?: string;
  removeLogo?: boolean;
  className?: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  title,
  removeLogo,
  className,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: any) => state.signup.errorMessage);

  const getPreviousForm = (title?: string, setCurrentForm?: any) => {
    if (title === "Scanning") {
      navigate("/");
    } else navigate(-1);
  };
  return (
    <Grid
      item
      direction="column"
      className={`${className} bg-white sm:rounded-tl-[40px] xs:w-[100%] sm:w-[65%] sm:absolute left-[35%] h-screen flex items-center `}
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
            src="/assets/images/logo.png"
          />
        </div>
      </Grid>
      <Grid className="font-Montserrat font-bold xs:text-2xl md:text-3xl text-primary flex justify-center ">
        {title}
      </Grid>
      {error && (
        <Alert severity="error" className="absolute">
          {error}{" "}
        </Alert>
      )}
      {children}
    </Grid>
  );
};

export default ContentArea;
