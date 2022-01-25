import React from "react";
import { StyleSheet, FlatList, Text, View, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

import colors from "../../constants/colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  const onSelectHandler = (itemData) =>
    props.navigation.navigate("EditProductScreen", {
      productId: itemData.item.id,
    });

  const deleteHandler = (id) => {
    Alert.alert(
      "Are you sure you?",
      "Do you really want to delete the product?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(deleteProduct(id));
          },
        },
      ]
    );
  };

  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={onSelectHandler.bind(null, itemData)}
        >
          <Button
            color={colors.primary}
            title="Edit product"
            onPress={onSelectHandler.bind(null, itemData)}
          />
          <Button
            color={colors.primary}
            title="Delete Product"
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
