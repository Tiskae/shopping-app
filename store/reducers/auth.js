import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      //   console.log("SIGNUP", action.payload);
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGIN:
      //   console.log("LOGIN", action.payload);
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};
