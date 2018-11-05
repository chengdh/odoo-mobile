export default (AuthReducer = (
  state = { domain_name: "192.168.104.199:8070", is_checking: false },
  action
) => {
  switch (action.type) {
    case "CHECKING_DOMAIN_NAME":
      return { domain_name: "", is_checking: true };
    case "SET_DOMAIN_NAME":
      return { domain_name: action.domain_name, is_checking: false };
    case "STOP_CHECKING":
      return { is_checking: false };
    default:
      return state;
  }
});
