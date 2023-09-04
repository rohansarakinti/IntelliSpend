// Import necessary modules and components
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'

// Define the main App component
export default function App() {
  // Load custom fonts using the 'useFonts' hook
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
  })

  // Check if fonts are not yet loaded, return null to display nothing
  if (!fontsLoaded) {
    return null
  } else {
    // Return the main content when fonts are loaded
    return (
      <View style={styles.landingPage}>
        <View style={styles.container1}>
          {/* Secondary Title */}
          <Text style={styles.secondaryTitle}>Welcome to</Text>
          {/* Primary Title */}
          <Text style={styles.primaryTitle}>Intellispend</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    )
  }
}

// Define styles using StyleSheet.create for the CSS section
const styles = StyleSheet.create({
  // Style for the overall landing page
  landingPage: {
    flex: 1,
    backgroundColor: '#043C2C' // Background color
  },

  // Style for the container holding titles
  container1: {
    flex: 1,
    position: 'relative',
    top: '4%',
    backgroundColor: '#fff', // Background color
    marginTop: '30%', // Top margin
    marginBottom: '50%', // Bottom margin
    marginHorizontal: '10%', // Horizontal margin
  },

  // Style for the secondary title
  secondaryTitle: {
    color: '#CEE2D2', // Text color
    fontFamily: 'Poppins-Regular', // Custom font
    textAlign: 'center', // Text alignment
    fontSize: 32, // Font size
  },

  // Style for the primary title
  primaryTitle: {
    color: '#043C2C', // Text color
    fontFamily: 'Poppins-Regular', // Custom font
    textAlign: 'center', // Text alignment
    fontSize: 48, // Font size
  }
});
