/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Box, Grid, Menu, MenuItem } from "@mui/material";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const anchorTagStyling =
    "no-underline m-0 p-0 font-Montserrat font-bold text-sm text-gray-300";
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(initializeSignUpState());
    localStorage.clear();
    navigate("/");
    console.log("Logout clicked");
    handleClose();
  };

  const handleAccountManagement = () => {
    // Add your account management logic here
    console.log("Account Management clicked");
    handleClose();
  };
  return (
    <Grid
      item
      container
      className="bg-gray-100 rounded-lg py-4 px-8 flex flex-col gap-5 mb-6"
    >
      {/* Navbar Top Row */}
      <Grid item container className="flex justify-between items-center">
        <img className="w-8 h-8" src="/assets/images/logo.png" alt="logo" />
        <Grid item className="flex gap-4">
          <Box className="bg-white rounded-full p-1 w-6 h-6 shadow-lg flex items-center justify-center">
            <img
              className="w-4 h-4"
              src="/assets/icons/png/heartIcon.png"
              alt="fav icon"
            />
          </Box>
          <Box
            className="bg-white rounded-full p-1 w-6 h-6 shadow-lg flex items-center justify-center cursor-pointer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <img
              className="w-5 h-5"
              src="/assets/icons/png/personIcon.png"
              alt="fav icon"
            />
          </Box>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccountManagement}>
              Account Management
            </MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      {/* Horizontal Line */}
      <div className="bg-gray-200 w-full h-[2px] rounded-full"></div>
      {/* Options */}
      <Grid item container className="flex justify-between">
        <a href="" className={`${anchorTagStyling}`}>
          Suggested Items
        </a>
        <a href="" className={`${anchorTagStyling}`}>
          Apparels
        </a>
        <a href="" className={`${anchorTagStyling}`}>
          Cosmetics
        </a>
        <a href="" className={`${anchorTagStyling}`}>
          How To
        </a>
        <a href="" className={`${anchorTagStyling}`}>
          About Us
        </a>
        <a href="" className={`${anchorTagStyling}`}>
          Contact Us
        </a>
      </Grid>
    </Grid>
  );
};

export default HomeNavbar;
