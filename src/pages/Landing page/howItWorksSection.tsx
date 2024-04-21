import { Grid, Slider } from "@mui/material";
import { Slide } from "@mui/material";
import Carousel from "../../components/carousel";

const HowItWorksSection: React.FC<{}> = () => {
  const slideValues = [1, 2, 3, 4, 5];

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
          direction="column"
          className=" h-[90%] w-[100%] flex justify-start items-center "
        >
          <div className=" font-Dhurjati text-primarySaturated font-normal text-base leading-9 mt-4">
            HOW IT WORKS
          </div>
          {/*Some Description */}
          <Grid
            direction="column"
            className=" lg:w-[40%] lg:h-[100%] xl:w-[40%] xl:h-[100%] mx-4 flex items-center "
          >
            <div className="font-Dhurjati font-normal text-3xl leading-7 text-center">
              Browse, Try, Transform: Elevating Your Style, Step by Step.{" "}
            </div>
          </Grid>
          {/* Carousel */}
          <Grid
            direction="column"
            className=" lg:w-[85%] lg:h-[90%] xl:w-[80%] xl:h-[100%]  flex items-center "
          >
            <div className="w-[100%] h-[100%] mt-8  flex">
              <Carousel />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default HowItWorksSection;
