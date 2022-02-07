import Orders from "../../models/orders";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;

      const response = await fetch(
        `https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/orders/${userId}.json/`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Orders(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        payload: { orders: loadedOrders },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    // console.log(resData);

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
