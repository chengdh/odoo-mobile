export function webViewNavStateChange(navState) {
  return {
    type: "WEB_VIEW_NAV_STATE_CHANGE",
    nav_state: navState 
  };
}