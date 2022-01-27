import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Input from "../../components/UI/Input";

const AuthScreen = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "pink",
        }}
      >
        <Text>Alaye sign in or sign up</Text>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
