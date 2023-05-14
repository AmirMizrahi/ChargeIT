import basicApi from "../api/basicApi";
import createDataContext from "./createDataContext";
import trackerApi from "../api/basicApi";

const stationsReducer = (state, action) => {
  switch (action.type) {
    case "get_current_location":
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

const getCurrentLocation = (dispatch) => (location) => {
  console.log(new Date().toLocaleTimeString());
  dispatch({ type: "get_current_location", payload: location });
};

const fetchChargingStations = (dispatch) => async () => {
  const response = await basicApi.get(
    "/chargingStations/getAllChargingStations"
  );
  return response.data.chargingStations;
};

const createChargingStation =
  (dispatch) =>
  async ({ latitude, longitude, price, selectedValue }) => {
    const location = { latitude, longitude };
    debugger;
    try {
      const response = await trackerApi.post(
        "/chargingStations/createChargingStation",
        {
          location,
          price,
          selectedValue,
        }
      );
      // await AsyncStorage.setItem("token", response.data.token);
      // dispatch({ type: "signin", payload: response.data.token });
      // navigation.navigate("TabNavigator", { screen: "UserProfile" });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.response.data.error,
      });
    }
  };

export const { Context, Provider } = createDataContext(
  stationsReducer,
  { getCurrentLocation, fetchChargingStations, createChargingStation },
  { locations: [], currentLocation: null }
);
