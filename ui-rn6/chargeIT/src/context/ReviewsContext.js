import basicApi from "../api/basicApi";
import createDataContext from "./createDataContext";

const reviewsReducer = (state, action) => {
    switch (action.type) {
        // case "get_current_location":
        //     return {...state, currentLocation: action.payload};
        default:
            return state;
    }
};

const addReview = (dispatch) => ({grade, review, chargingStationId, nickname}) => {
    let responseData = {};
    const queryParams = {
        grade,
        chargingStationId,
        nickname
    };

    try {
        debugger;
        basicApi.put("/chargingStations/addReview", review,
            {headers: {'Content-Type': 'text/plain'},  params: queryParams })
            .then(response => {
                // Handle successful response
                console.log("Review added successfully", response.data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error adding review", error);
            });        debugger;
    } catch (err) {
        responseData.error = err.response.data.error;
    }
    return responseData;
};

export const {Context, Provider} = createDataContext(
    reviewsReducer,
    {
        addReview,
    },
    {}
);
