import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => async (dispatch, getStore) => {
  try {
    const response = await fetch(
      "https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/products.jsn/"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    // console.log(response);

    const resData = await response.json();
    // console.log(resData);

    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCTS,
      payload: { products: loadedProducts },
    });
  } catch (err) {
    // send to custom analytics
    throw err;
  }
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    payload: {
      productId,
    },
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // add async code you want
    const response = await fetch(
      "https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/products.json/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: resData.name, title, description, imageUrl, price },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { id, title, description, imageUrl },
  };
};
