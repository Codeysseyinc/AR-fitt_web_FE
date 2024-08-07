import MainActionTypes from "./mainActionTypes";

export const setSelectedCategory = (value: any) => ({
  type: MainActionTypes.SET_SELECTED_CATEGORY,
  payload: value,
});
export const setSelectedItem = (value: any) => ({
  type: MainActionTypes.SET_SELECTED_ITEM,
  payload: value,
});
