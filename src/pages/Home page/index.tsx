import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const fullname = userDetails.firstName + " " + userDetails.lastName;
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate("/home/suggestion");
  };
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
