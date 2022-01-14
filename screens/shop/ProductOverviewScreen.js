import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, FlatList, Button } from "react-native";
import ProductItem from "../../components/shop/ProductItem";

import colors from "../../constants/colors";

import * as cartActions from "../../store/actions/cart";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => {
        const onViewDetail = () => {
          props.navigation.navigate("ProductDetailScreen", {
            productId: itemData.item.id,
            productTitle: itemData.item.title,
          });
        };

        return (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={onViewDetail}
          >
            <Button
              color={colors.primary}
              title="View Details"
              onPress={onViewDetail}
            />
            <Button
              color={colors.primary}
              title="To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
