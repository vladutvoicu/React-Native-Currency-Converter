import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "../screens/Home";
import CurrencyList from "../screens/CurrencyList";

export default Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: "slide_from_bottom" }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CurrencyList"
          component={CurrencyList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
