import { Grid } from "@mui/material";

const MobileAppBanner = () => {
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-80 flex md:justify-center xs:justify-start items-center relative pb-10"
    >
      {/* Text Area */}
      <Grid
        item
        direction="column"
        className=" w-[65%] lg:w-[55%] xl:w-[45%] md:h-[100%] sm:h-[80%] xs:h-[70%] flex justify-center xs:pl-4 md:pl-10 bg-gradient-to-b from-primarySaturated to-[#9DC3C5] rounded-l-3xl xs:rounded-l-md"
      >
        {/* Title */}
        <div className=" xs:w-[80%] lg:w-[85%] xl:w-[80%]  font-Montserrat font-bold xs:text-xs md:text-2xl xl:text-3xl leading-11 tracking-tight xs:mb-2 md:mb-4">
          Transform Your Wardrobe with a Swipe!
        </div>
        {/* Description */}
        <div className=" w-[80%] lg:w-[80%] xl:w-[70%] font-Montserrat font-normal xs:text-xs md:text-base leading-6 xs:mb-2 md:mb-4">
          Get ready to revolutionize your fashion journey with ARFitt's mobile
          app. Download now from the Play Store and discover endless style
          possibilities!
        </div>
        {/* Google Play button */}
        <Grid
          item
          className=" h-[13%] lg:h-[13%] xl:h-[15%] flex"
          onClick={() => {}}
        >
          <img
            alt="google play store"
            src="/assets/images/landingPage/mobileAppBanner/googlePlay.png"
          />
        </Grid>
      </Grid>
      {/* Mobile phone Asset */}
      <Grid
        item
        className=" w-[20%] xl:w-[10%] lg:w-[20%] h-[90%] flex justify-center items-center  "
      >
        <img
          alt="mobile app"
          src="/assets/images/landingPage/mobileAppBanner/mobileAppBannerAsset.png"
          className=" xs:h-[90%] xsm:h-[100%] sm:h-[120%] md:h-[140%]"
        />
      </Grid>
    </Grid>
  );
};

export default MobileAppBanner;
