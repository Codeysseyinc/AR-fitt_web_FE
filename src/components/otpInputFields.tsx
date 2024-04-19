import { Grid, Link, TextField } from "@mui/material";
import "./index.css";
import { useEffect, useRef, useState } from "react";

const OtpInputField: React.FC = () => {
  const numberOfDigits = 5;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState("");
  const otpBoxReference = useRef<any>([]);
  const correctOTP = "12345"; // validate from the server

  function handleChange(value: any, index: number) {
    console.log("handle change", value);
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
  }

  function handleBackspaceAndEnter(e: any, index: number) {
    console.log("keyup", e.key);
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
      return;
    }

    if (index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }
  useEffect(() => {
    if (otp.join("").length === 5 && otp.join("") !== correctOTP) {
      setOtpError("❌ Wrong OTP");
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
            className={` w-[5%] h-[80%] text-black p-3 rounded-md block bg-primary bg-opacity-25 border-none focus:bg-teal-500 font-Montserrat text-center items-center focus:outline-none appearance-none`}
          />
        ))}
      </Grid>
      {/* Resend OTP */}
      <Grid className="Montserrat-text text-xs flex justify-start w-full m-4">
        Didn’t Receive the OTP yet?&nbsp;
        <Link href="#" className="text-link font-bold">
          {" "}
          Resend
        </Link>
      </Grid>
      {/* Error on wrong OTP */}
      <p
        className={`font-Montserrat text-sm text-black ${
          otpError ? "error-show" : ""
        }`}
      >
        {otpError}
      </p>
    </>
  );
};
export default OtpInputField;
