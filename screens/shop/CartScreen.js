import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  FlatList,
  Button,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import CartItem from "../../components/shop/CartItem";
import colors from "../../constants/colors";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

const CartScreen = (props) => {
  const [loading, setIsLoading] = useState(false);

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productTitle > b.productTitle ? 1 : -1
    );
  });

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <View style={styles.defaultScreen}>
        <Text style={styles.defaultScreenText}>
          Your cart is as empty as a playa lake. You will see products you've
          added to cart in here :)
        </Text>
        <View style={styles.defaultScreenBtn}>
          <Button
            title="Go back to products"
            color={colors.primary}
            onPress={props.navigation.goBack}
          />
        </View>
      </View>
    );
  }

  const sendOrderHandler = () => {
    setIsLoading(true);

    dispatch(addOrder(cartItems, cartTotalAmount))
      .then(() => setIsLoading(false))
      .catch((error) => {
        // Real error handling should be done instead
        setIsLoading(false);
        console.log(error.message);
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
        </Text>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={colors.accent}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
            deletable={true}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  defaultScreen: { flex: 1, justifyContent: "center" },
  defaultScreenText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "open-sans",
    marginHorizontal: 20,
    color: "#999",
  },
  defaultScreenBtn: { alignItems: "center", marginTop: 10 },
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    // elevation: 0.1,
    borderWidth: Platform.OS === "android" ? 2 : 0,
    borderColor: "#d9d9d9",
    borderRadius: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amountText: { color: colors.primary },
});
