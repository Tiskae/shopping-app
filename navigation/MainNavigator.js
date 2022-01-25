import React from "react";
import { Platform, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import ProductsNavigator from "./ProductsNavigator";
import OrdersNavigator from "./OrdersNavigator";
import AdminNavigator from "./AdminNavigator";

import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Platform.OS === "android" ? colors.primary : "white"}
        translucent={false}
        barStyle={Platform === "android" ? "dark-content" : "light-content"}
      />
      <Drawer.Navigator
        screenOptions={{
          gestureEnabled: true,
          drawerType: "front",
          headerTitleAlign: "center",
          headerShown: false,
          drawerActiveTintColor: colors.primary,
          drawerContentStyle: {
            padding: 0,
            margin: 0,
          },
        }}
      >
        <Drawer.Screen
          name="ProductsNavigator"
          component={ProductsNavigator}
          options={{
            title: "Products",
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="OrdersNavigator"
          component={OrdersNavigator}
          options={{
            title: "Your Orders",
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="AdminNavigator"
          component={AdminNavigator}
          options={{
            title: "Admin",
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
