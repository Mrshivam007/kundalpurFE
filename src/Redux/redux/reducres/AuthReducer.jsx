/* eslint-disable import/no-anonymous-default-export */
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  LOADING,
  USER_ALLDONATION,
} from "../constants/action";

const initialState = {
  user: [],
  loading: false,
  alldonation: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case AUTH_LOGIN:
      return {
        ...state,
      };
    case AUTH_SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ALLDONATION:
      return {
        ...state,
        alldonation: action.payload,
      };
    default:
      return state;
  }
}
