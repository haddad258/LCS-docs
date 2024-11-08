import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../../core/theme';

const Help = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      image: require("../../../assets/search.jpg"),
      title: "Easy To Search",
      description: "Maecenas elementum est ut nulla blandit ultrices. Nunc quis ipsum urna. Aenean euismod sollicitudin nunc, ut rutrum magna ultricies eget",
      pub: "Experience seamless connectivity anywhere with our cutting-edge eSIM technology. No physical SIM cards needed – just virtual freedom in your device!"
    },
    {
      image: require("../../../assets/access.jpg"),
      title: "Easy To Access",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat elementum laoreet. Nunc id quam et eros molestie finibus",
      pub: "Unlock a world of travel without changing SIM cards. Our eSIM technology ensures instant, hassle-free connectivity on the go."
    },
    {
      image: require("../../../assets/manage.jpg"),
      title: "Easy To Manage",
      description: "Mauris vulputate interdum nibh vel tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
      pub: "Say goodbye to SIM swapping! Embrace the future with our eSIM solution – the key to effortless global connectivity and unmatched convenience."
    }
  ];

  const nextStep = () => {
    setCurrentStep(currentStep >= 2 ? 2 : currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep <= 0 ? 0 : currentStep - 1);
  };

  return (
    <View style={styles.container}>
      <Image source={steps[currentStep].image} style={styles.stepImage} resizeMode="cover" />
      <View style={styles.stepIndicatorView}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={{
              ...styles.stepIndicator,
              width: currentStep === index ? 40 : 30,
              backgroundColor: currentStep === index ? Colors.gray : Colors.white
            }}
          ></View>
        ))}
      </View>
      <Text style={styles.title}>{steps[currentStep].title}</Text>
      <Text style={styles.description}>{steps[currentStep].pub}</Text>
      <View style={styles.navigationView}>
        {currentStep > 0 ? (
          <TouchableOpacity
            onPress={() => prevStep()}
            style={{ ...styles.navigationBtn, borderTopEndRadius: 20, borderBottomEndRadius: 20 }}>
            <Text style={styles.navigationBtnTxt}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <TouchableOpacity
          onPress={() => nextStep()}
          style={{ ...styles.navigationBtn, borderTopStartRadius: 20, borderBottomStartRadius: 20 }}>
          <Text style={styles.navigationBtnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepImage: {
    width: '90%',
    height: '50%',
    marginVertical: 30,
  },
  stepIndicatorView: {
    flexDirection: 'row',
  },
  stepIndicator: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  navigationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  navigationBtn: {
    backgroundColor: Colors.primary,
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Help;
