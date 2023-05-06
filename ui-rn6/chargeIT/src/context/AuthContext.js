import createDataContext from "./createDataContext";
import trackerApi from "../api/basicApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

// This function will refer the user to the mainflow if token is available.
const tryLocalLogin =
  (dispatch) =>
  async ({ navigation }) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigation.navigate("TabNavigator", { screen: "UserProfile" }); // Need to add token logic...
    } else {
      navigation.navigate("Registration"); // Need to add token logic...
    }
  };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const register =
  (dispatch) =>
  async ({ email, password, navigation }) => {
    try {
      //todo re-live this code.
      const response = await trackerApi.post("/users/registration", {
        email,
        password,
      });
      // const response = await trackerApi.post("/test/register", {
      //   email,
      //   password,
      // });
      await AsyncStorage.setItem("token", response.data.token);
      console.log(await AsyncStorage.getItem("token"));
      debugger;
      dispatch({ type: "signin", payload: response.data.token });
      navigation.navigate("TabNavigator", { screen: "UserProfile" }); // Need to add token logic...
      //console.log(response.data.token);
    } catch (err) {
      debugger;
      dispatch({
        type: "add_error",
        payload: err.response.data.error,
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password, navigation }) => {
    try {
      const response = await trackerApi.post("/users/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigation.navigate("TabNavigator", { screen: "UserProfile" });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.response.data.error,
      });
    }
  };

const logout =
  (dispatch) =>
  async ({ navigation }) => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "signout" });
      navigation.navigate("Onboarding"); // Need to add token logic...
    } catch (err) {}
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, logout, register, clearErrorMessage, tryLocalLogin },
  { token: null, errorMessage: "" }
);
