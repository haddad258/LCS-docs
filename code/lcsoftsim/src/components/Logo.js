import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/HomeLOgin.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: "60%",
    height: "10%",
  },
})