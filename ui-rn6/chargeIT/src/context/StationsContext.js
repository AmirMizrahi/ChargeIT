import basicApi from "../api/basicApi";
import createDataContext from "./createDataContext";

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
  async ({ latitude, longitude, pricePerVolt, chargerType }) => {
    const location = { latitude, longitude };
    debugger;
    try {
      const response = await basicApi.post(
        "/chargingStations/createChargingStation",
        {
          location,
          pricePerVolt,
          chargerType,
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

const getAllStationsByUser = (dispatch) => async () => {
  try {
    const response = await basicApi.get(
      "/chargingStations/getAllUserChargingStations"
    );
    return response.data.chargingStations;
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err.response.data.error,
    });
  }
};

export const { Context, Provider } = createDataContext(
  stationsReducer,
  {
    getCurrentLocation,
    fetchChargingStations,
    createChargingStation,
    getAllStationsByUser,
  },
  { locations: [], currentLocation: null }
);
