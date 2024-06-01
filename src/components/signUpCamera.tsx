import { Grid } from "@mui/material";
import Webcam from "react-webcam";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ClassNames } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentForm } from "../redux/signup/SignupActions";
import CONSTANTS from "../utils/constants/CONSTANTS";
const SignUpCamera: React.FC<{}> = () => {
  const videoConstraints = {
    width: 137,
    height: 162,
    facingMode: "user",
  };
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const [countdown, setCountdown] = useState<number>(0);
  const [triggerCountDown, setTriggerCountDown] = useState<boolean>(false);
  let countdownInterval: string | number | NodeJS.Timer | undefined;

  const handleCapturePhoto = () => {
    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImgSrc(image);
    }
  };
  const handleCancelClick = () => {
    setImgSrc("");
    setTriggerCountDown(false);
    setCountdown(0);
  };
  useEffect(() => {
    if (triggerCountDown && countdown > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown === 0 && triggerCountDown) {
      capturePhoto();
      setTriggerCountDown(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, triggerCountDown]);

  const capturePhoto = () => {
    setCountdown(0);

    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImgSrc(image);
    }
  };
  const handleTimerClick = () => {
    setImgSrc("");
    setCountdown(5);
    setTriggerCountDown(true);
  };

  return (
    <Grid
      direction="column"
      className="h-[100%] w-[100%] flex justify-center items-center "
    >
      <div className="relative h-[80%]  ">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="webcam"
            className="rounded-[10%] h-[162] w-[137]"
          />
        ) : (
          <>
            <Webcam
              audio={false}
              height={"100%"}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-[10%] z-0 "
            />

            <img
              src="./assets/images/signUp/scanningSkeleton.png"
              alt="skeleton"
              className="absolute top-0 left-[25%] w-[50%] h-[100%] scale-25 z-1 "
            />
            {countdown !== 0 ? (
              <div className="absolute  top-[41%] right-[41%] font-Bungee font-normal text-7xl leading-10 text-red-600">
                {countdown}
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      {/* Buttons Panel */}
      <Grid className="bg-primary h-[15%] w-[50%] rounded-xl	mt-4 flex justify-between items-center">
        {/* Cancel button */}
        <div className=" h-[73%] w-[35%] flex justify-end items-center">
          <div
            className={`${
              countdown === 0 ? "bg-gray-500" : "bg-primaryDark"
            } h-[73%] w-[85%] rounded-xl font-Montserrat font-semibold text-xs leading-10 text-white flex justify-center items-center`}
            onClick={() => {
              if (countdown !== 0) handleCancelClick();
            }}
          >
            Cancel
          </div>
        </div>
        {/* Retry button */}
        <div className="h-[73%] w-[35%] flex justify-center items-center">
          <RefreshIcon
            sx={{ color: "white" }}
            onClick={() => {
              setImgSrc("");
            }}
          />
        </div>
        {/* Capture button */}
        <div
          className="h-8 w-28 flex justify-center items-center "
          onClick={() => {
            handleCapturePhoto();
          }}
        >
          <div className="border-4 border-solid border-white bg-red-500 h-[100%] w-[55%] xl:w-[50%] rounded-full flex justify-center items-center"></div>
        </div>
        {/* Tick button */}
        <div className=" h-[73%] w-[35%] flex justify-center items-center">
          <CheckCircleIcon
            sx={{ color: "white" }}
            onClick={() => {
              if (imgSrc) {
                dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));

                navigate("/home");
              }
            }}
          />
        </div>

        {/* Timer button */}
        <div className="h-[73%] w-[35%] flex  items-center">
          <div
            className="bg-primaryDark h-[73%] w-[85%] rounded-xl font-Montserrat font-semibold text-xs leading-10 text-white flex justify-center items-center cursor-pointer"
            onClick={() => {
              handleTimerClick();
            }}
          >
            Timer
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUpCamera;
