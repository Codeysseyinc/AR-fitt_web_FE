/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Grid, Menu, MenuItem } from "@mui/material";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RedirectionModal from "./redirectionModal";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useEffect, useState } from "react";
import SvgIconFromPublic from "../atomicComponents/svgIcon";
import navbarData from "../../utils/constants/JSON/homeNavbarLinks.json";

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const anchorTagStyling =
    "no-underline m-0 p-0 font-Montserrat font-bold max-sm:hidden max-md:text-xs text-sm";

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectionLink, setRedirectionLink] = useState("");
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const isFaceMatrixPresent = userDetails.isFaceScanned;
  const isBodyMatrixPresent = userDetails.isBodyScanned;
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(navbarData[0]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClick = (event: any) => {
    setMobileAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
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

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const queryParams = window.location?.search;
    if (queryParams) {
      const urlParams = new URLSearchParams(queryParams);
      const type = urlParams.get("type");
      if (type) {
        const matchingItem = navbarData.find((item) => item.name === type);
        setSelectedRoute(matchingItem || navbarData[0]);
      }
    } else {
      const matchingItem = navbarData.find((item) => item.link === currentUrl);
      setSelectedRoute(matchingItem || navbarData[0]);
    }
  }, []);

  return (
    <Grid
      item
      container
      className="bg-gray-100 rounded-lg py-4 px-8 flex flex-col gap-5 mb-2 w-full"
    >
      {/* Navbar Top Row */}
      <Grid item container className="flex justify-between items-center">
        <img className="w-8 h-8" src="/assets/images/logo.png" alt="logo" />
        <Grid item className="flex gap-4 items-center">
          <Box className="bg-gray-100 rounded-full p-1 w-5 h-5 shadow-xl flex items-center justify-center max-sm:hidden">
            <SvgIconFromPublic
              src={`${process.env.PUBLIC_URL}/assets/icons/svg/favourite.svg`}
              className="w-4 h-4"
            />
          </Box>
          <Box
            className="bg-gray-100 rounded-full p-1 w-5 h-5 shadow-xl flex items-center justify-center cursor-pointer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <SvgIconFromPublic
              src={`${process.env.PUBLIC_URL}/assets/icons/svg/person.svg`}
              className="w-5 h-5"
            />
          </Box>
          <Box
            className="sm:hidden bg-white rounded-full p-1 w-5 h-5 shadow-xl flex items-center justify-center cursor-pointer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuClick}
          >
            <SvgIconFromPublic
              src={`${process.env.PUBLIC_URL}/assets/icons/svg/hamburger.svg`}
              className="w-5 h-5"
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
          <Menu
            id="menu"
            anchorEl={mobileAnchorEl}
            keepMounted
            open={Boolean(mobileAnchorEl)}
            onClose={handleMobileMenuClose}
          >
            {navbarData?.map((item: any) => {
              return (
                <MenuItem
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Menu>
        </Grid>
      </Grid>
      {/* Horizontal Line */}
      <div className="bg-gray-200 w-full h-[2px] rounded-full max-sm:hidden"></div>
      {/* Options */}
      <Grid item container className="flex justify-between max-sm:hidden">
        {navbarData?.map((item: any) => {
          return (
            <a
              className={`${anchorTagStyling} ${
                selectedRoute?.name === item.name
                  ? "text-primaryDark"
                  : "text-gray-300"
              }`}
              onClick={() => {
                setSelectedRoute(item);
                if (item.name === "Apparel" && !isBodyMatrixPresent) {
                  setModalOpen(true);
                  setRedirectionLink(CONSTANTS.SIGN_UP_BODY_SCANNING);
                  return;
                }
                if (item.name === "Cosmetics" && !isFaceMatrixPresent) {
                  setModalOpen(true);
                  setRedirectionLink(CONSTANTS.SIGN_UP_FACE_SCANNING);
                  return;
                }

                navigate(item.link);
              }}
            >
              {item.name}
            </a>
          );
        })}
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
