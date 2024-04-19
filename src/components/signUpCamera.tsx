import { Grid } from "@mui/material";
import Webcam from "react-webcam";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ClassNames } from "@emotion/react";
const SignUpCamera: React.FC<{}> = () => {
  const videoConstraints = {
    width: 137,
    height: 162,
    facingMode: "user",
  };
  return (
    <Grid
      direction="column"
      className="h-[100%] w-[100%] flex justify-center items-center "
    >
      <div className="relative h-[100%] ">
        <Webcam
          audio={false}
          height={"100%"}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-[10%] z-0 "
        />
        <img
          src="./assets/images/signUp/scanningSkeleton.png"
          alt="skeleton"
          className="absolute top-0 left-[25%] w-[50%] h-[100%] scale-25 z-1 "
        />
      </div>
      <Grid className="bg-primary h-[13%] w-[35%] rounded-xl	mt-4 flex justify-between items-center">
        {/* Cancel button */}
        <div className=" h-[73%] w-[35%] flex justify-end items-center">
          <div className="bg-primaryDark h-[73%] w-[85%] rounded-xl"></div>
        </div>
        {/* Retry button */}
        <div className="h-[73%] w-[35%] flex justify-center items-center">
          <RefreshIcon sx={{ color: "white" }} />
        </div>
        {/* Capture button */}
        <div className="h-[73%] w-[35%] flex justify-center items-center">
          <div className="border-4 border-solid border-white bg-red-500 h-[100%] w-[55%] xl:w-[50%] rounded-full flex justify-center items-center"></div>
        </div>
        {/* Tick button */}
        <div className=" h-[73%] w-[35%] flex justify-center items-center">
          <CheckCircleIcon sx={{ color: "white" }} />
        </div>

        {/* Timer button */}
        <div className="h-[73%] w-[35%] flex  items-center">
          <div className="bg-primaryDark h-[73%] w-[85%] rounded-xl"></div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUpCamera;
