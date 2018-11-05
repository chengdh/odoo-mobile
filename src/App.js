import { Root } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HomeStack } from "./Router";

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <Root>
        <HomeStack />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
