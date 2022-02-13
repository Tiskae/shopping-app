import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("AuthScreen");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;
      const expiryDate = new Date(expirationDate);

      if (expiryDate <= new Date() || !token || !userId) {
        props.navigation.navigate("AuthScreen");
        return;
      }

      const expirationTime = expiryDate.getTime() - new Date().getTime();

      dispatch(
        authenticate(
          transformedData.token,
          transformedData.userId,
          expirationTime
        )
      );
      props.navigation.navigate("MainNavigator");
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
