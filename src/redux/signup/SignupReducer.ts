import { Reducer } from "redux";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import SignupActionTypes from "./SignupActionTypes";

type SignupAction = {
  type: string;
  payload?: any;
};

interface SignupState {
  isSigningUp: boolean;
  errorMessage: string | null;
  currentUser: any;
  userDetails: any;
  currentForm: string;
  isFetching: boolean;
  forgotPassword: boolean;
  isSendingEmail: boolean;
  changePassword: boolean;
  isChangingPassword: boolean;
  isVerified: boolean;
  isFaceScanned: boolean;
  isBodyScanned: boolean;
  isSubscribed: boolean;
  guestDetails: any;
  interestCategories: Array<string>;
  test: string;
}

const INITIAL_STATE: SignupState = {
  isSigningUp: false,
  errorMessage: null,
  currentUser: null,
  userDetails: {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    gender: "",
  },
  currentForm: CONSTANTS.SIGN_UP_BASIC_INFO,
  isFetching: false,
  forgotPassword: false,
  isSendingEmail: false,
  changePassword: false,
  isChangingPassword: false,
  isVerified: false,
  isFaceScanned: false,
  isBodyScanned: false,
  isSubscribed: false,
  guestDetails: {
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
  },
  test: "",
  interestCategories: [],
};

const signupReducer: Reducer<SignupState, SignupAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case SignupActionTypes.DUMMY_TEST:
      return {
        ...state,
        test: "For Refrence",
      };
    case SignupActionTypes.REGISTER_USER_START:
      return {
        ...state,
        isSigningUp: true,
        errorMessage: null,
      };
    case SignupActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        errorMessage: null,
        currentUser: action.payload,
      };
    case SignupActionTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.FORGOT_PASSWORD_START:
      return {
        ...state,
        isSendingEmail: true,
        errorMessage: null,
      };
    case SignupActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSendingEmail: false,
        errorMessage: null,
        forgotPassword: action.payload,
      };
    case SignupActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isSendingEmail: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.CHANGE_PASSWORD_START:
      return {
        ...state,
        isChangingPassword: true,
        errorMessage: null,
      };
    case SignupActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangingPassword: false,
        errorMessage: null,
        changePassword: action.payload,
      };
    case SignupActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isChangingPassword: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.FETCH_USER_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case SignupActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        currentUser: action.payload,
      };
    case SignupActionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case SignupActionTypes.SET_IS_SIGNING_UP:
      return {
        ...state,
        isSigningUp: action.payload,
      };
    case SignupActionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SignupActionTypes.SET_CURRENT_FORM:
      return {
        ...state,
        currentForm: action.payload,
      };
    case SignupActionTypes.INITIALIZE_SIGNUP_STATE:
      return {
        ...INITIAL_STATE,
      };
    case SignupActionTypes.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isVerified: true,
      };
    case SignupActionTypes.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        isVerified: false,
      };
    case SignupActionTypes.SUBSCRIBED_SUCCESS:
      return {
        ...state,
        isSubscribed: true,
      };
    case SignupActionTypes.SUBSCRIBED_FAILURE:
      return {
        ...state,
        isSubscribed: false,
      };
    case SignupActionTypes.FACE_SCANNED_SUCCESS:
      return {
        ...state,
        isFaceScanned: true,
      };
    case SignupActionTypes.FACE_SCANNED_FAILURE:
      return {
        ...state,
        isFaceScanned: false,
      };
    case SignupActionTypes.BODY_SCANNED_SUCCESS:
      return {
        ...state,
        isBodyScanned: true,
      };
    case SignupActionTypes.BODY_SCANNED_FAILURE:
      return {
        ...state,
        isBodyScanned: false,
      };
    case SignupActionTypes.SET_GUEST_DETAILS:
      return {
        ...state,
        guestDetails: action.payload,
      };
    case SignupActionTypes.SET_INTEREST_CATEGORIES:
      return {
        ...state,
        interestCategories: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
