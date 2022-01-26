import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => async (dispatch, getStore) => {
  try {
    const response = await fetch(
      "https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/products.json/"
    );

    // alert(response.ok);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

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
    throw new Error(err);
  }
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/products/${productId}.json/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product!");
    }

    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        productId,
      },
    });
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
    // console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: resData.name, title, description, imageUrl, price },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/products/${id}.json/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, imageUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product!");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        payload: { id, title, description, imageUrl },
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error);
    }
  };
};
