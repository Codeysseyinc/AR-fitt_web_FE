import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Grid className="flex flex-row absolute w-full bg-[#C8C8C8]  bg-opacity-20 h-[8%]">
      <div className=" w-[30%] flex">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="my-[2%] mx-[5%]"
        />
      </div>
      <div className=" w-[70%] h-[100%] flex justify-evenly items-center">
        {/* Navbar Components */}
        <div className="font-Montserrat font-bold">HOME</div>
        <div className="font-Montserrat font-bold ">ABOUT US</div>
        <div className="font-Montserrat font-bold ">HOW IT WORKS</div>
        <div className="font-Montserrat font-bold ">FEATURES</div>
        <div className="font-Montserrat font-bold ">CONTACT</div>
        {/* Login Button */}
        <Button
          className={`font-Montserrat font-bold bg-primarySaturated text-contrastText h-[75%] w-[17%]`}
          variant="contained"
          style={{
            borderRadius: "7px",
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          LOGIN
        </Button>
      </div>
    </Grid>
  );
};

export default Navbar;
