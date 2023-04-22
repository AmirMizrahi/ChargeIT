import createDataContext from "./createDataContext";
import trackerApi from "../api/basicApi";

const authReducer = (state, actions) => {
    switch (actions.type) {
        default:
            return state;
    }
};

const register = (dispatch) => {
    return async ({ email, password }) => {
        try {
            console.log("sadf");
            const response = await trackerApi.post("/users/registration", { email, password });
            console.log(response.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };
};

const signin = (dispatch) => {
    return ({ email, password }) => {};
};

const signout = (dispatch) => {
    return ({ email, password }) => {};
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, register },
    { isSignedIn: false }
);
