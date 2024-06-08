import { Alert, Button, Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import { useARfittContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/signup/SignupActions";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, setEmail } = useARfittContext();
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  function resetPasswordClicked(): any {
    if (!email) {
      setError("Please fill in the required fields");
      return;
    }
    dispatch(
      setUserDetails({
        email: email,
      })
    );

    const resp = axios({
      // Endpoint
      url: `http://localhost:3001/user/forgetPassword?email=${email}`,
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        console.log("reset sent", res);
        setEmailSent(true);
      })

      // Catch errors if any
      .catch((err: any) => {
        setError(err?.response.data);
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
            className="flex items-center justify-center w-[100%] h-[50%]  "
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
              onClick={() => {
                resetPasswordClicked();

                // navigate("/resetPassword");
              }}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
        <Alert
          className={`${
            !emailSent ? "hidden" : ""
          } w-[80%] font-Montserrat font-normal text-sm leading-6 text-center text-black absolute bottom-0`}
          icon={<CheckCircleIcon fontSize="inherit" />}
          severity="success"
        >
          We've just sent you an email. Please check your inbox to continue
          resetting your password.
        </Alert>
      </ContentArea>
    </Grid>
  );
};
export default ForgotPassword;
