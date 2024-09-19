import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setBodyScanSuccess,
  setCurrentForm,
  setErrorMsg,
  setFaceScanSuccess,
  setGuestBodyScanSuccess,
  setGuestFaceScanSuccess,
} from "../redux/signup/SignupActions";
import CONSTANTS from "../utils/constants/CONSTANTS";
import { Camera, CameraType } from "react-camera-pro";
import CameraTools from "./cameraTools";
import signupService from "../services/signup.service";
import { useMutation } from "react-query";
interface SignUpCameraProps {
  type: string;
}

const SignUpCamera: React.FC<SignUpCameraProps> = ({ type }) => {
  const camera = useRef<CameraType>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const [triggerCountDown, setTriggerCountDown] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState(false);
  let countdownInterval: string | number | NodeJS.Timer | undefined;
  const isFaceScanExists = useSelector(
    (state: any) => state.signup.userDetails.isFaceScanned
  );
  const isFaceScanRequired =
    useSelector((state: any) => state.signup.interestCategories).some(
      (item: any) => item.includes("cosmetics")
    ) && !isFaceScanExists;
  const email = useSelector((state: any) => state.signup.userDetails.email);
  const guestDetails = useSelector((state: any) => state.signup.guestDetails);

  const { mutate: storeImage } = useMutation(
    async (img: any) =>
      signupService.storeImage(type, img, email, guestDetails.id),
    {
      onSuccess: () => {
        if (type === "face") {
          if (email) {
            dispatch(setFaceScanSuccess());
          } else {
            dispatch(setGuestFaceScanSuccess());
          }
        } else {
          if (email) {
            dispatch(setBodyScanSuccess());
          } else {
            dispatch(setGuestBodyScanSuccess());
          }
        }
      },
      onError: (err: any) => {
        if (err?.response.data.message === "Unauthorized access") {
          navigate("/");
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
          localStorage.clear();
        }
        dispatch(setErrorMsg(err?.response.data.message));
      },
    }
  );

  function setImage(): any {
    // Convert base64 string to Blob
    const byteString = atob(imgSrc.split(",")[1]);
    const mimeString = imgSrc.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    // Prepare form data
    const formData = new FormData();
    formData.append("image", blob);
    storeImage(imgSrc);
  }
  const handleCapturePhoto = () => {
    if (!confirmation) {
      setConfirmation(true);
    } else {
      const image = camera.current?.takePhoto();
      if (image && typeof image === "string") {
        setImgSrc(image);
      }
    }
  };
  const handleCancelClick = () => {
    if (countdown !== 0) {
      setImgSrc("");
      setTriggerCountDown(false);
      setCountdown(0);
    }
  };
  const handleRetryClick = () => {
    setImgSrc("");
  };
  const capturePhoto = () => {
    setCountdown(0);
    handleCapturePhoto();
  };
  const handleConfirm = () => {
    if (imgSrc) {
      setImage();
      if (isFaceScanRequired && type === "body") {
        dispatch(setCurrentForm(CONSTANTS.SIGN_UP_FACE_SCANNING));
      } else {
        dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
        navigate("/home");
      }
    }
  };
  const handleTimerClick = () => {
    setImgSrc("");
    setCountdown(5);
    setTriggerCountDown(true);
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

  return (
    <Grid
      direction="column"
      className="xs:w-[320px] xl:w-[395px] xs:h-[406px] xl:h-[500px] mt-4 flex justify-start items-center"
    >
      <div className="relative h-[85%] w-[80%]">
        {!confirmation ? (
          <div className="rounded-[20px] h-[100%] px-[15px] bg-primary flex flex-col items-center justify-center">
            <p className="font-Montserrat font-bold text-white text-center">
              Camera Activation Required
            </p>
            <p className="font-Montserrat text-white text-center">
              To personalize suggestions for apparel and cosmetics, we need a
              full-body and face picture. Please take these in a comfortable,
              private setting.
            </p>
          </div>
        ) : imgSrc ? (
          <img
            src={imgSrc}
            alt="captured scan"
            className="rounded-[20px] h-[100%] w-[100%]"
          />
        ) : (
          <>
            <div className="relative rounded-[20px] overflow-hidden h-[100%] w-[100%]">
              <Camera
                ref={camera}
                aspectRatio="cover"
                facingMode="user"
                errorMessages={{
                  noCameraAccessible:
                    "No camera device accessible. Please connect your camera or try a different browser.",
                  permissionDenied:
                    "Permission denied. Please refresh and give camera permission.",
                  switchCamera:
                    "It is not possible to switch camera to different one because there is only one video device accessible.",
                  canvas: "Canvas is not supported.",
                }}
              />
            </div>
            <img
              src={
                type === "body"
                  ? "./assets/images/signUp/scanningSkeleton.png"
                  : "./assets/images/signUp/scanningFaceSkeleton.png"
              }
              alt="skeleton"
              className={
                type === "body"
                  ? "absolute top-0 left-[25%] w-[50%] h-[100%] scale-25 z-1 "
                  : "absolute top-0  w-[100%] h-[100%] scale-25 z-1 opacity-[10%]"
              }
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
      <CameraTools
        cameraRef={camera}
        type={type}
        onCancel={handleCancelClick}
        onRetry={handleRetryClick}
        onCapture={handleCapturePhoto}
        onConfirm={handleConfirm}
        onSetTimer={handleTimerClick}
      />
    </Grid>
  );
};

export default SignUpCamera;
