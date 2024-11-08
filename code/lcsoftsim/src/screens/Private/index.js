import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './PrivateTabs/Login';
import Inscription from './PrivateTabs/Inscription';
import MyProfile from './PrivateTabs/TabsProfiles';
import { StyleSheet } from "react-native";
import { Colors } from "../../core/theme";

const Stack = createStackNavigator();

const TabPrivate = () => {
  return (
    <Stack.Navigator
      id="TabPrivate"
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: styles.headerTitleStyle,
        headerShown: false,
        headerBackVisible: false

      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          gestureResponseDistance: 75,
        }}
      />
      <Stack.Screen
        name="Inscription"
        component={Inscription}
        options={{
          title: "Create account",
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: "MyProfile",
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    textAlign: "left",
  },
  logout: {
    color: Colors.secondary,
    textAlign: "left",
  },
});

export default TabPrivate;
