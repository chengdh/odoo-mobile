import { Container, Content } from "native-base";
import React, { Component } from "react";
import {
  Platform,
  ImageBackground,
  StatusBar,
  StyleSheet,
  WebView,
  BackHandler
} from "react-native";
import { connect } from "react-redux";

class Home extends Component {
  onNavigationStateChange = navState => {
    let domain = "http://" + this.props.domain_name + "/web";
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
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }
  backHandler = () => {
    this._webView.goBack();
    return true;
  }

}

const styles = StyleSheet.create({});
const mapStateToProps = state => {
  return {
    domain_name: state.auth_reducer.domain_name,
    url: "http://" + state.auth_reducer.domain_name + "/web#home"
  };
};

Home = connect(mapStateToProps)(Home);
export default Home;