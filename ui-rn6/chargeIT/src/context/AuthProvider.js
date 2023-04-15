import createDataContext from "./createDataContext";

const authReducer = (state, actions) => {
    switch (actions.type) {
        default:
            return state;
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {},
    { isSignedIn: false } //todo Change!
);
