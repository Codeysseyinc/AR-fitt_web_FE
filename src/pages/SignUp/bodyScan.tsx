import { useEffect } from "react";
import { Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import SignUpCamera from "../../components/signUpCamera";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { setCurrentForm } from "../../redux/signup/SignupActions";
import { useDispatch, useSelector } from "react-redux";

const BodyScan: React.FC = () => {
  const dispatch = useDispatch();
  const isSubscribed = useSelector((state: any) => state.signup.isSubscribed);

  useEffect(() => {
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SCANNING));
    // if (!isSubscribed) dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
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
