import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import Card from "../../components/UI/Card";

import Input from "../../components/UI/Input";
import colors from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { login, signUp } from "../../store/actions/auth";

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [signUpMode, setSignUpMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const switchSignUpMode = () => setSignUpMode((prevState) => !prevState);

  React.useEffect(() => {
    if (error) Alert.alert("Something went wrong", error, [{ text: "Okay" }]);
  }, [error]);

  const [emailState, setEmailState] = React.useState({
    value: "",
    hasError: true, // Initially empty
    touched: false,
  });
  const [passwordState, setPasswordState] = React.useState({
    value: "",
    hasError: true, // Initially empty
    touched: false,
  });

  const emailChangedHandler = (newValue) => {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      newValue
    );

    setEmailState({
      value: newValue,
      hasError: !isValid,
      touched: true,
    });
  };
  const passwordChangedHandler = (newValue) => {
    const isValid = newValue !== "" && newValue.length >= 8;

    setPasswordState({
      value: newValue,
      hasError: !isValid,
      touched: true,
    });
  };

  const authHandler = () => {
    if (emailState.hasError || passwordState.hasError) {
      return;
    }

    let authAction;
    if (signUpMode) {
      authAction = signUp(emailState.value, passwordState.value);
    } else {
      authAction = login(emailState.value, passwordState.value);
    }

    setError(null);
    setIsLoading(true);
    dispatch(authAction)
      .then(() => setIsLoading(false))
      .catch((err) => {
        // Alert(err);
        setError(err.message);
        setIsLoading(false);
      });
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
              secureTextEntry
              label="Password"
              textChanged={passwordChangedHandler}
              value={passwordState.value}
              hasError={passwordState.hasError}
              touched={passwordState.touched}
              errorMessage="Too short!"
            />
            <View style={styles.btnContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Button
                  title={signUpMode ? "Sign Up" : "Login"}
                  color={colors.primary}
                  onPress={authHandler}
                  disabled={Boolean(
                    emailState.hasError && passwordState.hasError
                  )}
                />
              )}
            </View>
            <View style={styles.btnContainer}>
              <Button
                title={`Switch to ${signUpMode ? "login" : "sign up"}`}
                color={colors.accent}
                onPress={switchSignUpMode}
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
