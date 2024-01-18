import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import userReducer from "./userReducer";

export default combineReducers({
  AuthReducer: AuthReducer,
  userReducer: userReducer,
});
