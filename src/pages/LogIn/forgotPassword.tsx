import { Button, Grid, Link, TextField } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import CONSTANTS from "../../utils/constants";
import { useRef, useState } from "react";
import OtpInputField from "../../components/otpInputFields";
import { useARfittContext } from "../../context/storeContext";
import { Navigate, useNavigate } from "react-router-dom";

const ForgotPassword: React.FC<{}> = ({}) => {
  const { email, setEmail } = useARfittContext();
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/logIn/logInBg.png"
        modelsSrc="/assets/images/logIn/logInModels.png"
      />
      <ContentArea title="Forgot Password ?">
        <Grid
          direction="column"
          className="w-[70%] h-[75%] flex justify-center items-center "
        >
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Don't worry, we'll send you instructions to reset your password via
            email. Please enter your email address below to proceed.
          </p>
          <InputField
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Grid
            direction="row"
            className="flex items-center justify-center w-[100%] h-[50%]  bg-red-500 "
          >
            <Button
              className="bg-primary text-contrastText font-bold"
              disableElevation={true}
              variant="contained"
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "30%",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Back to Login
            </Button>
            <Button
              className="bg-white text-primary border-solid border-black border h-[80%] font-bold"
              variant="contained"
              disableElevation={true}
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "30%",
              }}
              onClick={() => {}}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default ForgotPassword;
