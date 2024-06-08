import { Grid, Link, TextField } from "@mui/material";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  verifyEmailFailure,
  verifyEmailSuccess,
  setErrorMsg,
  setCurrentForm,
} from "../redux/signup/SignupActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../utils/constants/CONSTANTS";

const OtpInputField: React.FC = () => {
  const secondsCountDown = 60 * 3; // time in seconds
  const numberOfDigits = 5;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState("");
  const otpBoxReference = useRef<any>([]);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(secondsCountDown);
  const [triggerCountDown, setTriggerCountDown] = useState<boolean>(false);
  let countdownInterval: string | number | NodeJS.Timer | undefined;

  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const email = userDetails.email;
  const dispatch = useDispatch();
  function handleChange(value: any, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
  }

  function handleBackspaceAndEnter(e: any, index: number) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    } else if (e.key === "Backspace" && !e.target.value && index === 0) {
      otpBoxReference.current[index].focus();
    } else if (index < numberOfDigits - 1 && e.target.value) {
      otpBoxReference.current[index + 1].focus();
    } else if (index < numberOfDigits - 1 && !e.target.value) {
      handleChange(e.key, index);
      otpBoxReference.current[index + 1].focus();
    }
    return;
  }
  function sendOTP(): any {
    const resp = axios({
      // Endpoint
      url: `http://localhost:3001/user/requestOTP?email=${email}`,
      method: "GET",
      headers: {
        // Add any auth token here
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      // Handle the response from backend here
      .then((res) => {
        console.log("email sent");
      })

      // Catch errors if any
      .catch((err: any) => {
        console.log("auth error", err?.response.data.message);
        if (err?.response.data.message === "Unauthorized access") {
          navigate("/");
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
        }
        // dispatch(setErrorMsg(err?.response.data.message));
      });
  }

  function verifyOTP(otp: string): any {
    const resp = axios({
      // Endpoint
      url: `http://localhost:3001/user/verifyOTP`,
      method: "POST",
      headers: {
        // Add any auth token here
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        email: email,
        otp: otp,
      },
    })
      // Handle the response from backend here
      .then((res) => {
        console.log("otp verfied", otp);
        dispatch(verifyEmailSuccess());
        setOtpError("Correct OTP");
      })

      // Catch errors if any
      .catch((err: any) => {
        console.log("otp not verified ", otp, err);
        dispatch(verifyEmailFailure("You have entered an incorrect OTP"));
        setOtpError("You have entered an incorrect OTP");
        dispatch(setErrorMsg(err?.response.data.message));
      });
  }
  const handleResend = () => {
    setCountdown(secondsCountDown);
    setTriggerCountDown(true);
    sendOTP();
  };
  useEffect(() => {
    setTriggerCountDown(true);
    if (triggerCountDown && countdown > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown < 0 && triggerCountDown) {
      handleResend();
      setTriggerCountDown(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, triggerCountDown]);

  useEffect(() => {
    if (otp.join("").length === numberOfDigits) {
      verifyOTP(otp.join(""));
    } else {
      setOtpError("");
    }
    // verifyOTP(otp.join(""))
  }, [otp]);

  const isMounted = useRef(false);
  useEffect(() => {
    // Skip the effect on the initial render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setTimeout(() => {
      setTriggerCountDown(true);
      sendOTP();
    }, 2000);
  }, []);
  return (
    <>
      <Grid
        direction="row"
        className="flex items-center justify-center gap-4 h-[7%] m-4"
      >
        {/* Boxes for digits */}
        {otp.map((digit: any, index: number) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`${
              otpError === "You have entered an incorrect OTP"
                ? "bg-red-500"
                : "bg-primary"
            } ${
              otpError === "You have entered an incorrect OTP"
                ? "focus:bg-red-600 "
                : "focus:bg-teal-500 "
            }  w-[5%] h-[80%] text-black p-3 rounded-md block bg-opacity-25 border-none font-Montserrat text-center items-center focus:outline-none appearance-none`}
          />
        ))}
      </Grid>
      {/* Resend OTP */}
      <Grid className="Montserrat-text text-xs flex justify-between w-full m-4">
        <div>
          Didn’t Receive the OTP yet?{" "}
          <Link
            href="#"
            className={`${
              countdown === 0 ? "text-link" : "text-gray-500"
            }  font-bold cursor-pointer`}
            onClick={() => {
              if (countdown === 0) handleResend();
            }}
          >
            Resend
          </Link>
        </div>
        {/* &nbsp;&nbsp; */}
        <div className="self-end text-red-500">
          Time Remaining:&nbsp; {countdown} seconds
        </div>
      </Grid>
      {/* Error on wrong OTP */}
      <p
        className={`font-Montserrat text-xs ${
          otpError === "You have entered an incorrect OTP"
            ? "text-red-500"
            : "text-green-500"
        } ${otpError ? "error-show" : ""}`}
      >
        {otpError}
      </p>
    </>
  );
};
export default OtpInputField;
