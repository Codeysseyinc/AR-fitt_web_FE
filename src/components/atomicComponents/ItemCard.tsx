/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setSelectedItem } from "../../redux/main/mainActions";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import dashboardService from "../../services/dashboard.service";

interface ItemCardProps {
  item: any;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState(null);

  const { refetch: getItemImage } = useQuery(
    "getItemImage",
    async () =>
      dashboardService.getItemImage(
        item.id,
        item?.itemImagesURLs[0]?.id,
        dispatch
      ),
    {
      enabled: false,
      onSuccess: (response) => {
        if (response?.data) {
          console.log("XXX => Get Item Image Response => ", response?.data);
          setImageData(response?.data);
        }
      },
    }
  );
  const getRenderableImage = (imageData: any) => {
    let imageSrc = "";
    if (!imageData) {
      imageSrc = "/assets/images/placeHolderImage.jpeg";
    }
    if (typeof imageData === "string" && imageData.startsWith("data:image")) {
      imageSrc = imageData;
    } else if (imageData instanceof Blob) {
      const objectURL = URL.createObjectURL(imageData);
      imageSrc = objectURL;
    } else {
      console.warn("Unexpected image data format:", imageData);
      imageSrc = "/assets/images/placeHolderImage.jpeg";
    }
    console.log("XXXX The Image to be rendered is: ", imageSrc);
    return imageSrc;
  };
  const handleItemClick = () => {
    dispatch(setSelectedItem(item));
    navigate(`/home/item?itemId=${item.id}`);
  };

  useEffect(() => {
    getItemImage();
  }, []);

  return (
    <Grid
      item
      onClick={handleItemClick}
      className="flex flex-col w-full h-full border-solid border-2 border-gray-200 rounded-[20px] overflow-hidden cursor-pointer"
    >
      <img
        className="w-full min-h-[70%] object-cover"
        src={getRenderableImage(imageData)}
        alt="placeholder"
      />
      {/* {RenderImage()} */}
      {/* <div className="w-full min-h-[70%] object-cover" /> */}
      {/* Item Main Desc */}
      <Box className="flex w-full p-4 justify-start items-center">
        <Grid
          className="flex gap-2 items-end justify-between"
          style={{ width: "calc(100% - 32px)" }}
        >
          {/* Text */}
          <Grid xs={5.5} className="flex flex-col gap-1 items-start">
            <p className="m-0 font-Montserrat text-sm">{item?.brand}</p>
            <p className="m-0 font-Montserrat text-xs">{item?.name}</p>
            <p className="m-0 font-Montserrat text-xs">${item?.price}</p>
          </Grid>
          {/* Try On Button */}
          <Grid
            xs={5.5}
            className="px-2 py-4 w-[35%] min-h-4 bg-primary rounded-md gap-3 flex items-center justify-center"
          >
            <img
              className="w-4"
              src="/assets/icons/png/camera.png"
              alt="camera"
            />
            <p className="m-0 font-Montserrat font-bold text-sm text-white text-center p-0 leading-[1]">
              TRY ON
            </p>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ItemCard;
