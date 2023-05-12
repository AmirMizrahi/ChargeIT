import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./src/screens/authentication/Splash";
import Onboarding from "./src/screens/authentication/Onboarding";
import Login from "./src/screens/authentication/Login";
import Registration from "./src/screens/authentication/Registration";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import UserProfile from "./src/screens/mainFlow/UserProfile";
import ChargeRequestScreen from "./src/screens/mainFlow/ChargeRequestScreen";
import ResolveAuthScreen from "./src/screens/authentication/ResolveAuthScreen";
import { StationWatchScreen } from "./src/screens/mainFlow/StationWatchScreen";
import { StationSelectScreen } from "./src/screens/mainFlow/StationSelectScreen";
import SelectTemp from "./src/screens/mainFlow/SelectTemp";
import EditProfile from "./src/screens/authentication/EditProfile";
import { Provider as StationsProvider } from "./src/context/StationsContext";

import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: "My Profile",
          tabBarIcon: (tabInfo) => (
            <MaterialIcons name="home" size={24} color={tabInfo.tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="SelectTemp"
        component={SelectTemp}
        options={{
          title: "Temp Map",
          tabBarIcon: (tabInfo) => (
            <MaterialIcons name="map" size={24} color={tabInfo.tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="Charge"
        component={ChargeRequestScreen}
        options={{
          title: "Charge",
          tabBarIcon: (tabInfo) => (
            <MaterialIcons
              name="battery-std"
              size={24}
              color={tabInfo.tintColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Resolve" component={ResolveAuthScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="StationWatchScreen" component={StationWatchScreen} />
      <Stack.Screen
        name="StationSelectScreen"
        component={StationSelectScreen}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

//export default App;
export default () => {
  return (
    <StationsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StationsProvider>
  );
};
