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
    "/chargingStations/getAllChargingStationsLocations"
  );
  debugger;
  return response.data;
};

const createChargingStation = (dispatch) => async () => {
  //const response = await basicApi.get(/)
};

export const { Context, Provider } = createDataContext(
  stationsReducer,
  { getCurrentLocation, fetchChargingStations, createChargingStation },
  { locations: [], currentLocation: null }
);
