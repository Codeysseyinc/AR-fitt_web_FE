import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomeNavbar from "../components/HomePage/homeNavbar";
import { Grid } from "@mui/material";

const HomeLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <Grid
      className="p-2 h-screen overflow-auto"
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
      <HomeNavbar />
      <Outlet />
    </Grid>
  );
};

export default HomeLayout;
