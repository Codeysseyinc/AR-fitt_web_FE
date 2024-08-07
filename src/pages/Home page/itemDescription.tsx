import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import CameraPopUp from "../../components/cameraPopUp";
import ImageSlider from "../../components/atomicComponents/imageSlider";
import "react-image-gallery/styles/css/image-gallery.css";

const ItemDescription = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState<any>();
  const selectedItem = useSelector(
    (state: RootState) => state.main.selectedItem
  );

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSelectedSize = (size: string) => {
    setSelectedSize(size);
  };
  const handleSelectedColor = (color: any) => {
    setSelectedColor(color);
  };
  const validateImages = async (urls: string[]) => {
    const validateImage = async (url: string) => {
      const defaultImage = "/assets/images/placeHolderImage.jpeg";
      try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");

        if (response.ok && contentType && contentType.startsWith("image/")) {
          return url;
        } else {
          return defaultImage;
        }
      } catch {
        return defaultImage;
      }
    };

    return await Promise.all(urls.map((url) => validateImage(url)));
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (selectedItem && selectedItem?.itemImagesURLs?.length > 0) {
        const imageUrls = selectedItem?.itemImagesURLs?.map(
          (item: any) => item.imageURL
        );
        const validatedImages = await validateImages(imageUrls);
        setImages(validatedImages);
      }
    };
    if (selectedItem) {
      fetchImages();
      setSelectedSize(selectedItem?.itemSizes[0]?.size ?? undefined);
      // itemColors
      setSelectedColor(selectedItem?.itemColors[0] ?? undefined);
    }
  }, [selectedItem]);

  return (
    <Grid container className="flex flex-col gap-1 items-center px-6 pb-10">
      <Grid container className="flex gap-5">
        {/* Image Grid */}
        <Grid item xs={12} md={5}>
          <Grid className="flex flex-col my-2">
            <ImageSlider images={images} />
          </Grid>
        </Grid>
        {/* Description Grid */}
        <Grid item xs={12} md={6} className="flex max-mui_md:justify-center">
          <Box className="block flex flex-col gap-4 w-full">
            {/* Heading */}
            <Box className="flex flex-col gap-1">
              <Typography className="font-Montserrat text-lg text-gray-300">
                {selectedItem?.brand}
              </Typography>
              <Typography className="font-Montserrat text-3xl font-bold text-gray-300">
                {selectedItem?.name}
              </Typography>
            </Box>
            {/* Description */}
            <Box className="flex flex-col gap-4">
              <Typography variant="body2" className="text-xs text-gray-300">
                {selectedItem?.description}
              </Typography>
            </Box>
            {/* Functions + Price */}
            <Box className="flex flex-col gap-2 text-gray-300">
              <Typography variant="h6" className="font-bold uppercase">
                {selectedItem?.price + " " + selectedItem?.currency}
              </Typography>
              {/* Buttons */}
              <Box className="flex gap-2">
                <Button
                  variant="contained"
                  className="px-2 py-1 bg-primaryDark w-full"
                  onClick={handleOpen}
                >
                  <Typography className="text-white font-bold">
                    TRY ON!
                  </Typography>
                </Button>
                <Button variant="outlined" className="ml-2 px-2 py-1">
                  <Typography className="font-bold">♡</Typography>
                </Button>
              </Box>
              {/* Sizes */}
              {selectedItem?.itemSizes?.length > 0 ? (
                <Grid item className="flex gap-4 my-2">
                  {selectedItem?.itemSizes?.map((size: any) => (
                    <Button
                      className={`${
                        selectedSize === size?.size
                          ? "bg-primaryDark text-white"
                          : "bg-gray-200 text-black"
                      } py-2 px-3 rounded-md`}
                      onClick={() => handleSelectedSize(size?.size)}
                    >
                      <Typography className="text-sm">{size?.size}</Typography>
                    </Button>
                  ))}
                </Grid>
              ) : null}
              {/* Colors */}
              <Grid container spacing={1}>
                {selectedItem?.itemColors?.map((color: any) => (
                  <Grid item key={color?.colorHex}>
                    <div
                      style={{ backgroundColor: color?.colorHex }}
                      className={`w-8 h-8 border border-solid cursor-pointer ${
                        selectedColor?.colorHex === color?.colorHex
                          ? "border-primaryDark"
                          : "border-black"
                      } border-[1px]`}
                      onClick={() => {
                        handleSelectedColor(color);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CameraPopUp
        open={open}
        selectedColor={selectedColor}
        productImage={images[0]}
        onClose={handleClose}
        handleSelectedColor={handleSelectedColor}
      />
    </Grid>
  );
};

export default ItemDescription;
