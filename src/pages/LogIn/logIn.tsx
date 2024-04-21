import { Button, Grid, Link, TextField } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import CONSTANTS from "../../utils/constants";
import { useRef, useState } from "react";
import OtpInputField from "../../components/otpInputFields";
import { useARfittContext } from "../../context/storeContext";

const LogIn: React.FC<{}> = ({}) => {
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
        backgroundSrc="/assets/images/logIn/logInBg.png"
        modelsSrc="/assets/images/logIn/logInModels.png"
      />
      <ContentArea title="Let's sign you in.">
        <Grid
          direction="column"
          className="w-[70%] h-[75%] flex justify-center items-center "
        >
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Welcome Back!
          </p>
          <InputField
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputField placeholder="Password" className="mt-6" />
          <div className="font-Montserrat font-medium text-xs leading-40 text-primary self-end mt-6">
            Forgot Password?
          </div>
          <Grid
            direction="column"
            className="flex items-center justify-center w-[80%] h-[50%] mt-[3%] "
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
                height: "75%",
              }}
              onClick={() => {}}
            >
              Login
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
                height: "75%",
              }}
              onClick={() => {}}
            >
              Continue As Guest
            </Button>
            <Grid className="Montserrat-text text-xs flex justify-center w-full m-4">
              Don't have an account ?&nbsp;
              <Link href="/signup" className="text-link font-bold">
                {" "}
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default LogIn;
