import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, FlatList, Text, View } from "react-native";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          details={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
