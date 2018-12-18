import { Container, Content } from "native-base";
import React, { Component } from "react";
import {
  Platform,
  ImageBackground,
  StatusBar,
  StyleSheet,
  WebView,
  BackAndroid,
  ToastAndroid,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { webViewNavStateChange } from "./actions";

class Home extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackAndroid.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  onNavigationStateChange = navState => {
    let domain = "http://" + this.props.domain_name + "/web";
    const onStateChange = this.props.onWebViewNavStateChange;
    onStateChange(navState);

    ToastAndroid.show('onNavigationStateChange !', ToastAndroid.SHORT);
    if (navState.url.indexOf("logout") > -1) {
      this.backToLogin();
      this.setState({ url: "about:blank" });
    } else if (navState.url == domain + "/login#home") {
      navState.url = domain + "#home";
    }
  };

  backToLogin() {
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
    ToastAndroid.show(' call backHandler!', ToastAndroid.LONG);
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
    webview_state: state.home_reducer,
    domain_name: state.auth_reducer.domain_name,
    url: "http://" + state.auth_reducer.domain_name + "/web#home"
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onWebViewNavStateChange: (navState) => {
      dispatch(webViewNavStateChange(navState))
    }
  }
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;