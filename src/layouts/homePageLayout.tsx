import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import HomeNavbar from "../components/HomePage/homeNavbar";

const HomeLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const userDetails = useSelector(
    (state: RootState) => state.signup.userDetails
  );
  const guestDetails = useSelector(
    (state: RootState) => state.signup.guestDetails
  );

  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [userDetails, guestDetails]);

  return (
    <>
      {token ? (
        <Grid
          className="p-2 h-screen overflow-auto flex justify-center"
          style={
            isHomePage
              ? {
                  backgroundImage:
                    'url("/assets/images/homePage/homeHeroBg.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflowY: "auto",
                  maxHeight: "100vh",
                }
              : { backgroundColor: "white" }
          }
        >
          <Grid className="max-w-[1440px] w-full min-h-screen">
            <HomeNavbar />
            <Outlet />
          </Grid>
        </Grid>
      ) : (
        <p className="py-10 px-5">PLEASE LOGIN OR SIGNUP TO CONTINUE</p>
      )}
    </>
  );
};

export default HomeLayout;
