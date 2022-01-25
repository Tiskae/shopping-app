import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color={"red"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    marginHorizontal: 5,
    // width: "100%",
  },
  itemData: { flexDirection: "row", alignItems: "center" },
  quantity: { fontFamily: "open-sans", color: "#888", fontSize: 16, width: 30 },
  mainText: { fontFamily: "open-sans-bold", fontSize: 16 },
  deleteBtn: { marginLeft: 20 },
});
