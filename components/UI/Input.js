import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = (props) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        onChangeText={props.textChanged}
        value={props.value}
      />
      {props.hasError && props.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: { width: "100%" },
  label: { fontFamily: "open-sans-bold", marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: { marginVertical: 5 },
  error: { fontFamily: "open-sans", color: "red", fontSize: 14 },
});
