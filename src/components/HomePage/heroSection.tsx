import { Box, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const fullname = userDetails.firstName + " " + userDetails.lastName;
  return (
    <Grid
      item
      container
      className="w-full h-[70%] min-h-[500px] rounded-lg bg-primarySaturated mb-6 flex max-sm:[gap-2%] sm:gap-[4%] justify-between"
      style={{
        backgroundImage: 'url("/assets/images/homePage/homeHeroBg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
              Hey! {fullname}
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
