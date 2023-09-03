import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
  })
  if (!fontsLoaded) {
    return null
  } else {
    return (
      <View style={styles.landingPage}>
        <View style={styles.container1}>
          <Text style={styles.secondaryTitle}>Welcome to</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  landingPage: {
    flex: 1,
    backgroundColor: '#043C2C'
  },

  container1: {
    flex: 1,
    position: 'relative',
    top: '4%',
    backgroundColor: '#fff',
    marginTop: '30%',
    marginBottom: '50%',
    marginHorizontal: '10%',
  },

  secondaryTitle: {
    color: '#CEE2D2',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: 32,
  },
});