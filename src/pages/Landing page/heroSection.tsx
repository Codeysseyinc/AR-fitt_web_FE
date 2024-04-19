import { Grid } from "@mui/material";
import Navbar from "../../components/navbar";
import HeroSectionCard from "../../components/heroSectionCard";
import CallToActionButton from "../../components/callToActionButton";

const HeroSection: React.FC<{}> = () => {
  return (
    <>
      {/* Hero section */}
      <Grid
        container
        direction="row"
        xs={12}
        className="w-screen h-screen relative"
      >
        <Navbar />
        {/* white panel on left */}
        <Grid item className="bg-white h-[100%] w-[30%] flex ">
          <Grid
            item
            direction="column"
            className="pl-6 self-center w-[80%] h-[60%] self-center "
          >
            <img
              src="/assets/images/landingPage/heroSection/landingPageDemoAsset.png"
              className=" self-center  mt-0 lg:h-[80%] xl:h-[90%]  "
            />
            <div className=" lg:w-[80%] xl:w-[60%] font-Dhurjati font-normal text-lg text-gray-500">
              Style Made Simple, virtual Fashion with AR-Fitt. Let's Elevate
              Your Look
            </div>
            <CallToActionButton nav="/getStarted" title="Get Started" />
          </Grid>
          {/* AR-FITT dual tone */}
          <img
            src="/assets/images/landingPage/heroSection/landingPageHeroSectionText.png"
            className="absolute  left-[27%] xl:left-[27.5%]  lg:left-[27%] h-[77%]  xl:h-[80%] lg:h-[77%] top-[15%]"
          />
        </Grid>
        {/* Green panel on right */}

        <Grid
          item
          direction="row"
          className="bg-primarySaturated h-[100%] w-[70%] flex justify-start items-end "
        >
          <Grid className=" h-[85%] w-[80%] flex justify-end">
            {/* Hero Section Models + Grafitti*/}
            <div className="flex flex-col justify-end relative ">
              <img
                className="z-10 h-[100%]"
                src="/assets/images/landingPage/heroSection/heroSectionModels.png"
              />
              <div className=" absolute bg-gradient-to-b from-transparent to-primarySaturated w-[100%] h-[4%] z-20 " />
            </div>
          </Grid>
          {/* Explore your style cards */}
          <Grid className="z-20 absolute h-[35%] w-[35%] right-0 mb-4">
            <div className="bg-[#282828] bg-opacity-80 rounded-md  h-[15%] w-[50%] font-Dhurjati font-normal text-base md:text-lg lg:text-xl xl:text-2xl text-center leading-tight tracking-wide text-contrastText">
              EXPLORE YOUR STYLE
            </div>
            <Grid direction="row" className="flex h-[100%]">
              <HeroSectionCard
                color="blue"
                title="SUGGESTIONS"
                icon="landingPageSuggestionslogo.png"
              />
              <HeroSectionCard
                color="pink"
                title="COSMETICS"
                icon="landingPageCosmeticsLogo.png"
              />
              <HeroSectionCard
                color="purple"
                title="APPARELS"
                icon="landingPageApparelsLogo.png"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Features section */}
    </>
  );
};
export default HeroSection;
