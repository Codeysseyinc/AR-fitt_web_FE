import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Link } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [_, setEmail] = useState("");

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
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputField type="password" placeholder="Password" className="mt-6" />
          <div
            className="font-Montserrat font-medium text-xs leading-40 text-primary self-end mt-6 cursor-pointer"
            onClick={() => {
              navigate("/forgotPassword");
            }}
          >
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
              onClick={() => {
                navigate("/home");
              }}
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
