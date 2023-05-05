import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./src/screens/authentication/Splash";
import Onboarding from "./src/screens/authentication/Onboarding";
import Login from "./src/screens/authentication/Login";
import Registration from "./src/screens/authentication/Registration";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import ChargeRequestScreen from "./src/screens/ChargeRequestScreen";

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
      <Tab.Screen name="Charge" component={ChargeRequestScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <>
      {/* First Navigation Container */}
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>

      {/*/!* Second Navigation Container *!/*/}
      {/*<NavigationContainer>*/}
      {/*    <TabNavigator />*/}
      {/*</NavigationContainer>*/}
    </>
  );
};

//export default App;
export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
