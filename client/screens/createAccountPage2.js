import {Text, View, StyleSheet, StatusBar, TextInput, Pressable, ScrollView, Alert} from 'react-native';
import * as React from 'react'
import { useFonts } from '@expo-google-fonts/poppins';
import { RadioButton } from 'react-native-paper';

const createAccountPage2 = () => {

    const [checked, setChecked] = React.useState('');

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
            
                <Pressable
                onPress= {()=> {
                    Alert.alert('Submit button pressed')
                }}
                style = {styles.termPressable}
                >
                <Text style={styles.radioLabel}>Terms of policies</Text>
                </Pressable>

                <RadioButton
                value="Yes"
                status={ checked === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Yes')}
                color='green'
                backgroundColor='lightgreen'
                width='10%'
                height='5%'
                top='50%'
                right='25%'
                />

                <Text style={styles.radioButtonLabelYes}>I agree</Text>

                <Pressable
                onPress={() => {
                Alert.alert('Log In button pressed') 
                }}
                style={({pressed}) => [
                {
                    backgroundColor: pressed ? '#5BC641' : '#72EC55' 
                }, styles.createAccountSubmit
                ]}
                >
                <Text style={styles.createAccountSubmitText}>Submit</Text>
                </Pressable>
                <StatusBar style="auto" />
          </View>
        
      );
    }
}
  
const styles = StyleSheet.create({
  container:{
    padding: '10%',
    backgroundColor: 'white',
    position: 'relative',
    height: '100%',
    alignItems: 'center'
  },
  radioLabel: {
    position:'absolute',
    color: "#333",
    fontFamily : "Poppins-Medium",
    top: '30%',
    fontSize: '35%',
    padding:  '0%',
    textDecorationLine: 'underline',
    textDecorationColor: '#5BC641',
    textDecorationStyle: 'solid'
  },
  termPressable: {
    position: 'absolute',
    alignItems: 'center',
    top: '30%'
  },
  radioButtonLabelYes: {
    position: 'absolute',
    color: '#333',
    fontFamily: 'Poppins-Regular',
    fontSize: '30%',
    top: '55%',
    left: '52%'
  },
  createAccountSubmit: {
    position: 'absolute',
    width: '50%', 
    height: '8%',
    top: "77%",  
    borderRadius: 10, 
    shadowColor: '#171717', 
    shadowOffset: { width: 0, height: 4}, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    alignItems: 'center',
    marginLeft: '30%'
  },
  createAccountSubmitText: {
    fontFamily: 'Poppins-Medium', 
    marginTop:'auto', 
    marginBottom: 'auto', 
    fontSize: 19,
  }
})


export default createAccountPage2