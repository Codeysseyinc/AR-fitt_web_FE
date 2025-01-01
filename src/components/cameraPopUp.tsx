/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { Modal, Fade, Box, Typography, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Camera } from "react-camera-pro";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import DashboardService from "../services/dashboard.service";

const CameraPopUp = ({
  open,
  selectedColor,
  productImage,
  onClose,
  handleSelectedColor,
}: {
  open: boolean;
  selectedColor: any;
  productImage: any;
  onClose: () => void;
  handleSelectedColor: (payload: any) => void;
}) => {
  let countdownInterval: string | number | NodeJS.Timer | undefined;
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [triggerCountDown, setTriggerCountDown] = useState<boolean>(false);

  const selectedItem = useSelector(
    (state: RootState) => state.main.selectedItem
  );
  const handleCapturePhoto = () => {
    setImage((camera.current as any).takePhoto());
  };
  const handleCancelClick = () => {
    setImage(null);
    setTriggerCountDown(false);
    setCountdown(0);
  };
  const capturePhoto = () => {
    setCountdown(0);
    setImage((camera.current as any).takePhoto());
  };
  const handleTimerClick = () => {
    setImage(null);
    setCountdown(5);
    setTriggerCountDown(true);
  };
  const handleClose = () => {
    setCountdown(0);
    setImage(null);
    onClose();
  };

  const [_count, _setCount] = useState(0);
  const dispatch = useDispatch();
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    let testCount = 0;
    const intervalId = setInterval(() => {
      console.log("$$ ----------------------------");
      console.log("$$ COUNT FRAMES");
      console.log("$$ ----------------------------");
      let frameCount = 0;
      for (let i = 0; i < 30; i++) {
        console.log("$$ API CALL WAS MADE FOR THE ", frameCount + 1, " Time");
        const response = DashboardService.getInventory(
          "8c8d034c-cf5e-45a4-9cef-ca95c0274f27",
          dispatch
        );
        frameCount++;
        response.then((e) => {
          // console.log("$$ Response then: ", e);
          testCount += 1;
          _setCount(testCount);
        });
      }
    }, 1000);
    intervalRef.current = intervalId;
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

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
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="camera"
      aria-describedby="camera-pop-up-for-try-on"
      className="flex items-center justify-center"
    >
      <Fade in={open}>
        <Box
          className="
            relative flex flex-col gap-4
            h-[80%]
            max-sm:w-full sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[40%] w-full
            overflow-hidden
            rounded-xl bg-black
          "
        >
          {/* Camera */}
          {image ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={image}
              alt="Taken photo"
              style={{ transform: "scaleX(-1)" }}
            />
          ) : open === true ? (
            <>
              <Camera
                ref={camera}
                errorMessages={{
                  noCameraAccessible: undefined,
                  permissionDenied: undefined,
                  switchCamera: undefined,
                  canvas: undefined,
                }}
                facingMode="user"
              />
            </>
          ) : (
            <></>
          )}
          {/* Count Down */}
          {countdown !== 0 ? (
            <div className="absolute top-[45%] right-[47%] font-Bungee font-normal text-7xl leading-10 text-red-600">
              {countdown}
            </div>
          ) : (
            ""
          )}
          {/* Top Row - Item Basic Description */}
          <Box className="absolute top-4 flex justify-between w-full items-start">
            {/* Product Basic Info */}
            <Box className="px-4 flex gap-2 items-center">
              {/* Image */}
              <img
                src={productImage}
                className="bg-gray-100 h-[40px] w-[30px] rounded-sm"
              />
              <Box className="flex flex-col gap-1 items-start">
                <Typography className="font-Montserrat font-bold text-xs">
                  {selectedItem?.name}
                </Typography>
                <Box className="flex gap-1 justify-center items-center">
                  <Box
                    style={{ backgroundColor: selectedColor?.colorHex }}
                    className="rounded-full border-1 border-primaryDark border-solid p-2"
                  ></Box>
                  <Typography className="font-Montserrat font-bold text-xs">
                    {selectedColor?.color}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* Close Button */}
            <Box className="px-2">
              <IconButton
                onClick={() => handleClose()}
                className="bg-black bg-opacity-10"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </Box>
          </Box>
          {/* Colors Row */}
          <Box className="absolute bottom-20 w-full flex flex-col gap-2 items-center justify-center">
            <Typography className="text-xs text-white font-bold">
              Recommended Shades:{" "}
            </Typography>
            <Box
              className="flex gap-3 overflow-x-auto max-w-[90%]"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {selectedItem?.itemColors?.map((color: any) => {
                return (
                  <Box
                    className={`p-6 rounded-full cursor-pointer border border-solid border-[2px] ${
                      selectedColor?.colorHex === color?.colorHex
                        ? "border-primaryDark"
                        : ""
                    }`}
                    style={{ backgroundColor: color.colorHex }}
                    onClick={() => {
                      handleSelectedColor(color);
                    }}
                  />
                );
              })}
            </Box>
          </Box>
          {/* Toolbar Row */}
          <Box className="absolute bottom-4 w-full flex justify-center items-center">
            <Box className="bg-primarySaturated p-3 rounded-xl flex justify-between gap-2">
              {/* Cancel */}
              <button
                className="bg-transparent border-none p-0 m-0 cursor-pointer"
                onClick={() => {
                  if (countdown !== 0) handleCancelClick();
                }}
              >
                <div className="px-4 py-2 leading-none bg-gray-500 rounded-xl font-Montserrat font-semibold text-xs text-white flex justify-center items-center">
                  Cancel
                </div>
              </button>
              {/* Retake */}
              <button
                onClick={() => setImage(null)}
                className="bg-transparent border-none p-0 m-0 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full">
                  <RefreshIcon className="h-full w-full text-white" />
                </div>
              </button>
              {/* Capture */}
              <button
                onClick={() => handleCapturePhoto()}
                className="bg-transparent border-none p-0 m-0 cursor-pointer"
              >
                <div className="border-4 border-solid border-white bg-red-500 p-3 rounded-full flex justify-center items-center"></div>
              </button>
              {/* Okay */}
              <button className="bg-transparent border-none p-0 m-0 cursor-pointer">
                <div className="w-8 h-8 rounded-full">
                  <CheckCircleIcon className="h-full w-full text-white" />
                </div>
              </button>
              {/* Timer */}
              <button
                className="bg-transparent border-none p-0 m-0 cursor-pointer"
                onClick={() => {
                  handleTimerClick();
                }}
              >
                <div className="px-4 py-2 leading-none bg-gray-500 rounded-xl font-Montserrat font-semibold text-xs text-white flex justify-center items-center">
                  Timer
                </div>
              </button>
            </Box>
          </Box>
          <h1 className="absolute top-[50%] left-[50%] text-3xl text-white font-bold">
            {_count}
          </h1>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CameraPopUp;
