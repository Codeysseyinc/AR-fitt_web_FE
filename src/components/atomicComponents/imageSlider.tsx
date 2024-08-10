import React, { useState } from "react";
import { Box } from "@mui/material";

const ImageSlider = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index: any) => {
    setCurrentIndex(index);
  };

  return (
    <Box
      sx={{ maxWidth: "100%", position: "relative" }}
      className="flex flex-col gap-4"
    >
      <Box className="w-full h-[400px] overflow-hidden rounded-xl">
        {images.map((image: any, index: any) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              height: "100%",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>
      {/* Thumb Nails */}
      <Box className="flex justify-center">
        {images.map((image: any, index: any) => (
          <Box
            key={index}
            sx={{
              width: "60px",
              height: "60px",
              margin: "5px",
              borderRadius: "5px",
              overflow: "hidden",
              cursor: "pointer",
              border:
                currentIndex === index ? "2px solid #007bff" : "1px solid #ddd",
            }}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
