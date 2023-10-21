import {Text, View, StyleSheet, StatusBar, TextInput, Pressable} from 'react-native';
import React from 'react'
import { useFonts } from '@expo-google-fonts/poppins';

const loginPage = () => {

    const[password, setPassword] = React.useState('');

    const [fontsLoaded] = useFonts({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold' : require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Medium' : require('../assets/fonts/Poppins-Medium.ttf')
    })
    if (!fontsLoaded) {
      return null
    } else {
        
      return (
        <View style={styles.container}>
          <Text style={styles.logInTitle} >Log In</Text>
          <View style={styles.line}></View>
          <TextInput style={styles.textInput} placeholder="Password"
          defaultValue='' onChangeText={newPassword => setPassword(newPassword)}
          />
          <Pressable
          onPress={() => {
            Alert.alert('Log In button pressed') 
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#5BC641' : '#72EC55' 
            }, styles.passwordSubmit
          ]}
          >
          <Text style={styles.passwordSubmitText}>Submit</Text>
          </Pressable>
          <Text style={styles.forgotPasswordText}>forgot password?</Text>
          <StatusBar style="auto" />
        </View>
      );
    }
}
  
const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    padding: '10%',
    backgroundColor: 'white',

  },
  logInTitle: {
    top: '300%',
    fontSize: 48,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    fontWeight: 600,
  },
  line: {
    top: '350%',
    width: '80%',
    borderBottomColor: '#239D54',
    borderBottomWidth: '2%',
  },
  textInput:{
    paddingHorizontal: '10%',
    position:'absolute',
    backgroundColor: '#72EC55',
    width: '90%',
    height: '75%',
    borderRadius: 10,
    top: '570%',
    color:"#239D54",
    fontFamily: 'Poppins-Regular',
    fontSize: '15%',
    borderColor: "#239D54",
    borderWidth: 3,

  },
  forgotPasswordText: {
    position:'absolute',
    color: "#239D54",
    fontFamily : "Poppins-SemiBold",
    top: '850%',
    fontSize: '20%'

  },
  passwordSubmit: {
    position: 'absolute',
    width: '50%', 
    height: '70%',
    top: "710%",  
    borderRadius: 10, 
    shadowColor: '#171717', 
    shadowOffset: { width: 0, height: 4}, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    alignItems: 'center'
  },
  passwordSubmitText: {
    fontFamily: 'Poppins-Medium', 
    marginTop:'auto', 
    marginBottom: 'auto', 
    fontSize: 19,
  }
})


export default loginPage