import { Button, Grid, Link, TextField } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import CONSTANTS from "../../utils/constants";
import { useState } from "react";
import { useARfittContext } from "../../context/storeContext";
import InputPhoneField from "../../components/inputPhoneField";

interface BasicInfoProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}

const BasicInformation: React.FC<BasicInfoProps> = ({ setCurrentForm }) => {
  const { email, setEmail } = useARfittContext();

  return (
    // page
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/basicInfoBg.png"
        modelsSrc="/assets/images/signUp/basicInfoModels.png"
      />
      {/* content section */}
      <ContentArea title="Create Account" setCurrentForm={setCurrentForm}>
        <Grid direction="column" className="w-[70%] flex justify-center">
          <Grid
            direction="row"
            className="flex items-center justify-evenly w-full"
          >
            <InputField placeholder="First Name" />
            <InputField placeholder="Last Name" />
          </Grid>
          <Grid className="flex items-center justify-evenly w-full">
            <InputField
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid className="flex items-center justify-evenly w-full">
            <InputField placeholder="Password" />
            <InputField placeholder="Confirm Password" />
          </Grid>
          <Grid className="flex items-center justify-evenly w-full">
            <InputPhoneField />
          </Grid>
          <Grid className="flex items-center justify-evenly w-full">
            <InputField placeholder="Date of Birth" />
            <InputField placeholder="Gender" />
          </Grid>
          <Grid className="flex items-center justify-evenly w-full mt-[4%]">
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
                setCurrentForm(CONSTANTS.SIGN_UP_OTP_VERIFICATION);
              }}
            >
              Sign Up
            </Button>{" "}
          </Grid>
          <Grid className="Montserrat-text text-xs flex justify-start w-full m-4">
            Have an account ?&nbsp;
            <Link href="/login" className="text-link font-bold">
              {" "}
              Sign In
            </Link>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};

export default BasicInformation;
