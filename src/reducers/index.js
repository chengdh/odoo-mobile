import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "../pages/authentication/reducers";

export default combineReducers({
  form: formReducer,
  auth_reducer: AuthReducer
});
