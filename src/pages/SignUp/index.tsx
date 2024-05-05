import { useEffect, useState } from "react";
import BasicInformation from "./basicInformation";
import OtpVerification from "./otpVerification";
import SubscriptionPlans from "./subscriptionPlans";
import BodyScan from "./bodyScan";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { initializeSignUpState } from "../../redux/signup/SignupActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const [currentForm, setCurrentForm] = useState(
    localStorage.getItem("currentForm") ?? CONSTANTS.SIGN_UP_BASIC_INFO
  );
  useEffect(() => {
    dispatch(initializeSignUpState());
  }, []);
  const currentForm2 = useSelector((state: any) => state.signUp.currentForm);

  return (
    <>
      {currentForm2 === CONSTANTS.SIGN_UP_BASIC_INFO ? (
        <BasicInformation />
      ) : (
        ""
      )}
      {currentForm2 === CONSTANTS.SIGN_UP_OTP_VERIFICATION ? (
        <OtpVerification setCurrentForm={setCurrentForm} />
      ) : (
        ""
      )}
      {currentForm2 === CONSTANTS.SIGN_UP_SUBSCRIPTION ? (
        <SubscriptionPlans setCurrentForm={setCurrentForm} />
      ) : (
        ""
      )}
      {currentForm2 === CONSTANTS.SIGN_UP_SCANNING ? (
        <BodyScan setCurrentForm={setCurrentForm} />
      ) : (
        ""
      )}
    </>
  );
};
export default SignUp;
