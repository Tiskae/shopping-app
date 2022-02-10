import { AUTHENTICATE } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log("AUTHENTICATE", action.payload);
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };

    default:
      return state;
  }
};
