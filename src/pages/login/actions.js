import { SubmissionError } from "redux-form";
import { START_LOGIN, SET_LOGIN, STOP_LOGIN } from "./action_constants";

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}
export const login = (username, password, db, nav) => {
  return (dispatch, getState) => {
    const domainName = getState().auth_reducer.domain_name;
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const url = "http://" + domainName + "/web/session/authenticate";
    const err = new SubmissionError({
      username: "登录失败,请检查用户名或密码!",
      _error: "登录失败,请检查用户名或密码!"
    });
    dispatch({
      type: START_LOGIN
    });

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
          db: db,
          login: username,
          password: password,
          context: {}
        },
        id: randomId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson)
        if (responseJson.error) {
          dispatch({ type: STOP_LOGIN });
          throw err;
        }
        dispatch({
          type: SET_LOGIN,
          db: db,
          session_id: responseJson.result.session_id,
          username: username,
          password: password
        });
        nav.navigate("Home_Page");
      })
      .catch(error => {
        dispatch({ type: STOP_LOGIN });
        throw err;
      });
  };
};
