import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { setCurrentForm, setErrorMsg } from "../../redux/signup/SignupActions";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SignupSuccess: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id") ?? "";
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const email = userDetails.email;
  function getSubscriptionStatus() {
    axios({
      // Endpoint
      url: `${process.env.REACT_APP_BASE_URL}/user/subscriptionStatus?email=${email}`,
      method: "GET",
      headers: {
        // Add any auth token here
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      // Handle the response from backend here
      .then((res) => {
        console.log("result", res.data.messageCode);
        if (res.data.messageCode === "user_not_subscribed" && session_id) {
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
          dispatch(setErrorMsg(res.data.message));
        }
      })
      // Catch errors if any
      .catch((err: any) => {
        dispatch(setErrorMsg(err?.response.data));
      });
  }
  useEffect(() => {
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUCCESS));
    dispatch(setErrorMsg(null));

    getSubscriptionStatus();
  }, [dispatch]);

  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/scanningBg.png"
        modelsSrc="/assets/images/signUp/scanningModels.png"
      />
      <ContentArea removeLogo>
        <Grid
          direction="row"
          className="w-[70%] h-[67%] mt-6 flex flex-col justify-start items-center  space-y-16"
        >
          <img className="" src="./assets/images/logo.png" />
          <Grid className="font-Montserrat font-bold text-center text-[#408589] max-w-xs ">
            <p className="text-3xl ">Success!</p>

            <p className="text-2xl">
              {" "}
              You have successfully created your account
            </p>
          </Grid>
        </Grid>
        <Button
          className="bg-primary text-contrastText font-bold"
          disableElevation={true}
          variant="contained"
          style={{
            width: "70%",
            fontFamily: "Montserrat",
            margin: "4%",
            borderRadius: "10px",
            height: "83px",
          }}
          onClick={() => {
            dispatch(setCurrentForm(CONSTANTS.SIGN_UP_CATEGORIES));
          }}
        >
          Continue
        </Button>
      </ContentArea>
    </Grid>
  );
};
export default SignupSuccess;
