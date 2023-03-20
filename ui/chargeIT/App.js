import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ChargeRequestScreen from "./src/screens/ChargeRequestScreen";
import CreateStationScreen from "./src/screens/CreateStationScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";

const switchNavigator = createSwitchNavigator({
        loginFlow: createStackNavigator({
            Welcome:WelcomeScreen,
            Registration: RegistrationScreen,
            Login: LoginScreen
        }),
        mainFlow: createMaterialBottomTabNavigator({
        CreateStation: CreateStationScreen,
        ChargeRequest: ChargeRequestScreen,
        UserProfile: UserProfileScreen
    })}
);

export default  createAppContainer(switchNavigator);
