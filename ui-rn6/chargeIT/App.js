import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { I18nManager } from "react-native";

import Splash from "./src/screens/authentication/Splash";
import Onboarding from "./src/screens/authentication/Onboarding";
import Login from "./src/screens/authentication/Login";
import Registration from "./src/screens/authentication/Registration";
import UserProfile from "./src/screens/mainFlow/UserProfile";
import MyStations from "./src/screens/mainFlow/MyStations";
import EditStation from "./src/screens/station/EditStation";
import ResolveAuthScreen from "./src/screens/authentication/ResolveAuthScreen";
import StationWatchScreen from "./src/screens/mainFlow/StationWatchScreen";
import StationSelectScreen from "./src/screens/mainFlow/StationSelectScreen";
import SelectChargingStation from "./src/screens/mainFlow/SelectChargingStation";
import EditProfile from "./src/screens/authentication/EditProfile";
import CreateStation from "./src/screens/mainFlow/CreateStation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as StationsProvider } from "./src/context/StationsContext";
import { Provider as UsersProvider } from "./src/context/UsersContext";

import SelectLocationByMap from "./src/screens/mainFlow/SelectLocationByMap";

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

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
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="CreateStation"
        component={CreateStation}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
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
        name="Stations"
        component={MyStations}
        options={{
          title: "Manage Stations",
          tabBarIcon: (tabInfo) => (
            <MaterialIcons
              name="ev-station"
              size={24}
              color={tabInfo.tintColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EditStation"
        component={EditStation}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
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
        name="Charge"
        component={SelectChargingStation}
        options={{
          title: "Charge",
          tabBarIcon: (tabInfo) => (
            <MaterialIcons name="map" size={24} color={tabInfo.tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="SelectLocation"
        component={SelectLocationByMap}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="StationSelectScreen"
        component={StationSelectScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="StationWatchScreen"
        component={StationWatchScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

//export default App;
export default () => {
  return (
    <UsersProvider>
      <StationsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StationsProvider>
    </UsersProvider>
  );
};
