import { Button, Grid, Link, TextField } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useRef, useState } from "react";
import OtpInputField from "../../components/otpInputFields";
import { useARfittContext } from "../../context/storeContext";
import { Navigate, useNavigate } from "react-router-dom";

const ResetPassword: React.FC<{}> = ({}) => {
  //   const { email, setEmail } = useARfittContext();
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
      <ContentArea title="Reset Password">
        <Grid
          direction="column"
          className="w-[70%] h-[75%] flex justify-evenly items-center "
        >
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Please enter a new password below. For security reasons, ensure that
            your new password is not similar to your previous one
          </p>
          <InputField type="password" placeholder="Password" className="" />
          <InputField
            type="password"
            placeholder="Confirm Password"
            className=""
          />

          <Grid
            direction="row"
            className="flex items-center  w-[100%] h-[40%]  "
          >
            <Button
              className="bg-primary text-contrastText font-bold h-12"
              variant="contained"
              disableElevation={true}
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                // height: "30%",
              }}
              onClick={() => {
                navigate("/home");
              }}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default ResetPassword;
