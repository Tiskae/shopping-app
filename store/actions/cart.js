export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product) => {
  return {
    action: ADD_TO_CART,
    payload: {
      product,
    },
  };
};
