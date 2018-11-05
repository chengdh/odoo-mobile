import React, { Component } from "react";
import { Image, ImageBackground, Platform, StatusBar } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  // Icon,
  View,
  Left,
  Right,
  Toast,
  Keyboard
} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Field, reduxForm,formValueSelector } from "redux-form";

import styles from "./styles";

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/logo.png");

const required = value => (value ? undefined : "必输");
const maxLength = max => value =>
  value && value.length > max ? `最多${max}个字符` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `最少${min}个字符` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "无效邮箱地址"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? "只允许输入汉字" : undefined;

class LoginForm extends Component {
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            size={20}
            name={input.name === "username" ? "user" : "unlock"}
            style={{ color: "#fff" }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={input.name === "username" ? "用户名" : "密码"}
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error ? (
            <Icon
              active
              style={styles.formErrorIcon}
              onPress={() => this.textInput._root.clear()}
              name="close"
            />
          ) : (
            <Text />
          )}
        </Item>
        {touched && error ? (
          <Text style={styles.formErrorText1}>{error}</Text>
        ) : (
          <Text style={styles.formErrorText2}>错误</Text>
        )}
      </View>
    );
  }

  login = (vals) => {
    // if (this.state.userNameError || this.state.passwordError) {
    // } else {
    //   let db = this.state.username.substring(
    //     this.state.username.lastIndexOf("@") + 1
    //   );
    //   this.setState({ ranDomId: Math.floor(Math.random() * 1000) + 1 });

    //   let url =
    //     "https://" + this.state.domainName + "/web/session/authenticate";

    //   fetch(url, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       jsonrpc: "2.0",
    //       method: "call",
    //       params: {
    //         db: db,
    //         login: this.state.username,
    //         password: this.state.password,
    //         context: {}
    //       },
    //       id: this.state.ranDomId
    //     })
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       // console.log(responseJson)
    //       if (responseJson.error) {
    //         this.setState({
    //           error: true
    //         });
    //         return;
    //       }
    //       this.setState({
    //         session_id: responseJson.result.session_id
    //       });
    //       AsyncStorage.setItem(
    //         "username",
    //         this.state.username.toLowerCase().trim()
    //       );
    //       AsyncStorage.setItem("password", this.state.password);
    //       this.props.navigation.navigate("Home_Page", {
    //         domainName: this.state.domainName.toLowerCase().trim(),
    //         username: this.state.username.toLowerCase().trim(),
    //         password: this.state.password,
    //         session_id: this.state.session_id
    //       });
    //     })
    //     .catch(error => {
    //       // console.error(error)
    //       this.setState({
    //         error: true
    //       });
    //     });
    // }
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <Field
                  name="username"
                  component={this.renderInput}
                  type="text"
                  validate={[required]}
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  type="password"
                  validate={[alphaNumeric, minLength8, maxLength15, required]}
                />

                <Button
                  rounded
                  primary
                  block
                  large
                  style={styles.loginBtn}
                  onPress={this.props.handleSubmit(vals => {
                    this.login(vals);
                  })}
                >
                  <Text
                    style={
                      Platform.OS === "android"
                        ? { fontSize: 16, textAlign: "center", top: -5 }
                        : { fontSize: 16, fontWeight: "900" }
                    }
                  >
                    登录系统
                  </Text>
                </Button>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const Login = reduxForm({
  form: "login"
})(LoginForm);
// Decorate with connect to read form values
const selector = formValueSelector("login"); // <-- same as form name
Login = connect(state => {
  // can select values individually
  const username = selector(state, "username");
  const password = selector(state, "password");
  return {
    username,
    password,
    initialValues: { username, password }
  };
})(Login);

export default Login;