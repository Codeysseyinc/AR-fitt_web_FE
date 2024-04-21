import { Button, Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import { useARfittContext } from "../../context/storeContext";
import SubscriptionCard from "../../components/subscriptionCard";

interface SubscriptionPlans {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}

const SubscriptionPlans: React.FC<SubscriptionPlans> = ({ setCurrentForm }) => {
  const { email, setEmail } = useARfittContext();

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
      <ContentArea title="Subscription Plans" setCurrentForm={setCurrentForm}>
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
            setCurrentForm={setCurrentForm}
          />
          {/* Monthly */}

          <SubscriptionCard
            title="Monthly"
            color="purple"
            icon="./assets/images/signUp/subscriptionPlan2.png"
            price="5"
            setCurrentForm={setCurrentForm}
          />
          {/* Yearly */}

          <SubscriptionCard
            title="Yearly"
            color="primaryLight"
            icon="./assets/images/signUp/subscriptionPlan3.png"
            price="50"
            setCurrentForm={setCurrentForm}
          />
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default SubscriptionPlans;
