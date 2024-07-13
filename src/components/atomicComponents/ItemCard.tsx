import React from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  brandName: string;
  productName: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ brandName, productName }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate("/home/item");
  };
  return (
    <Grid
      item
      onClick={handleItemClick}
      className="flex flex-col w-[32%] h-[300px] border-solid border-2 border-gray-200 rounded-[20px] overflow-hidden cursor-pointer"
    >
      {/* <img className="w-full min-h-[75%] object-cover" src='assets/images/placeHolderImage.jpeg' alt='placeholder' /> */}
      <div className="w-full min-h-[70%] object-cover" />
      {/* Item Main Desc */}
      <Box className="flex w-full p-4 justify-start items-center">
        <Box
          className="flex gap-2 items-end justify-between"
          style={{ width: "calc(100% - 32px)" }}
        >
          {/* Text */}
          <Box className="flex flex-col gap-1 items-start">
            <p className="m-0 font-Montserrat text-sm">{brandName}</p>
            <p className="m-0 font-Montserrat font-bold text-md">
              {productName}
            </p>
          </Box>
          {/* Try On Button */}
          <Box className="p-2 w-[35%] h-4 bg-primary rounded-md flex gap-3 items-center">
            <img
              className="w-4"
              src="assets/icons/png/camera.png"
              alt="camera"
            />
            <p className="m-0 font-Montserrat font-bold text-sm text-white">
              TRY ON
            </p>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ItemCard;
