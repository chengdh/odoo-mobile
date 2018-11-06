// @flow
import { Button, Container, Content, Footer, Input, Item, Spinner, Text, View } from "native-base";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { checkServer } from "./actions";
import styles from "./styles";

const required = value => (value ? undefined : "不可为空");

class AuthenticationForm extends Component {
  componentWillMount() {
    // this.keyboardDidShowListener = Keyboard.addListener(
    //   "keyboardDidShow",
    //   this._keyboardDidShow
    // );
    // this.keyboardDidHideListener = Keyboard.addListener(
    //   "keyboardDidHide",
    //   this._keyboardDidHide
    // );
  }

  componentWillUnmount() {
    // this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();
  }

  componentDidMount() {}

  _keyboardDidShow() {
    // alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    // alert('Keyboard Hidden');
  }

  _submit = (vals, dispatch) => {
    const server_url = vals.server_url;
    return dispatch(checkServer(server_url, this.props.navigation));
  };

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon name="link" size={20} style={{ color: "#fff" }} />
          <Input
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="服务器地址"
            {...input}
            ref={c => (this.textInput = c)}
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
        {/* <ImageBackground
          source={require("../../assets/images/bg-signup.png")}
          style={styles.background}
        > */}
        <Content padder scrollEnabled={false}>
          <Text style={styles.forgotPasswordHeader}>设置服务器</Text>
          <View
            style={{
              flex: 1,
              alignItems: "center"
            }}
          >
            <Icon name="server" style={{ fontSize: 50, color: "white" }} />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <Field
              name="server_url"
              component={this.renderInput}
              type="text"
              validate={[required]}
              placeholder="设置服务器地址"
            />
            {this.props.is_checking ? (
              <Spinner color="red" />
            ) : (
              <Button
                rounded
                block
                bordered
                onPress={this.props.handleSubmit(this._submit)}
                style={styles.emailBtn}
              >
                <Text style={{ color: "#FFF" }}>确定</Text>
              </Button>
            )}
          </View>
        </Content>
        <Footer
          style={{
            paddingLeft: 20,
            paddingRight: 20
          }}
        />
        {/* </ImageBackground> */}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    is_checking: state.auth_reducer.is_checking,
  };
};
const Authentication = reduxForm({
  form: "Authentication"
})(AuthenticationForm);
Authentication = connect(mapStateToProps)(Authentication);

export default Authentication;
