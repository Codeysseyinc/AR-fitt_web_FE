import { Button, Grid, Link, TextField } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import ReactPhoneInput from "react-phone-input-material-ui";
import CONSTANTS from "../../utils/constants";
import { useRef, useState } from "react";
import OtpInputField from "../../components/otpInputFields";
import { useARfittContext } from "../../context/storeContext";

interface OtpVerificationProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  setCurrentForm,
}) => {
  const { email, setEmail } = useARfittContext();

  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/otpVerificationBg.png"
        modelsSrc="/assets/images/signUp/otpVerificationModels.png"
      />
      {/* Content Area */}
      <ContentArea title="OTP Verification" setCurrentForm={setCurrentForm}>
        <Grid direction="column" className="w-[70%] flex justify-center">
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Please enter the One-Time Password to verify your account <br /> A
            One-Time Password has been sent to {email}
          </p>
          {/* OTP Input */}
          <OtpInputField />
          <Grid className="flex items-center justify-evenly w-full mt-[4%]">
            {/* Verify Button */}
            <Button
              className="bg-primary text-contrastText drop-shadow-lg"
              variant="contained"
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "15px",
                height: "70%",
              }}
              onClick={() => {
                setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION);
              }}
            >
              Verify
            </Button>{" "}
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default OtpVerification;
