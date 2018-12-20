export default (HomeReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case "WEB_VIEW_NAV_STATE_CHANGE":
      return {nav_state: action.nav_state};
    default:
      return state;
  }
});
