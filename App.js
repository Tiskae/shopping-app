import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Apploading from "expo-app-loading";
import * as Fonts from "expo-font";
import { composeWithDevTools } from "redux-devtools-extension";

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

const store = createStore(rootReducer, composeWithDevTools());

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
      <MainNavigator />
    </Provider>
  );
}
