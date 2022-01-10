import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import productReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";
import { Platform, StatusBar } from "react-native";
import colors from "./constants/colors";

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={Platform.OS === "android" ? colors.primary : "white"}
        translucent={false}
        barStyle={Platform === "android" ? "dark-content" : "light-content"}
      />
      <ShopNavigator />
    </Provider>
  );
}
