import { useEffect } from "react";
import { Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import SignUpCamera from "../../components/signUpCamera";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const BodyScan: React.FC = () => {

  useEffect(() => {
    localStorage.setItem("currentForm", CONSTANTS.SIGN_UP_SCANNING);
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
        backgroundSrc="/assets/images/signUp/scanningBg.png"
        modelsSrc="/assets/images/signUp/scanningModels.png"
      />
      <ContentArea title="Scanning">
        <Grid direction="row" className="w-[100%] h-[67%] mt-6">
          <SignUpCamera />
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default BodyScan;
