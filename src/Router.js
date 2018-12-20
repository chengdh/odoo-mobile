import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Home from './pages/home'
import AuthenticationScreen from './pages/authentication'
import Login from './pages/login'

const getHomeStack = (is_logged) => {

    const initialRouteName = is_logged ? 'Home_Page' : 'Authentication_Page';
    const homeStack = createStackNavigator({
        Authentication_Page: {
            screen: AuthenticationScreen,
            navigationOptions: {
                header: null,
            },
        },
        Login_Page: {
            screen: Login,
            navigationOptions: {
                header: null,
            },
        },
        Home_Page: {
            screen: Home,
            navigationOptions: {
                header: null,
            },
        }
    }, { initialRouteName: initialRouteName }
    );
    return homeStack;
}
export default getHomeStack;