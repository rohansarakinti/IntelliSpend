import {Text, View, StyleSheet, StatusBar, TextInput, Pressable, useCallback} from 'react-native';
import React from 'react'
import { useFonts } from '@expo-google-fonts/poppins';4
import PlaidLink from 'react-native-plaid-link-sdk';

const PlaidLinkPage = () => {

  const onSuccess = (success) => {
    console.log("1");
  }

  const onExit = (exit) => {
    console.log("2");
  }

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
            <PlaidLink
              tokenConfig={{
              token: '#GENERATED_LINK_TOKEN#',
              }}
              onSuccess={(success) => {
              console.log(success);
              }}
              onExit={(exit) => {
              console.log(exit);
              }}
            >
              <Text>Add Account</Text>
            </PlaidLink>
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