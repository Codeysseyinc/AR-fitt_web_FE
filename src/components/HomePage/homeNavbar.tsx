/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, Grid } from '@mui/material';

const HomeNavbar = () => {
  const anchorTagStyling = "no-underline m-0 p-0 font-Montserrat font-bold text-sm text-gray-300";

  return (
    <Grid
      item
      container
      className="bg-gray-100 rounded-lg py-4 px-8 flex flex-col gap-5 mb-6"
    >
      {/* Navbar Top Row */}
      <Grid item container className='flex justify-between items-center'>
        <img
          className="w-8 h-8"
          src="/assets/images/logo.png"
          alt='logo'
        />
        <Grid item className='flex gap-4'>
          <Box className='bg-white rounded-full p-1 w-6 h-6 shadow-lg flex items-center justify-center'>
            <img
              className='w-4 h-4'
              src="/assets/icons/png/heartIcon.png"
              alt="fav icon"
            />
          </Box>
          <Box className='bg-white rounded-full p-1 w-6 h-6 shadow-lg flex items-center justify-center'>
            <img
              className='w-5 h-5'
              src="/assets/icons/png/personIcon.png"
              alt="fav icon"
            />
          </Box>
        </Grid>
      </Grid>
      {/* Horizontal Line */}
      <div className="bg-gray-200 w-full h-[2px] rounded-full"></div>
      {/* Options */}
      <Grid item container className='flex justify-between'>
        <a href="" className={`${anchorTagStyling}`}>Suggested Items</a>
        <a href="" className={`${anchorTagStyling}`}>Apparels</a>
        <a href="" className={`${anchorTagStyling}`}>Cosmetics</a>
        <a href="" className={`${anchorTagStyling}`}>How To</a>
        <a href="" className={`${anchorTagStyling}`}>About Us</a>
        <a href="" className={`${anchorTagStyling}`}>Contact Us</a>
      </Grid>
    </Grid>
  )
}

export default HomeNavbar
