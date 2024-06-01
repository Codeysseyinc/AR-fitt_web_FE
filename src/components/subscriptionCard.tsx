/* eslint-disable @typescript-eslint/no-redeclare */
import { Button, Grid } from "@mui/material";
import CONSTANTS from "../utils/constants/CONSTANTS";
import "./index.css";
import { useDispatch } from "react-redux";
import { setCurrentForm } from "../redux/signup/SignupActions";
import { loadStripe } from "@stripe/stripe-js";
interface SubscriptionCard {
  title: string;
  color: string;
  icon: string;
  price: string;
}

const SubscriptionCard: React.FC<SubscriptionCard> = ({
  color,
  icon,
  title,
  price,
}) => {
  const dispatch = useDispatch();
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

  const getUnitPrice = (title: string) => {
    if (title === "One Time") return "/Session";
    else if (title === "Monthly") return "/Month";
    else if (title === "Yearly") return "/Year";
  };
  const handleNextPage = (nextPage: string) => {
    dispatch(setCurrentForm(nextPage));
    return "http://localhost:3000/signup";
  };

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
  );
  const getPriceId = () => {
    if (title === "One Time")
      return process.env.REACT_APP_ONE_TIME_PLAN_PRICE_ID;
    else if (title === "Monthly")
      return process.env.REACT_APP_MONTHLY_PLAN_PRICE_ID;
    else if (title === "Yearly")
      return process.env.REACT_APP_YEARLY_PLAN_PRICE_ID;
  };
  const handleClick = async (event: any) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    if (stripe) {
      const temp = stripe.redirectToCheckout({
        lineItems: [
          {
            price: getPriceId() as string,
            quantity: 1,
          },
        ],
        mode: "subscription",
        successUrl: handleNextPage(CONSTANTS.SIGN_UP_SCANNING),
        cancelUrl: "https://example.com/cancel",
        clientReferenceId: "1999",
      });
    }
  };
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
        onClick={handleClick}
      >
        Subscribe
      </Button>{" "}
    </Grid>
  );
};

export default SubscriptionCard;
