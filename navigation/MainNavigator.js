import React from "react";
import { Platform, StatusBar, SafeAreaView, Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import ProductsNavigator from "./ProductsNavigator";
import OrdersNavigator from "./OrdersNavigator";
import AdminNavigator from "./AdminNavigator";

import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

///////////////////////////////////
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    // <NavigationContainer>
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
        drawerContent: (props) => (
          <View>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={colors.primary}
                onPress={() => {}}
              />
            </SafeAreaView>
          </View>
        ),
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
    // </NavigationContainer>
  );
};
/////////////////////////////////////
const FinalNavigator = () => (
  <NavigationContainer>
    <StatusBar
      backgroundColor={Platform.OS === "android" ? colors.primary : "white"}
      translucent={false}
      barStyle={Platform === "android" ? "dark-content" : "light-content"}
    />
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthNavigator}
        options={{
          headerTitle: "Authenticate",
          headerShown: true,
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? colors.primary : "white",
          },
          headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
          headerTitleStyle: { fontFamily: "open-sans-bold" },
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default FinalNavigator;
