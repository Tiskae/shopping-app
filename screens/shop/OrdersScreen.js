import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import OrderItem from "../../components/shop/OrderItem";
import colors from "../../constants/colors";
import { fetchOrders } from "../../store/actions/orders";

const OrdersScreen = (props) => {
  const [loading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders())
      .then(() => setIsLoading(false))
      .catch((error) => {
        // Real error handling should be done
        console.log(error.message);
        setIsLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (orders.length === 0)
    return (
      <View style={styles.defaultScreen}>
        <Text style={styles.defaultScreenText}>
          Your have not made any orders yet!
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

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;

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
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
