import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomeNavbar from "../components/HomePage/homeNavbar";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const HomeLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const userDetails = useSelector(
    (state: RootState) => state.signup.userDetails
  );
  const guestDetails = useSelector(
    (state: RootState) => state.signup.guestDetails
  );

  const [_, setToken] = useState(localStorage.getItem("access-token"));

  useEffect(() => {
    setToken(localStorage.getItem("access-token"));
  }, [userDetails, guestDetails]);

  return (
    <Grid
      className="p-2 h-screen overflow-auto flex justify-center"
      style={
        isHomePage
          ? {
              backgroundImage: 'url("/assets/images/homePage/homeHeroBg.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              overflowY: "auto",
              maxHeight: "100vh",
            }
          : { backgroundColor: "white" }
      }
    >
      <Grid className="max-w-[1440px] w-full h-screen">
        <HomeNavbar />
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
