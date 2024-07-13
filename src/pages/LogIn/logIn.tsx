import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import axios from "axios";
import {
  registerUserStart,
  setCurrentForm,
  setErrorMsg,
  setUserDetails,
} from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useDispatch } from "react-redux";
import GuestLoginCard from "../../components/guestLoginCard";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleErrorUpdate = (field: any) => (isError: boolean) => {
    setErrors({
      ...errors,
      [field]: isError,
    });
  };
  const hasErrors = Object.values(errors).some((error) => error !== false);
  function authenticateUser(): any {
    if (!(email && password)) {
      setError("Please fill in the required fields");
      return;
    }
    axios({
      // Endpoint
      url: `http://localhost:3001/user/login`,
      method: "POST",
      headers: {
        // Add any auth token here
        Authorization: "your token comes here",
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
        } else if (!res.data.message.isSubscribed) {
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));

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
  useEffect(() => {
    dispatch(setErrorMsg(null));
  }, []);
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
          className="w-[70%] h-full flex justify-center items-center"
        >
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Welcome Back!
          </p>
          <Grid className="flex h-[72px] justify-evenly w-full ">
            <InputField
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("email")}
            />
          </Grid>

          {/* password field without validation checks */}
          <Grid className="flex h-[72px] justify-evenly w-full ">
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className={`border-0 border-b border-[#646262] m-2 w-full text-xs font-Montserrat`}
              inputProps={{ color: "#00ff00" }}
              variant="standard"
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
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
            className="flex items-center justify-center w-[80%] mt-[3%] "
          >
            <Button
              disabled={hasErrors}
              className={`${
                hasErrors ? "bg-gray-500" : "bg-primary"
              } text-contrastText font-bold xs:w-[200px] md:w-[300px]`}
              disableElevation={true}
              variant="contained"
              style={{
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "50px",
              }}
              onClick={() => {
                authenticateUser();
              }}
            >
              Login
            </Button>
            <Button
              className="bg-white text-primary border-solid border-black border font-bold xs:w-[200px] md:w-[300px]"
              variant="contained"
              disableElevation={true}
              style={{
                fontFamily: "Montserrat",
                margin: "4px",
                borderRadius: "10px",
                height: "50px",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Continue As Guest
            </Button>
            <GuestLoginCard open={open} setOpen={setOpen} />

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
