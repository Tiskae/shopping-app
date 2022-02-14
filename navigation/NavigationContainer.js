import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const token = useSelector((state) => state.auth.token);
  //   console.log(token);

  useEffect(() => {
    if (!token) {
      //   props.navigation.navigate("AuthScreen");
      navRef.current.dipatch(CommonActions.navigate({ name: "AuthScreen" }));
    }
  }, [token]);

  return <MainNavigator forwardRef={navRef} />;
};

export default NavigationContainer;
