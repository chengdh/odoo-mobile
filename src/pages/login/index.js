import {
  Button,
  Container,
  Content,
  Input,
  Item,
  Spinner,
  Text,
  View
} from "native-base";
import React, { Component } from "react";
import { ImageBackground, Platform, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "./actions";
import styles from "./styles";

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/logo.png");

const required = value => (value ? undefined : "必输");
const maxLength = max => value =>
  value && value.length > max ? `最多${max}个字符` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `最少${min}个字符` : undefined;
const minLength1 = minLength(1);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "无效邮箱地址"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? "只允许输入汉字" : undefined;

class LoginForm extends Component {
  _submit = (vals, dispatch) => {
    const { username, password, db } = vals;
    const nav = this.props.navigation;
    return dispatch(login(username, password, db, nav));
  };
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    function getIcon(fieldName) {
      let iconName;
      if (fieldName === "username") iconName = "user";
      else if (fieldName === "password") iconName = "unlock";
      else iconName = "database";
      const icon = (
        <Icon active size={20} name={iconName} style={{ color: "#fff" }} />
      );
      return icon;
    }
    function getPlaceholder(fieldName) {
      let placeholder;
      if (fieldName === "username") placeholder = "用户名";
      else if (fieldName === "password") placeholder = "密码";
      else placeholder = "数据库";
      return placeholder;
    }

    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          {getIcon(input.name)}
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={getPlaceholder(input.name)}
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

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../../assets/images/application-switcher-bg.jpg")}
          style={styles.background}
        >
          <Content contentContainerStyle={{ flex: 1 }}>
            <View
              style={{
                alignItems: "center",
                paddingTop: 40,
                paddingBottom: 30
              }}
            >
              <Text style={styles.header}>登录</Text>
              <Icon name="gg" style={{ fontSize: 50, color: "white" }} />
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <Field
                  name="db"
                  component={this.renderInput}
                  type="text"
                  validate={[required]}
                />

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
                  validate={[alphaNumeric, minLength1, maxLength15, required]}
                />
                {this.props.is_loading ? (
                  <Spinner />
                ) : (
                  <Button
                    rounded
                    block
                    bordered
                    style={styles.loginBtn}
                    onPress={this.props.handleSubmit(this._submit)}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? {
                              color: "#FFF",
                              fontSize: 16,
                              textAlign: "center",
                              top: -5
                            }
                          : { color: "#FFF", fontSize: 16, fontWeight: "900" }
                      }
                    >
                      登录系统
                    </Text>
                  </Button>
                )}
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    is_loading: state.login_reducer.is_loading
  };
};

let Login = reduxForm({
  form: "login"
})(LoginForm);

Login = connect(mapStateToProps)(Login);
export default Login;
