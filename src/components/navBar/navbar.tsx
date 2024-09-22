import { Button, Drawer, Grid, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import navbarData from "../../utils/constants/JSON/navbar.json";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery(CONSTANTS.MOBILE_VIEW_MAX_WIDTH);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
  const isTokenExpired = () => {
    if (token) {
      const exp = jwtDecode(token).exp;
      if (exp) return exp < Math.floor(Date.now() / 1000);
    } else return true;
  };
  const navList = navbarData.map((item, index) => {
    if (item.type === "button") {
      return (
        <Button
          className={`font-Montserrat font-bold bg-primarySaturated text-contrastText h-[33px] w-[100px]`}
          variant="contained"
          style={{
            borderRadius: "7px",
          }}
          onClick={() => {
            if (!isTokenExpired()) {
              navigate("/home");
            } else {
              navigate(item.link);
            }
          }}
        >
          {token ? "HOME" : item.name}
        </Button>
      );
    } else {
      return (
        <a
          className="font-Montserrat font-bold text-black no-underline lg:text-base xs:text-xs xs:pb-[20px] md:pb-0"
          href={item.link}
        >
          {item.name}
        </a>
      );
    }
  });
  return (
    <Grid className="flex flex-row sticky top-0 w-full bg-[#C8C8C8] bg-opacity-70 h-[60px] z-40 ">
      <div className=" w-[30%] flex">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="my-[2%] mx-[5%] "
        />
      </div>

      <div className=" w-[70%] h-[100%] flex xs:justify-end md:justify-around items-center">
        {isMobileView ? (
          <>
            {" "}
            <Button onClick={toggleDrawer(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="white"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <Drawer
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "white",
                  opacity: "90%",
                  padding: "20px",
                },
              }}
            >
              {navList}
            </Drawer>
          </>
        ) : (
          <>
            {/* Navbar Components */}
            {navList}
          </>
        )}{" "}
      </div>
    </Grid>
  );
};

export default Navbar;
