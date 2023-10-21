import {Text, View, StyleSheet, StatusBar, TextInput, Pressable} from 'react-native';
import React from 'react'
import { useFonts } from '@expo-google-fonts/poppins';

const ExpensesPage = () => {

    const budget = 100000;
    const spent = 5000;
    

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold' : require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Medium' : require('../assets/fonts/Poppins-Medium.ttf')
      })
      if (!fontsLoaded) {
        return null
      } else {
          
        return (
          <View>
            <View style= {styles.container}>

            </View>
            <StatusBar style="auto" />
          </View>
        );
      }
  }
  
  const styles = StyleSheet.create({
    container:{
        height: '100%',
        alignItems: 'center',
        padding: '10%',
    
    },
  })

export default ExpensesPage