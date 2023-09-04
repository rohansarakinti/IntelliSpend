import React from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const CustomSpinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 10, fontSize: 18, color: '#043C2C' }}>Loading...</Text> {/* HELP WHY ISNT THE LOADING TEXT SHOWING UP */}
      <Animatable.View
        animation="pulse" // Use "pulse" animation for noticeable pulsing effect
        easing="ease-out" // Use "ease-out" easing for smoother animation
        iterationCount="infinite" // Keep pulsing infinitely
        style={{
          width: 150, // Increase the size of the spinner dots
          height: 150,
          backgroundColor: '#CEE2D2', // Adjust the color as needed
          borderRadius: 75,
        }}
      ></Animatable.View>
    </View>
  );
};

export default CustomSpinner;
