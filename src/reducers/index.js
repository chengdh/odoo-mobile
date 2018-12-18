import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "../pages/authentication/reducers";
import LoginReducer from "../pages/login/reducers";
import HomeReducer from "../pages/home/reducers";

export default combineReducers({
  home_reducer: HomeReducer,
  form: formReducer,
  auth_reducer: AuthReducer,
  login_reducer: LoginReducer
});
