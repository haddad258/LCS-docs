import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeModules } from 'react-native';
const { InvcaseModule } = NativeModules;
import {PutcharsINVCASE} from '../../../../modules/InvcaseModule/src/index'
// const invcaseModule = NativeModules.InvcaseModule;

function Offre() {

  const OnpressOffre = () => {
    console.log("hernativemodule", PutcharsINVCASE);
    // NativeModules.MyNativeModule.myNativeFunction("INVCASE LCS-myNativeFunction");
    // NativeModules.MyNativeModule.getChars("getChars LCS-getChars");
    // NativeModules.MyNativeModule.putChars("putChars lcs-putChars 09-03-lcs");
    PutcharsINVCASE('LCS-liberty-com-25032024')

    // InvcaseModule.sendStringAndGetMajString('LCS-liberty-com-25032024')
    // .then(majString => {
    //   console.log('Received major string:', majString);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
  
    // console.log(NativeModules.getChars("getchar offre")); // Output: ""
    // invcaseModule.putChars("Hello ssfrom React Native!");
    // console.log(invcaseModule.getChars()); // Output: "Hello from React Native!"
  }
  return (
    <TouchableOpacity onPress={() => OnpressOffre()} style={styles.container}>
      <Text style={styles.text}>Offre screen</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: "#FFAAFF"
  },
});

export default Offre;
