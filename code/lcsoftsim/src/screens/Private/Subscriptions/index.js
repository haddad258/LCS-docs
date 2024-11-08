import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../../core/theme';
import { Subscription } from '../../../service';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const Subscriptions = () => {
  const [searchText, setSearchText] = useState('');
  const [subscriptionList, setSubscriptionList] = useState([]);
  const getSubscriptionList = async () => {
    console.log('getSubscriptionList');
    try {
      const list = await Subscription.getSubscriptions();
      console.log(list);
      if (list) setSubscriptionList(list);
    } catch (error) {
      console.error('Error fetching subscription list:', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      console.log('Subscriptions component is focused');
      getSubscriptionList();
      return () => {
        console.log('Subscriptions component is unfocused');
      };
    }, [])
  );
  useEffect(() => {
    getSubscriptionList();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      <View style={styles.cardBody}>
        <Text style={styles.imsi}>imsi-{item.Profile?.imsi}</Text>
        <Text style={styles.profileAttr}>
          profile Number:  {item.Profile?.number}
        </Text>
        <Text style={styles.profileIMSI}>{item.Profile?.iccid}</Text>
        <Text style={styles.profileIMSI}>{item.Profile?.mcc}-{item.Profile?.mnc} </Text>
        <Text style={styles.profileIMSI}>ref/{item.Profile?.norm_ref}- {item.Profile?.type} </Text>

      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.beds}>{item.imei} </Text>
        <View>
          <Text>SoftSIM </Text>
          <View style={{ alignSelf: 'center' }}>
            <FontAwesome5 onPress={() => alert("TO DO ACTIVATE PROFILE \n" + item.Profile?.iccid)} name="play-circle" color={"#2dc076"} size={25} />
          </View>
        </View>
        <View>
          <Text> Esim </Text>
          <View style={{ alignSelf: 'center' }}>
            <FontAwesome5 onPress={() => alert("TO DO ACTIVATE PROFILE esim \n" + item.Profile?.lpa_esim)} name="play-circle" color={"#2dc076"} size={25} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Filtered data based on search text (currently not implemented)
  const filteredData = subscriptionList.filter((item) => {
    return item;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        {/* Search input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      {/* FlatList to display subscription items */}
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: Colors.primary,
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  propertyListContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardBody: {
    padding: 10,
  },
  imsi: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileIMSI: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.gray
  },
  profileAttr: {
    fontSize: 17,
    color: Colors.primary,
    fontWeight: '700',
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  beds: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  baths: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
  parking: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
});

export default Subscriptions;
