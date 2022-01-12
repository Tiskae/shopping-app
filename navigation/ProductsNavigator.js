import { Platform } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

import HeaderButton from "../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primary : "white",
        },
        headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitleStyle: { fontFamily: "open-sans" },
        statusBarStyle: "light",
        headerTitleAlign: "center",
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen
        name="ProductsOverviewScreen"
        component={ProductOverviewScreen}
        options={(navData) => ({
          title: "All Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navData.navigation.navigate("CartScreen");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={(navData) => ({
          title: navData.route.params.productTitle,
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Your Cart",
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default ShopNavigator;
