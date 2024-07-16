import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetcher, useNavigate } from "react-router-dom";
import RedirectionModal from "../../components/HomePage/redirectionModal";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setBodyScanFailure,
  setBodyScanSuccess,
  setFaceScanFailure,
  setFaceScanSuccess,
} from "../../redux/signup/SignupActions";

const HomePage = () => {
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const isFaceMatrixPresent = userDetails.isFaceScanned;
  const isBodyMatrixPresent = userDetails.isBodyScanned;

  const fullname = userDetails.firstName + " " + userDetails.lastName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectionLink, setRedirectionLink] = useState("");
  const email = useSelector((state: any) => state.signup.userDetails.email);

  const handleContinueClick = () => {
    if (isBodyMatrixPresent || isFaceMatrixPresent)
      navigate("/home/suggestion");
    else {
      setRedirectionLink(CONSTANTS.SIGN_UP_CATEGORIES);
      setModalOpen(true);
    }
  };
  function getMatrix(type: string) {
    return (
      axios({
        // Endpoint
        url: `${process.env.REACT_APP_BASE_URL}/${type}Matrix?email=${email}`,
        method: "GET",
        headers: {
          // Add any auth token here
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        // Handle the response from backend here
        .then((res) => {
          if (type === "face") {
            console.log("face matrix exist");
            dispatch(setFaceScanSuccess());
          } else {
            console.log("body matrix exist");
            dispatch(setBodyScanSuccess());
          }
        })

        // Catch errors if any
        .catch((err: any) => {
          if (type === "face") {
            dispatch(setFaceScanFailure(""));
          } else {
            dispatch(setBodyScanFailure(""));
          }
        })
    );
  }
  useEffect(() => {
    setTimeout(() => {
      getMatrix("face");
      getMatrix("body");
    }, 2000);
  }, []);
  return (
    <Grid
      item
      container
      className="w-full h-[70%] min-h-[500px] rounded-lg bg-transparent flex max-sm:[gap-2%] sm:gap-[4%] justify-between"
    >
      {/* Image Grid */}
      <Grid
        item
        xs={5.5}
        md={5}
        lg={5}
        className="flex items-end overflow-hidden justify-end h-full"
      >
        <img
          className="max-h-[95%] min-h-[85%]"
          src="assets/images/landingPage/heroSection/landingPageModels.png"
          alt="hero-img"
        />
      </Grid>
      {/* Desc Grid */}
      <Grid
        item
        xs={6}
        md={6.5}
        lg={6.5}
        className="flex flex-col items-center justify-center"
      >
        <Box className="inline-block max-w-[700px]">
          <h1 className="font-Bungee text-white text-[550%] tracking-[10px] leading-[1] inline-block mb-0">
            AR-FITT
          </h1>
          <Box className="inline-block w-[85%]">
            <h2 className="font-Dhurjati text-[220%] text-white leading-[1]">
              Welcome! {fullname}
            </h2>
            <h2 className="font-Dhurjati text-[220%] text-white leading-[1] mt-0 mb-[10px]">
              Elevate Your Style: Explore Our Platform Features.
            </h2>
            <p className="font-Dhurjati text-lg text-white inline-block">
              Upon sign-up, you'll dive straight into exploring our array of
              features designed to elevate your style journey. Should you
              require assistance, our intuitive interface and comprehensive
              guides ensure a smooth onboarding process.
            </p>
            <Button
              className="px-2 py-1 bg-primaryDark rounded-lg"
              onClick={handleContinueClick}
            >
              <Typography className="font-Dhurjati text-[220%] text-white text-bold">
                Continue
              </Typography>
            </Button>
            <RedirectionModal
              open={modalOpen}
              setOpen={setModalOpen}
              redirection={redirectionLink}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
