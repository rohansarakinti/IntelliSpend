import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';

// Define the main App component
export default function App() {
  // Load custom fonts using the 'useFonts' hook
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  // Define a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async task (e.g., loading data)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the task is done
    }, 3000); // Simulated 3-second loading time
  }, []);

  // Check if fonts are not yet loaded or isLoading is true, return a loading screen
  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {/* Custom Dot Pulse Spinner */}
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.customSpinner}
        ></Animatable.View>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  } else {
    // Return the main content when fonts are loaded and loading is complete
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
    );
  }
}

// Define styles using StyleSheet.create for the CSS section
const styles = StyleSheet.create({
  // Style for the overall loading container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#043C2C', // Background color
  },

  // Custom Dot Pulse Spinner styles
  customSpinner: {
    width: 150,
    height: 150,
    backgroundColor: '#CEE2D2', // Adjust the color as needed
    borderRadius: 75,
  },

  // Loading text styles
  loadingText: {
    marginTop: 30, // Add space between the spinner and text
    fontSize: 24, // Adjust the font size as needed
    color: '#CEE2D2', // Text color
    fontFamily: 'Poppins-Regular', // Custom font
  },

// Dot Pulse Spinner styles
  spinner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CEE2D2',
    marginHorizontal: 5,
  },

  // Style for the overall landing page
  landingPage: {
    flex: 1,
    backgroundColor: '#043C2C', // Background color
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
  },
});