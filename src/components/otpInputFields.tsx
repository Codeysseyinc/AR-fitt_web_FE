import { Grid, Link, TextField } from "@mui/material";
import "./index.css";
import { useEffect, useRef, useState } from "react";

const OtpInputField: React.FC = () => {
  const secondsCountDown = 6; // time in seconds
  const numberOfDigits = 5;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState("");
  const otpBoxReference = useRef<any>([]);
  const correctOTP = "12345"; // validate from the server
  // countdown settings
  const [countdown, setCountdown] = useState<number>(secondsCountDown);
  const [triggerCountDown, setTriggerCountDown] = useState<boolean>(false);
  let countdownInterval: string | number | NodeJS.Timer | undefined;

  function handleChange(value: any, index: number) {
    console.log("handle change", value);
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
  const handleResend = () => {
    setCountdown(secondsCountDown);
    setTriggerCountDown(true);
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
    if (otp.join("").length === numberOfDigits && otp.join("") !== correctOTP) {
      setOtpError("You entered an incorrect OTP");
    } else if (
      otp.join("").length === numberOfDigits &&
      otp.join("") === correctOTP
    ) {
      setOtpError("Correct OTP");
    } else {
      setOtpError("");
    }
  }, [otp]);
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
              otpError === "You entered an incorrect OTP"
                ? "bg-red-500"
                : "bg-primary"
            } ${
              otpError === "You entered an incorrect OTP"
                ? "focus:bg-red-600 "
                : "focus:bg-teal-500 "
            }  w-[5%] h-[80%] text-black p-3 rounded-md block bg-opacity-25 border-none font-Montserrat text-center items-center focus:outline-none appearance-none`}
          />
        ))}
      </Grid>
      {/* Resend OTP */}
      <Grid className="Montserrat-text text-xs flex justify-between w-full m-4">
        <div>
          Didn’t Receive the OTP yet?
          <Link
            href="#"
            className={`${
              countdown === 0 ? "text-link" : "text-gray-500"
            }  font-bold cursor-pointer`}
            onClick={() => {
              if (countdown === 0) handleResend();
            }}
          >
            {" "}
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
          otpError === "You entered an incorrect OTP"
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
