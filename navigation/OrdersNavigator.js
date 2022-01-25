import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import OrdersScreen from "../screens/shop/OrdersScreen";
import HeaderButton from "../components/UI/HeaderButton";
import colors from "../constants/colors";

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primary : "white",
        },
        headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={(navData) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                color="black"
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;
