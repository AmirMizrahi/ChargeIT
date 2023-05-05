import createDataContext from "./createDataContext";
import trackerApi from "../api/basicApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
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

const signout = (dispatch) => {
  return ({ email, password }) => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, register },
  { token: null, errorMessage: "" }
);
