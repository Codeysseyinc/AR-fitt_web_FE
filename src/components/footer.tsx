import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-52 bg-primarySaturated"
    >
      <Grid
        item
        className=" w-[40%] lg:w-[60%] xl:w-[50%] h-[100%] flex justify-start "
      >
        {/* logo */}
        <Grid
          direction="column"
          className="w-[40%] lg:w-[25%] xl:w-[30%] h-[100%] flex justify-center items-end "
        >
          <img
            className="w-[65%] lg:w-[65%] xl:w-[50%]"
            src="/assets/images/logoWhite.png"
          />
        </Grid>
        {/* text */}
        <Grid
          direction="column"
          className="w-[60%] lg:w-[70%] xl:w-[65%]  h-[100%]  flex justify-center px-4 py-8 "
        >
          <div className="font-Dhurjati font-normal text-base  text-white leading-[20px]">
            Experience the future of fashion with AR-Fitt - the ultimate
            destination for personalized style. Sign up now to unlock exclusive
            features, including virtual try-ons and curated recommendations
            tailored to your unique measurements and skin profile.
          </div>
        </Grid>
      </Grid>

      <Grid
        item
        className="w-[50%] lg:w-[40%] xl:w-[50%] h-[100%] flex justify-end"
      >
        {" "}
        {/* nav */}
        <Grid
          direction="column"
          className=" w-[30%] h-[100%]  flex justify-center "
        >
          <div className="font-Dhurjati font-normal text-base text-white leading-[20px] py-8">
            <div>Home</div>
            <div>About us</div>
            <div>How it works</div>
            <div>Features</div>
          </div>
        </Grid>
        {/* contact */}
        <Grid
          direction="column"
          className=" w-[40%] h-[100%] flex justify-center"
        >
          <div className="font-Dhurjati font-normal text-base text-white leading-[20px] py-8">
            <div className="text-lg ">Contact:</div>

            <div>+92004904-09</div>
            <div>arfitt@gmail.com</div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
