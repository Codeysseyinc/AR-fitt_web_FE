/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BasicInformation from "./basicInformation";
import OtpVerification from "./otpVerification";
import SubscriptionPlans from "./subscriptionPlans";
import BodyScan from "./bodyScan";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const SignUp = () => {
  const dispatch = useDispatch();
  let currentForm = useSelector((state: any) => state.signup.currentForm);
  console.log("current form", currentForm);
  console.log(
    "email",
    useSelector((state: any) => state.signup.userDetails.email)
  );
  useEffect(() => {
    currentForm = currentForm || dispatch(initializeSignUpState());
    console.log("sign up mounting", currentForm);
  }, []);

  return (
    <>
      {currentForm === CONSTANTS.SIGN_UP_BASIC_INFO ? <BasicInformation /> : ""}
      {currentForm === CONSTANTS.SIGN_UP_OTP_VERIFICATION ? (
        <OtpVerification />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_SUBSCRIPTION ? (
        <SubscriptionPlans />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_SCANNING ? <BodyScan /> : ""}
    </>
  );
};
export default SignUp;
