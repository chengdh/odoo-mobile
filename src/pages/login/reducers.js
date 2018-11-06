import { START_LOGIN, SET_LOGIN, STOP_LOGIN } from "./action_constants";
const LoginReducer = (
  state = {
    domain_name: "192.168.104.199:8070",
    username: "admin",
    password: "admin",
    is_loading: false
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
        is_loading: false
      };
    case STOP_LOGIN:
      return { is_loading: false };
    default:
      return state;
  }
};
export default LoginReducer;