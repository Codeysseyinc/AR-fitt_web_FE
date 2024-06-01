import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Grid, Link } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import axios from "axios";
import {
  registerUserStart,
  setCurrentForm,
  setUserDetails,
} from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useDispatch } from "react-redux";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function authenticateUser(): any {
    if (!(email && password)) {
      setError("Please fill in the required fields");
      return;
    }
    const resp = axios({
      // Endpoint
      url: `http://localhost:3001/user/login`,
      method: "POST",
      headers: {
        // Add any auth token here
        authorization: "your token comes here",
        "Content-Type": "application/json",
      },

      data: {
        email: email,
        password: password,
      },
    })
      // Handle the response from backend here
      .then((res) => {
        dispatch(registerUserStart());
        dispatch(setUserDetails(res.data.message));

        const token = res.headers.access_token; // Adjust the key based on your API response

        if (token) {
          localStorage.setItem("access_token", token);
        }
        if (!res.data.message.isVerified) {
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_OTP_VERIFICATION));

          navigate("/signup");
        } else {
          navigate("/home");
        }
      })

      // Catch errors if any
      .catch((err: any) => {
        console.log("auth error", err);
        setError(err?.response.data.message);
      });
  }
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
        {error && (
          <Alert severity="error" className="absolute">
            {error}{" "}
          </Alert>
        )}
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
          <InputField
            type="password"
            placeholder="Password"
            className="mt-6"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
                authenticateUser();
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
