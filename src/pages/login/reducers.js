import { START_LOGIN, SET_LOGIN, STOP_LOGIN, LOGOUT } from "./action_constants";
const LoginReducer = (
  state = {
    domain_name: "kairuiwuliu.com:8070",
    is_loading: false,
    is_logged: false
  },
  action
) => {
  switch (action.type) {
    case START_LOGIN:
      return { is_loading: true };
    case SET_LOGIN:
      return {
        session_id: action.session_id,
        username: action.username,
        password: action.password,
        db: action.db,
        is_loading: false,
        is_logged: true
      };
    case STOP_LOGIN:
      return { is_loading: false };
    case LOGOUT:
      return {
        is_logged: false,
        is_loading: false
      };
    default:
      return state;
  }
};
export default LoginReducer;