import Orders from "../../models/orders";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Orders(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
