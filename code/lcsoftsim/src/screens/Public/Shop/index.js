import React, { useEffect, useState } from "react";
import { ScrollView, FlatList, StyleSheet, Dimensions, View,Text } from "react-native";
import Item from '../../../components/Component/Category'
import ItemProduct from '../../../components/Component/PlanPack'
import { Colors } from "../../../core/theme";
import { Categories, PlanPank } from "../../../service";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ListCategories(props) {
  const [List, setList] = useState([]);
  const [ListPlanpack, setListPlanpack] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoryList = await Categories.getCategories();
      setList(categoryList || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  function empty() {
    return (

      <View >
        <Text style={styles.descriptionEmpty} >{'There is no item for thiscategories.'}</Text>
      </View>

    );
  }
  const fetchPlanPack = async (item) => {
    try {
      setListPlanpack([]);
      const planPacklist = await PlanPank.getPlanPackbyCategory(item.id);
      setListPlanpack(planPacklist || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPlanPackAll = async (item) => {
    try {
      const planPacklist = await PlanPank.getPlanPack();
      setListPlanpack(planPacklist || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchPlanPackAll()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <FlatList
          data={List}
          renderItem={({ item }) => (<Item item={item} onpress={(id) => fetchPlanPack(id)} />)}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.planPackContainer}>
          <FlatList
            data={ListPlanpack}
            renderItem={({ item }) => (<ItemProduct item={item} props={props} />)}
            keyExtractor={item => item.id}
            ListEmptyComponent={empty()}

          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionEmpty: {
    color: Colors.black,
    marginTop:30,
    textAlign:"center"
  },
  categoryContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: Colors.white,
    height: windowHeight / 5,
    width: windowWidth,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginTop: windowHeight / 5,
  },
  planPackContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    marginBottom: 120,
  },
});

export default ListCategories;
