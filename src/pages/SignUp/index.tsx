import React, { useEffect, useState } from "react";
import CONSTANTS from "../../utils/constants";
import BasicInformation from "./basicInformation";
import OtpVerification from "./otpVerification";
import SubscriptionPlans from "./subscriptionPlans";
import BodyScan from "./bodyScan";

const SignUp = () => {
  const [currentForm, setCurrentForm] = useState(
    localStorage.getItem("currentForm") ?? CONSTANTS.SIGN_UP_BASIC_INFO
  );

  return (
    <>
      {currentForm === CONSTANTS.SIGN_UP_BASIC_INFO ? (
        <BasicInformation setCurrentForm={setCurrentForm} />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_OTP_VERIFICATION ? (
        <OtpVerification setCurrentForm={setCurrentForm} />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_SUBSCRIPTION ? (
        <SubscriptionPlans setCurrentForm={setCurrentForm} />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_SCANNING ? (
        <BodyScan setCurrentForm={setCurrentForm} />
      ) : (
        ""
      )}
    </>
  );
};
export default SignUp;
