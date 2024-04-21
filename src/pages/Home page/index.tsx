import React from 'react'
import { Grid } from '@mui/material'
import HomeNavbar from '../../components/HomePage/homeNavbar'
import HeroSection from '../../components/HomePage/heroSection'
import SuggestedItems from '../../components/HomePage/suggestedItems'
import Footer from '../../components/footer'

const HomePage = () => {
  return (
    <Grid className='p-5 h-screen' style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <HomeNavbar />
      <HeroSection />
      {/* Categories Buttons */}
      <Grid container item className='w-full flex gap-[5%] mb-6'>
        <Grid
          item
          xs={5.7}
          className='p-10 bg-green-300 rounded-lg w-full flex justify-center items-center relative overflow-hidden'
        >
          <img className="absolute top-0 left-0 h-full z-0" src="assets/icons/png/ApparelIcons.png" alt="Apparel Icons" />
          <h1 className='font-Bungee text-[250%] text-white tracking-wider z-10'>Apparel</h1>
        </Grid>
        <Grid
          item
          xs={5.7}
          className='p-10 bg-green-300 rounded-lg w-full flex justify-center items-center relative overflow-hidden'
        >
          <img className="absolute top-0 left-0 h-full z-0" src="assets/icons/png/MakeupIcons.png" alt="Makeup Icons" />
          <h1 className='font-Bungee text-[250%] text-white tracking-wider z-10'>COSMETICS</h1>
        </Grid>
      </Grid>
      <SuggestedItems />
    </Grid>
  )
}

export default HomePage
