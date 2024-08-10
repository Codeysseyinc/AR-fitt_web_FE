import { Reducer } from "redux";
import MainActionTypes from "./mainActionTypes";

type MainAction = {
  type: string;
  payload?: any;
};

interface MainState {
  selectedCategory: any;
  selectedItem: any;
}

const INITIAL_STATE: MainState = {
  selectedCategory: {},
  selectedItem: {},
};

const mainReducer: Reducer<MainState, MainAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case MainActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case MainActionTypes.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
