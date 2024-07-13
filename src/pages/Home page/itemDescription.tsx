import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageSlider from "../../components/atomicComponents/imageSlider";

const ItemDescription = () => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <Grid container className="flex flex-col gap-1 items-center px-6">
      <Box className="w-full">
        <Typography className="text-sm text-gray-300 leading-[1]">
          Home/Apparel/Product Name
        </Typography>
      </Box>
      <Grid container className="flex gap-4">
        {/* Image Grid */}
        <Grid item xs={5}>
          <Grid className="flex flex-col my-2">
            {/* <Box className="w-full h-[400px] rounded-lg bg-gray-200"></Box> */}
            <ImageSlider
              images={[
                "/assets/images/lightGrayPlaceholder.png",
                "/assets/images/lightGrayPlaceholder.png",
                "/assets/images/lightGrayPlaceholder.png",
                "/assets/images/lightGrayPlaceholder.png",
              ]}
            />
          </Grid>
        </Grid>
        {/* Description Grid */}
        <Grid item xs={6} className="flex flex-col gap-4">
          {/* Heading */}
          <Box className="flex flex-col gap-1">
            <Typography className="font-Montserrat text-lg text-gray-300">
              {" "}
              Brand Name{" "}
            </Typography>
            <Typography className="font-Montserrat text-3xl font-bold text-gray-300">
              {" "}
              Product Name{" "}
            </Typography>
          </Box>
          {/* Description */}
          <Box className="flex flex-col gap-4">
            <Typography variant="body2" className="text-xs text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              accumsan sem. Aliquam vestibulum pellentesque mauris, ac aliquam
              libero dictum nec. Nulla eget lacus tincidunt, hendrerit magna sit
              amet, congue mauris. Suspendisse potenti. Sed laoreet fermentum
              justo, a rhoncus augue vehicula non.
            </Typography>
            <Typography variant="body2" className="text-xs text-gray-300">
              Sed ornare lacus ut nisi pretium blandit. Praesent purus felis,
              condimentum nec imperdiet at, pretium faucibus nisi. Nullam quis
              lectus quis orci laoreet blandit vel nec quam. In varius feugiat
              mauris, id tempus magna tristique id. Ut in dui ac libero varius
              bibendum vestibulum eu metus. Phasellus eget dui ante. Quisque in
              lacus rhoncus, gravida ligula et, consequat sapien.
            </Typography>
          </Box>
          {/* Functions + Price */}
          <Box className="flex flex-col gap-2 text-gray-300">
            <Typography variant="h6" className="font-bold">
              RS. 1,000
            </Typography>
            {/* Buttons */}
            <Box className="flex gap-2">
              <Button
                variant="contained"
                className="px-2 py-1 bg-primaryDark w-[50%]"
              >
                <Typography className="text-white font-bold">
                  TRY ON!
                </Typography>
              </Button>
              {/* // TODO: Add Icon here */}
              <Button variant="outlined" className="ml-2 px-2 py-1">
                <Typography className="font-bold">♡</Typography>
              </Button>
            </Box>
            {/* Colors */}
            <Grid container spacing={1} className="">
              <Grid item>
                <div className="bg-[#EDCD90] w-8 h-8"></div>
              </Grid>
              <Grid item>
                <div className="bg-[#94BB8B] w-8 h-8"></div>
              </Grid>
              <Grid item>
                <div className="bg-[#EDA2A2] w-8 h-8"></div>
              </Grid>
              <Grid item>
                <div className="bg-[#918BBB] w-8 h-8"></div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemDescription;
