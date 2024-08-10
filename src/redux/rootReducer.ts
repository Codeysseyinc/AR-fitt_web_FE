// rootReducer.ts
import { combineReducers } from "redux";
import signupReducer from "./signup/SignupReducer";
import mainReducer from "./main/mainReducer";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  main: mainReducer,
  signup: signupReducer,
});

export default rootReducer;
