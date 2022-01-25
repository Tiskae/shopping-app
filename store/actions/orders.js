export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();

    const response = await fetch(
      "https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/orders/u1.jso/",
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
