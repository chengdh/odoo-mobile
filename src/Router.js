import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Home from './pages/home'
import Authentication from './pages/authentication'
import Login from './pages/login'

export const HomeStack = createStackNavigator({
    Authentication_Page: {
        screen: Authentication,
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
    },
})