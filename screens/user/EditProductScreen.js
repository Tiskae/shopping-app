import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ScrollView, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../store/actions/products";

const EditProductScreen = (props) => {
  const selectedProductId = props.route.params?.productId;

  const dispatch = useDispatch();

  let selectedProduct;
  if (selectedProductId)
    selectedProduct = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id == selectedProductId)
    );

  const [title, setTitle] = useState(
    selectedProduct ? selectedProduct.title : ""
  );
  const [imageUrl, setImageUrl] = useState(
    selectedProduct ? selectedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(
    selectedProduct ? selectedProduct.price.toString() : ""
  );
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ""
  );

  const [isPriceDefault, setIsPriceDefault] = useState(false);

  const submitHandler = useCallback(() => {
    if (selectedProduct) {
      dispatch(updateProduct(selectedProductId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
  }, [dispatch, selectedProductId, title, imageUrl, price, description]);

  useEffect(() => {
    selectedProductId && setIsPriceDefault(true);
  }, []);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formContol}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setTitle(newText)}
            value={title}
          />
        </View>
        <View style={styles.formContol}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setImageUrl(newText)}
            value={imageUrl}
          />
        </View>
        <View style={styles.formContol}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setPrice(newText)}
            value={price}
            editable={!isPriceDefault}
          />
        </View>
        <View style={styles.formContol}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setDescription(newText)}
            value={description}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  screen: {},
  form: { margin: 20 },
  formContol: { width: "100%" },
  label: { fontFamily: "open-sans-bold", marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
