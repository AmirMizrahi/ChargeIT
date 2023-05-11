import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ChargeRequestScreen from "./src/screens/ChargeRequestScreen";
import CreateStationScreen from "./src/screens/CreateStationScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import { Provider as AuthProvider } from "./src/context/AuthProvider";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Welcome: WelcomeScreen,
    Registration: RegistrationScreen,
    Login: LoginScreen,
  }),
  chargingFlow: createMaterialBottomTabNavigator({
    CreateStation: CreateStationScreen,
    ChargeRequest: ChargeRequestScreen,
    UserProfile: UserProfileScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
