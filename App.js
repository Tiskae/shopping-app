import React, { useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Apploading from "expo-app-loading";
import * as Fonts from "expo-font";
// import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import AuthReducer from "./store/reducers/auth";
import ProductReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import OrdersReducer from "./store/reducers/orders";

import NavigationContainer from "./navigation/NavigationContainer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductReducer,
  cart: cartReducer,
  orders: OrdersReducer,
});

const fetchFonts = () =>
  Fonts.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
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
      <NavigationContainer />
    </Provider>
  );
}
