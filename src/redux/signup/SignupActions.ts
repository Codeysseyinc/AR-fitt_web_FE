// TODO: Refactor types in this file to remove usage of 'any' and provide explicit type definitions
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import CONSTANTS from '../../utils/constants/CONSTANTS';
import URLS from '../../utils/constants/URLS';
import SignupActionTypes from './SignupActionTypes';

// * ============== Redux Reducer Action Triggers =================
export const registerUserStart = () => ({
  type: SignupActionTypes.REGISTER_USER_START,
});
export const initializeSignUpState = () => ({
  type: SignupActionTypes.INITIALIZE_SIGNUP_STATE,
});
export const registerUserSuccess = (user: any) => ({
  type: SignupActionTypes.REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserFailure = (error: string | any) => ({
  type: SignupActionTypes.REGISTER_USER_FAILURE,
  payload: error,
});
export const changePasswordStart = () => ({
  type: SignupActionTypes.CHANGE_PASSWORD_START,
});
export const changePasswordSuccess = (user: any) => ({
  type: SignupActionTypes.CHANGE_PASSWORD_SUCCESS,
  payload: user,
});
export const changePasswordFailure = (error: string | any) => ({
  type: SignupActionTypes.CHANGE_PASSWORD_FAILURE,
  payload: error,
});
export const forgotPasswordStart = () => ({
  type: SignupActionTypes.FORGOT_PASSWORD_START,
});
export const forgotPasswordSuccess = (user: any) => ({
  type: SignupActionTypes.FORGOT_PASSWORD_SUCCESS,
  payload: user,
});
export const forgotPasswordFailure = (error: string | any) => ({
  type: SignupActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: error,
});
export const setIsSigningUp = (flag: boolean) => ({
  type: SignupActionTypes.SET_IS_SIGNING_UP,
  payload: flag,
});
export const fetchUserStart = () => ({
  type: SignupActionTypes.FETCH_USER_START,
});
export const fetchUserSuccess = (user: any) => ({
  type: SignupActionTypes.FETCH_USER_SUCCESS,
  payload: user,
});
export const fetchUserFailure = (error: string | any) => ({
  type: SignupActionTypes.FETCH_USER_FAILURE,
  payload: error,
});
export const setUserDetails = (user: any) => ({
  type: SignupActionTypes.SET_USER_DETAILS,
  payload: user,
});
export const setUserEmail = (email: string) => ({
  type: SignupActionTypes.SET_USER_EMAIL,
  payload: email
})
export const setCurrentForm = (form: string) => ({
  type: SignupActionTypes.SET_CURRENT_FORM,
  payload: form,
});
export const setErrorMsg = (error: string | any) => ({
  type: SignupActionTypes.SET_ERROR_MESSAGE,
  payload: error,
});
export const verifyEmailStart = () => ({
  type: SignupActionTypes.VERIFY_EMAIL_START,
});
export const verifyEmailSuccess = () => ({
  type: SignupActionTypes.VERIFY_EMAIL_SUCCESS,
});
export const verifyEmailFailure = (errorMessage: string) => ({
  type: SignupActionTypes.VERIFY_EMAIL_FAILURE,
  payload: errorMessage,
});

// * ============== API Calls =================
export const registerUserStartAsync = (account: any, setErrorMessage: Dispatch<SetStateAction<string | null>> | any) => {
  return (dispatch: Dispatch<any>) => {
    setErrorMessage(null);
    dispatch(registerUserStart());

    axios
      .post(URLS.registerUser, account)
      .then((response) => {
        dispatch(registerUserSuccess(response.data));
        dispatch(setUserDetails({ date_of_birth: account.date_of_birth }));
        dispatch(setUserEmail(account.email));
        dispatch(setCurrentForm(CONSTANTS.SIGN_UP_OTP_VERIFICATION));
      })
      .catch((error: string | any) => {
        const errorMessage = error?.response?.data ? Object.values(error.response.data) : null;
        setErrorMessage(errorMessage || 'Signup Failed. ');
        dispatch(registerUserFailure(error.message));
      });
  };
};
