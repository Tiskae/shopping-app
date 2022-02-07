import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import colors from "../constants/colors";

const StartupScreen = (props) => {
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
