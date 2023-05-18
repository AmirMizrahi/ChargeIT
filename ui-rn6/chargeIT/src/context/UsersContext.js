import basicApi from "../api/basicApi";
import createDataContext from "./createDataContext";

const usersReducer = (state, action) => {
  switch (action.type) {
    case "get_user_values":
      debugger;
      return { userValues: action.payload };
    default:
      return state;
  }
};

// todo change!
const getUserInfo = (dispatch) => async () => {
  try {
    const response = await basicApi.get("/users/getUser");
    const data = response.data.user;
    const userValues = {};

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        userValues[key] = data[key];
      }
    }

    dispatch({
      type: "get_user_values",
      payload: userValues,
    });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err.response.data.error,
    });
  }
};

export const { Context, Provider } = createDataContext(
  usersReducer,
  { getUserInfo },
  { userValues: null }
);
