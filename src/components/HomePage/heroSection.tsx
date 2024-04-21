import { Box, Grid } from '@mui/material'
import React from 'react'

const HeroSection = () => {
  return (
    <Grid
      item
      container
      className='w-full h-[70%] rounded-lg bg-primarySaturated mb-6 flex max-sm:[gap-2%] sm:gap-[4%] justify-between'
      style={{
        backgroundImage: 'url("/assets/images/homePage/homeHeroBg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Image Grid */}
      <Grid
        item
        xs={5.5}
        md={5}
        lg={4.5}
        className="flex items-end overflow-hidden justify-end h-full"
      >
        <img
          className='max-h-[95%] min-h-[85%]'
          src='assets/images/landingPage/heroSection/landingPageModels.png'
          alt="hero-img"
        />
      </Grid>
      {/* Desc Grid */}
      <Grid
        item
        xs={6}
        md={6.5}
        lg={7}
        className="flex flex-col items-center justify-center"
      >
        <Box className="inline-block max-w-[700px]">
          <h2 className='font-Bungee text-white text-[100px] tracking-[10px] leading-tighter inline-block m-0'>
            AR-FITT
          </h2>
          <Box className='inline-block w-[95%]'>
            <h2 className='font-Dhurjati text-[40px] text-white m-0 inline-block'>Hey! Rafay Rashed</h2>
            <h2 className='font-Dhurjati text-[40px] text-white leading-[1] mb-[10px] inline-block'>Elevate Your Style: Explore Our Platform Features.</h2>
            <p className='font-Dhurjati text-[20px] text-white inline-block'>
              Upon sign-up, you'll dive straight into exploring our array of features designed to elevate your style journey. Should you require assistance, our intuitive interface and comprehensive guides ensure a smooth onboarding process.
            </p>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HeroSection
