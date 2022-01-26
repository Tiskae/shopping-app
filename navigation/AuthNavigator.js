import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/user/AuthScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
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
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
