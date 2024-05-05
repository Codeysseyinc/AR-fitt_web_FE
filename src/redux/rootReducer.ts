// rootReducer.ts
import { combineReducers } from 'redux';
import signupReducer from './signup/SignupReducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  signup: signupReducer,
});

export default rootReducer;
