import { Button, Grid } from "@mui/material";
import "./index.css";
import { useState } from "react";
import CONSTANTS from "../utils/constants";
interface SubscriptionCard {
  title: string;
  color: string;
  icon: string;
  price: string;
  setCurrentForm: any;
}
const SubscriptionCard: React.FC<SubscriptionCard> = ({
  color,
  icon,
  title,
  price,
  setCurrentForm,
}) => {
  const colorVariants = {
    pink: " bg-pink",
    purple: "bg-purple",
    primaryLight: "bg-primaryLight",
  };
  const colorTextVariants = {
    pink: " text-pink",
    purple: "text-purple",
    primaryLight: "text-primaryLight",
  };
  function getUnitPrice(title: string) {
    if (title === "One Time") return "/Session";
    else if (title === "Monthly") return "/Month";
    else if (title === "Yearly") return "/Year";
  }
  return (
    <Grid
      direction="column"
      className="shadow-xl h-[100%] w-[29%] ml-4 rounded-[15px] flex justify-start align-center"
    >
      <Grid
        className={`${
          (colorVariants as any)[color]
        } h-[15%] w-[100%] rounded-t-[15px] text-white font-Montserrat flex justify-center `}
      >
        <h4>{title}</h4>
      </Grid>
      <Grid item className="flex justify-center h-[37%]">
        {" "}
        <img src={icon} className="scale-[55%]" />
      </Grid>
      <p className="flex justify-center m-0 font-Montserrat text-[#747474]">
        From
      </p>
      <Grid
        direction="row"
        className={`${
          (colorTextVariants as any)[color]
        } m-0  font-Montserrat flex justify-center`}
      >
        <p className="font-normal m-0 text-6xl flex"> £{price}</p>

        <p className="flex self-end">{getUnitPrice(title)}</p>
      </Grid>
      <Button
        className={`${
          (colorVariants as any)[color]
        } text-contrastText drop-shadow-lg w-[90%] h-[15%]`}
        variant="contained"
        style={{
          fontFamily: "Montserrat",
          margin: "5%",
          borderRadius: "10px",
        }}
        onClick={() => {
          setCurrentForm(CONSTANTS.SIGN_UP_SCANNING);
        }}
      >
        Subscribe
      </Button>{" "}
    </Grid>
  );
};

export default SubscriptionCard;
