import { Button, Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import OtpInputField from "../../components/otpInputFields";
import { useARfittContext } from "../../context/storeContext";
import { useEffect } from "react";
import CONSTANTS from "../../utils/constants/CONSTANTS";

interface OtpVerificationProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  setCurrentForm,
}) => {
  const { email, setEmail } = useARfittContext();
  useEffect(() => {
    localStorage.setItem("currentForm", CONSTANTS.SIGN_UP_OTP_VERIFICATION);
  });
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
