import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";
import colors from "../constants/colors";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductScreen from "../screens/user/UserProductScreen";

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
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
        name="UserProductScreen"
        component={UserProductScreen}
        options={(navData) => ({
          title: "Your Products",
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
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="cart"
                iconName={Platform.OS === "android" ? "md-add" : "ios-add "}
                color="black"
                onPress={() => {
                  navData.navigation.navigate("EditProductScreen", {
                    productId: null,
                  });
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={(navData) => {
          // console.log(navData);

          const submitFunc = navData.route.params.submit;
          return {
            title: navData.route.params?.productId
              ? "Edit Product"
              : "Add Product",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Save"
                  iconName={
                    Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                  }
                  color="black"
                  onPress={() => {
                    submitFunc();
                    navData.navigation.goBack();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
