/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Box, Grid, Menu, MenuItem } from "@mui/material";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RedirectionModal from "./redirectionModal";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const anchorTagStyling =
    "no-underline m-0 p-0 font-Montserrat font-bold text-sm text-gray-300";
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectionLink, setRedirectionLink] = useState("");
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const isFaceMatrixPresent = userDetails.isFaceScanned;
  const isBodyMatrixPresent = userDetails.isBodyScanned;

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
    handleClose();
  };

  const handleAccountManagement = () => {
    // Add your account management logic here
    handleClose();
  };
  return (
    <Grid
      item
      container
      className="bg-gray-100 rounded-lg py-4 px-8 flex flex-col gap-5 mb-6 w-full"
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
        <a href="/home" className={`${anchorTagStyling}`}>
          Dashboard
        </a>
        <a
          className={`${anchorTagStyling}`}
          onClick={() => {
            if (!isBodyMatrixPresent) {
              setModalOpen(true);
              setRedirectionLink(CONSTANTS.SIGN_UP_BODY_SCANNING);
            } else {
              navigate("/home/suggestion");
            }
          }}
        >
          Apparels
        </a>
        <a
          // href=""
          className={`${anchorTagStyling}`}
          onClick={() => {
            if (!isFaceMatrixPresent) {
              setModalOpen(true);
              setRedirectionLink(CONSTANTS.SIGN_UP_FACE_SCANNING);
            } else {
              navigate("/home/suggestion");
            }
          }}
        >
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
      <RedirectionModal
        open={modalOpen}
        setOpen={setModalOpen}
        redirection={redirectionLink}
      />
    </Grid>
  );
};

export default HomeNavbar;
