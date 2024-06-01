import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import ContentArea from "../../components/contentArea";
import AssetSection from "../../components/assetSection";
import SubscriptionCard from "../../components/subscriptionCard";
import { setCurrentForm } from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { loadStripe } from "@stripe/stripe-js";

const SubscriptionPlans = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
  });

  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/subscriptionPlansBg.png"
        modelsSrc="/assets/images/signUp/subscriptionPlansModels.png"
      />
      <ContentArea title="Subscription Plans">
        <Grid
          direction="row"
          className="w-[100%] h-[60%] flex justify-center mt-6"
        >
          {/* One Time */}
          <SubscriptionCard
            title="One Time"
            color="pink"
            icon="./assets/images/signUp/subscriptionPlan1.png"
            price="1"
          />
          {/* Monthly */}

          <SubscriptionCard
            title="Monthly"
            color="purple"
            icon="./assets/images/signUp/subscriptionPlan2.png"
            price="5"
          />
          {/* Yearly */}

          <SubscriptionCard
            title="Yearly"
            color="primaryLight"
            icon="./assets/images/signUp/subscriptionPlan3.png"
            price="50"
          />
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default SubscriptionPlans;
