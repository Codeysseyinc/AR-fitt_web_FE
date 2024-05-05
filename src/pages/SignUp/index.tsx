/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicInformation from "./basicInformation";
import OtpVerification from "./otpVerification";
import SubscriptionPlans from "./subscriptionPlans";
import BodyScan from "./bodyScan";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const SignUp = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state: any) => state.signup.currentForm);

  useEffect(() => {
    dispatch(initializeSignUpState());
  }, []);

  return (
    <>
      {currentForm === CONSTANTS.SIGN_UP_BASIC_INFO ? (
        <BasicInformation />
      ) : (
        ""
      )}
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
      {currentForm === CONSTANTS.SIGN_UP_SCANNING ? (
        <BodyScan />
      ) : (
        ""
      )}
    </>
  );
};
export default SignUp;
