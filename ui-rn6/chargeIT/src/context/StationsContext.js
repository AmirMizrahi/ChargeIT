import basicApi from "../api/basicApi";
import createDataContext from "./createDataContext";

const stationsReducer = (state, action) => {
    switch (action.type) {
        case "get_current_location":
            return {...state, currentLocation: action.payload};
        default:
            return state;
    }
};

//todo
// const charge = (dispatch) => async () => {
//     try {
//         const response = await basicApi.get(
//             "/chargingStations/getAllUserChargingStations"
//         );
//         return response.data.chargingStations;
//     } catch (err) {
//         dispatch({
//             type: "add_error",
//             payload: err.response.data.error,
//         });
//     }
// };

const discharge = (dispatch) => async ({selectedChargingStationId, location}) => {
    const response = await basicApi.put(
        "/chargingStations/unCharge?chargingStationId=" + selectedChargingStationId,
        {params: {location}}
    );
    console.log(response);
    return response.data.chargingStation;
};

const getCurrentLocation = (dispatch) => (location) => {
    console.log(new Date().toLocaleTimeString());
    dispatch({type: "get_current_location", payload: location});
};

const fetchChargingStations = (dispatch) => async () => {
    const response = await basicApi.get(
        "/chargingStations/getAllChargingStations"
    );
    return response.data.chargingStations;
};

const fetchChargingStationsByDistance = (dispatch) => async (location) => {
    const params = {
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
        radius: 1000,
    };
    const response = await basicApi.get(
        "/chargingStations/getChargingStationsByRadius?" +
        "latitude=" +
        parseFloat(location.latitude) +
        "&longitude=" +
        parseFloat(location.longitude) +
        "&radius=1000"
    );
    console.log(
        "/chargingStations/getChargingStationsByRadius?" +
        "latitude=" +
        parseFloat(location.latitude) +
        "&longitude=" +
        parseFloat(location.longitude) +
        "&radius=100000"
    );
    return response.data.chargingStations;
};

const createChargingStation =
    (dispatch) =>
        async ({latitude, longitude, pricePerVolt, chargerType, stationName}) => {
            const location = {latitude, longitude};
            console.log(stationName);
            try {
                await basicApi
                    .post("/chargingStations/createChargingStation", {
                        location,
                        pricePerVolt,
                        chargerType,
                        stationName,
                    })
                    .then((res) => console.log(res));
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

const getChargingStationById =
    (dispatch) =>
        async ({stationId}) => {
            const response = await basicApi.get(
                "/chargingStations/getChargingStation",
                {params: {chargingStationId: stationId}}
            );
            return response.data.chargingStation;
        };

// Not implemented in server. yet...
const updateChargingStation =
    (dispatch) =>
        async ({latitude, longitude, pricePerVolt, chargerType, stationName}) => {
            const location = {latitude, longitude};
            console.log(stationName);
            try {
                await basicApi
                    .post("/chargingStations/updateChargingStation", {
                        location,
                        pricePerVolt,
                        chargerType,
                        stationName,
                    })
                    .then((res) => console.log(res));
            } catch (err) {
                dispatch({
                    type: "add_error",
                    payload: err.response.data.error,
                });
            }
        };

const getStationToDischarge =
    (dispatch) =>
        async () => {
            let dischargeStation;
            try {
                dischargeStation = await basicApi.get("/chargingStations/getWhichChargingStationUserUses")
            } catch (err) {
                dispatch({
                    type: "add_error",
                    payload: err.response.data.error,
                });
            }

            return dischargeStation;
        };

export const {Context, Provider} = createDataContext(
    stationsReducer,
    {
        discharge,
        getCurrentLocation,
        fetchChargingStations,
        createChargingStation,
        getAllStationsByUser,
        fetchChargingStationsByDistance,
        getChargingStationById,
        updateChargingStation,
        getStationToDischarge
    },
    {locations: [], currentLocation: null}
);
