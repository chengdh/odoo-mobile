import { Root } from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import getHomeStack from "./Router";

console.disableYellowBox = true;

class App extends Component {
  render() {
    const HomeStack = getHomeStack(this.props.is_logged);
    return (
      <Root>
        <HomeStack />
      </Root>
    );
  }
}
const mapStateToProps = state => {
    return {
        is_logged: state.login_reducer.is_logged
    };
};

App = connect(mapStateToProps)(App);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
