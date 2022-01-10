import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductOverviewScreen from "../screens/shop/ProductOverview";
import ProductDetailScreen from "../screens/shop/ProductDetail";

import colors from "../constants/colors";

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? colors.primary : "white",
          },
          headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
          statusBarStyle: "dark",
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          name="ProductsOveviewScreen"
          component={ProductOverviewScreen}
          options={{
            title: "All Products",
          }}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={(navData) => ({
            title: navData.route.params.productTitle,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
