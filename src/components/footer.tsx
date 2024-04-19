import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-52 bg-primarySaturated"
    >
      <Grid item className=" w-[50%] h-[100%] flex justify-center">
        {/* logo */}
        <Grid
          direction="column"
          className=" w-[30%] h-[100%] flex justify-center items-center"
        >
          <img className="w-[50%]" src="/assets/images/logoWhite.png" />
          <div className="font-Dhurjati font-normal text-center text-base text-white leading-[20px] mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          </div>
        </Grid>
        {/* text */}
        <Grid
          direction="column"
          className="w-[50%] h-[100%]  flex justify-center px-4 py-8"
        >
          <div className="font-Dhurjati font-normal text-center text-base text-white leading-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco{" "}
          </div>
        </Grid>
      </Grid>
      <Grid item className=" w-[50%] h-[100%] flex justify-end">
        {" "}
        {/* nav */}
        <Grid direction="column" className=" w-[30%] h-[100%] ">
          <div className="font-Dhurjati font-normal text-base text-white leading-[20px] py-8">
            <div>Home</div>
            <div>About us</div>
            <div>How it works</div>
            <div>Features</div>
          </div>
        </Grid>
        {/* contact */}
        <Grid direction="column" className=" w-[40%] h-[100%]">
          <div className="font-Dhurjati font-normal text-base text-white leading-[20px] py-8">
            <div>Contact</div>
            <div>+92004904-09</div>
            <div>arfitt@gmail.com</div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
