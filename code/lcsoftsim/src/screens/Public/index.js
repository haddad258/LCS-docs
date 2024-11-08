import * as React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "./Home";
import About from './About';
import Offre from './Offre';
import TabPrivate from '../Private';
import Help from './Help';
import Shop from './Shop';
import { Colors } from "../../core/theme";

const Tab = createBottomTabNavigator();

const TabPublic = () => {
  return (
    <Tab.Navigator
      initialRouteName="TabPublic"
      screenOptions={{
        headerTitleStyle: styles.headerTitleStyle,
        tabBarActiveTintColor: Colors.info,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarStyle: { backgroundColor: Colors.white },
        headerStyle: styles.headerStyle,
      }}>
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="store" color={color} size={size} />
          ),
        }}
        name="Shop"
        component={Shop}
      />
      <Tab.Screen
        options={{
          title: "Offre",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="grip-horizontal" color={color} size={size} />
          ),
        }}
        name="Offre"
        component={Offre}
      />
      <Tab.Screen
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cogs" color={color} size={size} />
          ),
        }}
        name="About"
        component={About}
      />
      <Tab.Screen
        options={{
          title: "Help",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="info-circle" color={color} size={size} />
          ),
        }}
        name="Help"
        component={Help}
      />
      <Tab.Screen
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" color={color} size={size} />
          ),
        }}
        name="TabPrivate"
        component={TabPrivate}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    textAlign: "left",
  },
  logout: {
    color: Colors.primary,
    textAlign: "left",
  },
  headerStyle: {
    backgroundColor: Colors.accent,
  },
});

export default TabPublic;
