import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  FlatList,
  Button,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";

import colors from "../../constants/colors";

import * as cartActions from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

const ProductOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    dispatch(fetchProducts())
      .then(() => setIsLoading(false))
      .catch((error) => setError(error.message));
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadProducts);

    //cleanup Func
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found! Maybe you should start adding something</Text>
      </View>
    );
  }

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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
