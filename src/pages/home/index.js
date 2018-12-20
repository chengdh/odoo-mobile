import { Container, Content } from "native-base";
import React, { Component } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  WebView,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import { webViewNavStateChange} from "./actions";
import { logout} from "../login/actions";

class Home extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  onNavigationStateChange = (navState) => {
    let domain = "http://" + this.props.domain_name + "/web";
    const onStateChange = this.props.onWebViewNavStateChange;
    onStateChange(navState);

    if (navState.url.indexOf("logout") > -1) {
      this.backToLogin();
      this.setState({ url: "about:blank" });
    } else if (navState.url == (domain + "/login#home")) {
      navState.url = domain + "#home";
    }
  };

  backToLogin = () => {
    this.props.logout();
    this.props.navigation.navigate("Authentication_Page", {});
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <WebView
          source={{ uri: this.props.url }}
          ref={(c) => this._webView = c}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState={true}
          style={{
            marginTop: Platform.OS === "ios" ? 20 : 0
          }}
        />
      </Container>
    );
  }

  onBackButtonPressAndroid = () => {
    if (this.props.webview_state.url == this.props.url) {
      return false;
    }
    else {
      this._webView.goBack();
      return true;
    }
  }
}

const styles = StyleSheet.create({});
const mapStateToProps = state => {
  return {
    webview_state: state.home_reducer.nav_state,
    domain_name: state.auth_reducer.domain_name,
    url: "http://" + state.auth_reducer.domain_name + "/web#home"
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onWebViewNavStateChange: (navState) => {
      dispatch(webViewNavStateChange(navState))
    },
    logout: () => {
      dispatch(logout());
    }
  }
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;