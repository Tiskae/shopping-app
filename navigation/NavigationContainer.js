import React from "react";
import { useEffect, use } from "react";
import { useSelector } from "react-redux";

import MainNavigator from "./MainNavigator";

const NavigationContainer = (props) => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      props.navigation.navigate("AuthScreen");
    }
  }, [token]);

  return <MainNavigator />;
};

export default NavigationContainer;
