import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import Card from "../../components/UI/Card";

import Input from "../../components/UI/Input";
import colors from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const AuthScreen = (props) => {
  const [emailState, setEmailState] = React.useState({
    value: "",
    hasError: false,
    touched: false,
  });
  const [passwordState, setPasswordState] = React.useState({
    value: "",
    hasError: false,
    touched: false,
  });

  const emailChangedHandler = (newValue) => {
    setEmailState((prev) => ({
      value: newValue,
      hasError: prev.hasError,
      touched: prev.touched,
    }));
  };
  const PasswordChangedHandler = (newValue) => {
    setPasswordState((prev) => ({
      value: newValue,
      hasError: prev.hasError,
      touched: prev.touched,
    }));
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.screen}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              label="Email"
              textChanged={emailChangedHandler}
              value={emailState.value}
              hasError={emailState.hasError}
              touched={emailState.touched}
              errorMessage="Please enter a valid Email address"
            />
            <Input
              label="Password"
              textChanged={PasswordChangedHandler}
              value={passwordState.value}
              hasError={passwordState.hasError}
              touched={passwordState.touched}
              errorMessage="Please enter a valid password"
            />
            <View style={styles.btnContainer}>
              <Button title="Login" color={colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.btnContainer}>
              <Button
                title="Switch to Sign up"
                color={colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  btnContainer: {
    marginTop: 10,
  },
});
