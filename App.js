import React, { useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Apploading from "expo-app-loading";
import * as Fonts from "expo-font";
// import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import OrdersReducer from "./store/reducers/orders";

import MainNavigator from "./navigation/MainNavigator";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: OrdersReducer,
});

const fetchFonts = () =>
  Fonts.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  // useEffect(() => {
  //   fetch("https://rn-shopping-app-856e9-default-rtdb.firebaseio.com/")
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (!fontsLoaded) {
    return (
      <Apploading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => setFontsLoaded(false)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
