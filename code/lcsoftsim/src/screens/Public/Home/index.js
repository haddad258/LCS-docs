import React, { useEffect, useState , useCallback} from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Item from './Plan'
import { Colors } from "../../../core/theme";
import { PlanPank } from "../../../service";
import { useFocusEffect } from '@react-navigation/native';
function Esim() {
    const [List, setList] = useState([])
    const getList = async () => {
        var list = await PlanPank.getPlanPack()
        if (list) {
            setList(list)
            console.log(list)
        }
    }
    useEffect(() => {
        getList()
    }, [])
    useFocusEffect(
        useCallback(() => {
          console.log('HomeScreen is focused');
          getList()
          return () => {
            console.log('HomeScreen is unfocused');
          };
        }, [])
      );
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.light }}>
            <FlatList
                data={List}
                numColumns={2}
                vertical
                renderItem={({ item }) => (<Item item={item} />)}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
export default Esim;
