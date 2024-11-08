import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const YourComponent = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.commonText}>{item.code}</Text>

      <View style={styles.rowContainer}>
        {true ? (
          <>
            <Text style={styles.priceText}>{item.name}</Text>
            <Text style={styles.detailsText}>{item.slug}</Text>
          </>
        ) : (
          <Text style={styles.noPriceText}>No price available</Text>
        )}
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Default is column, no need to specify
    alignItems: 'flex-start', // Align items to the start of the cross axis
  },
  rowContainer: {
    flexDirection: 'row', // Arrange items in a row
  },
  commonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 10,
  },
  detailsText: {
    fontSize: 14,
    color: 'gray',
  },
  noPriceText: {
    fontSize: 16,
    color: 'red',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 5,
    width: '100%', // Adjust the width as needed
  },
});

export default YourComponent;
