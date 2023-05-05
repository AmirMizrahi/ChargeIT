import createDataContext from "./createDataContext";
import trackerApi from "../api/basicApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const register =
  (dispatch) =>
  async ({ email, password, navigation }) => {
    try {
      const response = await trackerApi.post("/users/registration", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      console.log(await AsyncStorage.getItem("token"));
      debugger;
      navigation.navigate("TabNavigator", { screen: "UserProfile" }); // Need to add token logic...

      //console.log(response.data.token);
    } catch (err) {
      // If email is already in use...
      console.log(err.response.data.error);
      dispatch({
        type: "add_error",
        payload: err.response.data.error,
      });
    }
  };

const signin = (dispatch) => {
  //delete!!!
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/users/login", {
        email,
        password,
      });
      //console.log(response);

      // Save session token
      console.log(response.data.token);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });

      // Navigate to main flow
      c;
    } catch (err) {
      // If email is already in use...
      console.log(err.response.data);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with .......",
      });
    }
  };
};

const signout = (dispatch) => {
  return ({ email, password }) => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, register },
  { token: "", errorMessage: "" }
);
