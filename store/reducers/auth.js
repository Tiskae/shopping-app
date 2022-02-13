import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      // console.log("AUTHENTICATE", action.payload);
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGOUT:
      // Reset everything back to normal
      return initialState;

    default:
      return state;
  }
};
