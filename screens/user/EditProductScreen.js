import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { createProduct, updateProduct } from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    const updatedTouched = {
      ...state.inputTouched,
      [action.input]: true,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputTouched: updatedTouched,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const selectedProductId = props.route.params?.productId;

  let selectedProduct;
  if (selectedProductId)
    selectedProduct = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id == selectedProductId)
    );

  const [isPriceDefault, setIsPriceDefault] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : "",
      imageUrl: selectedProduct ? selectedProduct.imageUrl : "",
      description: selectedProduct ? selectedProduct.description : "",
      price: selectedProduct ? selectedProduct.price : "",
    },
    inputTouched: {
      title: false,
      imageUrl: false,
      description: false,
      price: false,
    },
    inputValidities: {
      title: selectedProduct ? true : false,
      imageUrl: selectedProduct ? true : false,
      description: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
    },
    formIsValid: selectedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please enter a valid input", [
        { text: "Okay" },
      ]);
      return;
    }
    if (selectedProduct) {
      dispatch(
        updateProduct(
          selectedProductId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, selectedProductId, formState]);

  useEffect(() => {
    selectedProductId && setIsPriceDefault(true);
  }, []);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="positions"
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="Title"
            textChanged={textChangeHandler.bind(this, "title")}
            value={formState.inputValues.title}
            touched={formState.inputTouched.title}
            hasError={!formState.inputValidities.title}
            errorMessage={"Please enter a valid title!"}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />

          <Input
            label="Image URL"
            textChanged={textChangeHandler.bind(this, "imageUrl")}
            value={formState.inputValues.imageUrl}
            touched={formState.inputTouched.imageUrl}
            hasError={!formState.inputValidities.imageUrl}
            errorMessage={"Please enter a valid image URL!"}
            autoCorrect={false}
            returnKeyType="next"
          />

          <Input
            label="Price"
            textChanged={textChangeHandler.bind(this, "price")}
            value={formState.inputValues.price.toString()}
            touched={formState.inputTouched.price}
            hasError={!formState.inputValidities.price}
            errorMessage={"Please enter a valid price!"}
            editable={!isPriceDefault}
            keyboardType="decimal-pad"
            returnKeyType="next"
          />

          <Input
            label="Description"
            textChanged={textChangeHandler.bind(this, "description")}
            value={formState.inputValues.description}
            touched={formState.inputTouched.description}
            hasError={!formState.inputValidities.description}
            errorMessage={"Please enter a valid description!"}
            autoCorrect
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: { margin: 20 },
});
