import { Grid } from "@mui/material";
import features from "./features.json";
const FeaturesSection: React.FC<{}> = () => {
  return (
    <>
      {/* Features section */}
      <Grid
        container
        direction="row"
        xs={12}
        className="w-screen h-screen relative bg-white"
      >
        <Grid
          item
          direction="row"
          className="h-[30%] w-[100%] flex justify-start items-start "
        >
          {/* Black Logo section */}
          <div className="w-[30%] flex justify-center items-center h-[100%]">
            {" "}
            <img src="/assets/images/logoBlack.png" className="scale-75 " />
          </div>
          {/* Gradient section */}
          <Grid
            direction="column"
            className=" h-[100%] w-[70%] bg-gradient-to-b from-primarySaturated to-transparent flex justify-center items-center   font-Dhurjati  font-normal "
          >
            <div className=" w-[90%] ">
              <div className=" text-3xl leading-7 text-center mb-5">
                Fashion at Your Fingertips: Explore Your Style Now
              </div>
              <div className=" text-base xl:text-base lg:text-sm leading-[1.5]  text-center  ">
                AR-Fitt brings the future of fashion to your fingertips,
                offering an immersive virtual try-on experience. From clothing
                to cosmetics, discover your perfect look with ease. Our
                AI-powered recommendations and personalized skin profiles ensure
                every style choice reflects your unique personality.
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid className=" h-[60%] w-[100%] flex justify-center mt-4 ">
          {/* text area */}
          <Grid item direction="column" className="w-[40%] ">
            {/* features */}
            <div className=" font-Dhurjati text-primarySaturated font-normal text-base leading-9">
              FEATURES
            </div>
            <div className="font-Dhurjati font-normal text-4xl leading-7">
              {" "}
              Elevate Your Style: Explore Our Platform Features.
            </div>
            <div className="font-Dhurjati font-normal text-base leading-[1.5] mt-6">
              Upon sign-up, you'll dive straight into exploring our array of
              features designed to elevate your style journey. Should you
              require assistance, our intuitive interface and comprehensive
              guides ensure a smooth onboarding process. Get ready to unlock the
              full potential of AR-Fitt and discover a world of virtual fashion
              at your fingertips
            </div>
          </Grid>
          {/*features asset area / table*/}
          <Grid item className="w-[40%] xl:w-[40%] lg:w-[45%] self-end ">
            {/* rows */}
            {Array.from({ length: 2 }).map((_, index) => (
              <Grid
                direction="row"
                item
                className="w-[100%] h-[50%] justify-end flex"
                key={index}
              >
                {Array.from({ length: 2 }).map((_, indexj) => (
                  <div
                    className="bg-primarySaturated w-44 h-44 m-2 flex flex-col justify-center items-start pl-2"
                    key={indexj}
                  >
                    <div className="bg-[#d9d9d9] rounded-full w-[23%] h-[23%]  bg-opacity-15 mb-1 flex justify-center items-center">
                      <img
                        src={`/assets/images/landingPage/featuresSection/${
                          features[2 * index + indexj].icon
                        }`}
                        className="h-[60%]"
                      />
                    </div>
                    <div className=" w-[90%] h-[15%] font-Dhurjati font-normal text-base text-white ">
                      {features[2 * index + indexj].title}
                    </div>
                    <div className=" w-[90%] h-[37%] font-Dhurjati leading-3 text-xs text-white">
                      {features[2 * index + indexj].description}
                    </div>
                  </div>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default FeaturesSection;
