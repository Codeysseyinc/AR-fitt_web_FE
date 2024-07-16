/* eslint-disable @typescript-eslint/no-redeclare */
import { Button, Grid } from "@mui/material";
import CONSTANTS from "../utils/constants/CONSTANTS";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentForm, setErrorMsg } from "../redux/signup/SignupActions";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const email = userDetails.email;
  const navigate = useNavigate();

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
    // /payment/createSubscription
    const resp = axios({
      // Endpoint
      url: `${process.env.REACT_APP_BASE_URL}/payment/createSubscription`,
      method: "POST",
      headers: {
        // Add any auth token here
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        userEmail: email,
        priceID: getPriceId(),
      },
    })
      // Handle the response from backend here
      .then((res) => {
        console.log("redirecting to payment", res);
        // set the page that will come after payment
        handleNextPage(CONSTANTS.SIGN_UP_SUCCESS);
        window.location.href = res.data.message.checkout_session_url;
      })

      // Catch errors if any
      .catch((err: any) => {
        console.log("payment error", err);
        if (err?.response.data.message === "Unauthorized access") navigate("/");

        dispatch(setErrorMsg(err?.response.data.message));
      });
  };
  return (
    <Grid
      direction="column"
      className="shadow-xl xs:h-[120px] xs:w-[180px] md:h-[330px] md:w-[180px] ml-4 xs:mb-4 md:mb-0 rounded-[15px] flex justify-start align-center"
    >
      <Grid
        className={`${
          (colorVariants as any)[color]
        } xs:h-[50px] md:h-[50px] w-[100%] rounded-t-[15px] text-white font-Montserrat font-bold flex justify-center items-center `}
      >
        {title}
      </Grid>
      <Grid item className="xs:hidden md:flex justify-center h-[37%]">
        {" "}
        <img src={icon} className="scale-[55%]" />
      </Grid>
      <p className="xs:hidden md:flex  justify-center m-0 font-Montserrat text-[#747474]">
        From
      </p>
      <Grid
        direction="row"
        className={`${
          (colorTextVariants as any)[color]
        } m-0  font-Montserrat flex justify-center items-center`}
      >
        <p className="font-normal m-0 xs:text-4xl md:text-6xl flex">
          {" "}
          £{price}
        </p>

        <p className="flex self-end">{getUnitPrice(title)}</p>
      </Grid>
      <Button
        className={`${
          (colorVariants as any)[color]
        } text-contrastText drop-shadow-lg w-[90%] xs:h-[30px] md:h-[15%]`}
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
