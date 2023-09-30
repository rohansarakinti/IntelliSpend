import React from 'react'
import {Text, View, StyleSheet, Image, Pressable, StatusBar} from 'react-native';
import { useFonts } from '@expo-google-fonts/poppins';

function LandingPage() {
    // Load custom fonts using the 'useFonts' hook
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
          <Image style={styles.logo_title} source={require('../assets/Intellispend_Logo.png')} />
          <View style={styles.line}></View>
          <Pressable
          onPress={() => {
            Alert.alert('Log In button pressed') 
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#5BC641' : '#72EC55' 
            }, styles.login_button
          ]}
          >
            <Text style={styles.login_button_text}>Log In</Text>
          <Image style={{position:'absolute', top:'20%', left:'70%'}}source={require('../assets/login_icon.png')}/>
          </Pressable>
  
          <Pressable
          onPress={() => {
            Alert.alert('Sign Up button pressed') 
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#5BC641' : '#72EC55' 
            }, styles.signup_button
          ]}
          >
            <Text style={styles.signup_button_text}>Sign Up</Text>
          <Image style={{position:'absolute', top:'25%', left:'68%'}}source={require('../assets/signup_icon.png')}/>
          </Pressable>
          <StatusBar style="auto" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    logo_title: {
      width: '100%', 
      height: '50%',
      marginLeft:'auto', 
      marginRight:'auto',
      top: '20%'
    },
    line: {
      top: '20%',
      width: '70%',
      borderBottomColor: '#239D54',
      borderBottomWidth: '2%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    login_button: { 
      width: '50%', 
      height: '10%', 
      marginLeft: 'auto', 
      marginRight:'auto', 
      top:'30%', 
      borderRadius: 10, 
      shadowColor: '#171717', 
      shadowOffset: { width: 0, height: 4}, 
      shadowOpacity: 0.2, 
      shadowRadius: 2,
    },
    login_button_text: {
      fontFamily: 'Poppins-Medium', 
      left:'21%', 
      marginTop:'auto', 
      marginBottom: 'auto', 
      fontSize: 19,
    },
    signup_button: {
      width: '50%', 
      height: '10%', 
      marginLeft: 'auto', 
      marginRight:'auto', 
      top:'40%', 
      borderRadius: 10, 
      shadowColor: '#171717', 
      shadowOffset: { width: 0, height: 4}, 
      shadowOpacity: 0.2, 
      shadowRadius: 2,
    },
    signup_button_text: {
      fontFamily: 'Poppins-Medium', 
      left:'17%', 
      marginTop:'auto', 
      marginBottom: 'auto', 
      fontSize: 19,
    }
  })

export default LandingPage
