import React from 'react'
import { Grid } from '@mui/material'
import HomeNavbar from '../../components/HomePage/homeNavbar'
import HeroSection from '../../components/HomePage/heroSection'

const HomePage = () => {
  return (
    <Grid className='p-5 h-screen' style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <HomeNavbar />
      <HeroSection />
    </Grid>
  )
}

export default HomePage
