import { Button, Grid, Link, TextField } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import { useARfittContext } from "../../context/storeContext";
import SubscriptionCard from "../../components/subscriptionCard";
import SignUpCamera from "../../components/signUpCamera";

interface BodyScan {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}

const BodyScan: React.FC<BodyScan> = ({ setCurrentForm }) => {
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
        backgroundSrc="/assets/images/signUp/scanningBg.png"
        modelsSrc="/assets/images/signUp/scanningModels.png"
      />
      <ContentArea title="Scanning" setCurrentForm={setCurrentForm}>
        <Grid direction="row" className="w-[100%] h-[60%] mt-6">
          <SignUpCamera />
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default BodyScan;
