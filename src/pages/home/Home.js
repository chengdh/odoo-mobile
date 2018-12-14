import React, { Component } from 'react'
import { StyleSheet, Text, View, WebView, Platform, BackHandler } from 'react-native'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: 'http://' + this.props.navigation.state.params.domainName + '/web#home'
    }
  }

  onNavigationStateChange(navState) {
    let domain = 'http://' + this.props.navigation.state.params.domainName + '/web'
    if (navState.url.indexOf('logout') > -1) {
      this.backToLogin()
      this.setState({ url: 'about:blank' })
    } else if (navState.url == (domain + '/login#home')) {
      navState.url = domain + '#home'
    }
  }

  backToLogin() {
    this.props.navigation.navigate('Authentication_Page', {});
  }

  render() {
    return (<WebView
      source={{ uri: this.state.url }}
      ref={(c) => this._webView = c}
      onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      startInLoadingState={true}
      style={{
        marginTop: Platform.OS === 'ios' ? 20 : 0
      }} />)
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

const styles = StyleSheet.create({
});
const mapStateToProps = state => {
  return {
    domain_name: state.login_reducer.domain_name
  }
}

