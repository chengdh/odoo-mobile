import { SubmissionError } from "redux-form";

export function checkServer(server_url, nav) {
  return dispatch => {
    const url = "http://" + server_url + "/web/webclient/version_info";
    const id = Math.floor(Math.random() * 1000) + 1;

    const err = new SubmissionError({
      server_url: "请检查ERP服务器地址是否正确!",
      _error: "请检查ERP服务器地址是否正确!"
    });

    if (server_url != "") {
      dispatch({ type: "CHECKING_DOMAIN_NAME" });
      return fetch(url, {
        credentials: 'include',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: {
            context: {}
          },
          id: id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            dispatch({ type: "STOP_CHECKING" });
            throw err;
          }
          dispatch(setDomain(server_url));
          nav.navigate("Login_Page", {
            domainName: server_url
          });
        })
        .catch(error => {
          dispatch({ type: "STOP_CHECKING" });
          throw err;
        });
    } else {
      dispatch({ type: "STOP_CHECKING" });
      throw err;
    }
  };
}
export function setDomain(domain_name) {
  return {
    type: "SET_DOMAIN_NAME",
    domain_name: domain_name
  };
}