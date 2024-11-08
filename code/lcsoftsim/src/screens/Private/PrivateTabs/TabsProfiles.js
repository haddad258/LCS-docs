import * as React from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import Menu from "../Menu";
import Ordres from "../StackOrdres";
import MyCart from "../Cart";
import PlanPacksTest from '../PlanPacks/index.palntoupdate'
import PlanPacks from '../PlanPacks'
import Subscriptions from '../Subscriptions'
import EditInfo from "../EditInfo";
import { Colors } from "../../../core/theme";
import { Badge } from 'react-native-elements';
import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator();
function TabsProfiles(props) {
    const Cartreducer = useSelector(state => state.cartReducer.products)
    return (
        <Tab.Navigator
            initialRouteName="TabsProfiles"
            screenOptions={{
                headerTitleStyle: styles.headerTitleStyle,
                tabBarActiveTintColor: Colors.info,
                tabBarInactiveTintColor: Colors.secondary,
                tabBarStyle: { backgroundColor: Colors.white },
                headerStyle: styles.headerStyle,
                headerShown: false
            }}>
            <Tab.Screen
                options={{
                    title: "Menu",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="align-justify" color={color} size={size} />
                    ),
                }}
                name="Menu"
                component={Menu}
            />
            <Tab.Screen
                options={{
                    title: "cart",
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ width: 24, height: 24, margin: 5 }}>
                            <FontAwesome5 name="shopping-bag" color={color} size={size} />
                            {Object.values(Cartreducer).length > 0 && <Badge
                                value={Object.values(Cartreducer).length}
                                status="error"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            />}
                        </View>
                    ),
                }}
                name="MyCart"
                component={MyCart}
            />
            <Tab.Screen
                options={{
                    title: "Plans",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="tablet-mobile-combo" color={color} size={size} />
                    ),
                }}
                name="PlanPacks"
                component={PlanPacks}
            />
            <Tab.Screen
                options={{
                    title: "Ordres",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="cubes" color={color} size={size} />
                    ),
                }}
                name="myOrdres"
                component={Ordres}
            />
            <Tab.Screen
                options={{
                    title: "SOFT-SIM",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="address-book" color={color} size={size} />
                    ),
                }}
                name="mysofstim"
                component={Subscriptions}
            />
              <Tab.Screen
                options={{
                    title: "Edit",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-edit" color={color} size={size*0.8} />
                    ),
                }}
                name="EditInfo"
                component={EditInfo}
            />
            <Tab.Screen
                options={{
                    title: "Test",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="wpforms" color={color} size={size} />
                    ),
                }}
                name="FAQ"
                component={PlanPacksTest}
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
export default TabsProfiles;