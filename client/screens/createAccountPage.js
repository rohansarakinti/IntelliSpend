import {Text, View, StyleSheet, StatusBar, TextInput, Pressable, ScrollView, Alert} from 'react-native';
import * as React from 'react'
import { useFonts } from '@expo-google-fonts/poppins';
import { RadioButton } from 'react-native-paper';

const createAccountPage = () => {

    const [checked, setChecked] = React.useState('Yes');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phonenumber, setPhonenumber] = React.useState('');
    const [country, setCountry] = React.useState('');

    const [fontsLoaded] = useFonts({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold' : require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Medium' : require('../assets/fonts/Poppins-Medium.ttf')
    })
    if (!fontsLoaded) {
      return null
    } else {
      

      return (
        <ScrollView> 
          <View style={styles.container}>
            <View style={styles.inputSection}>
              <Text style={styles.createAccountInputLabels} >Name</Text>
              <View style={styles.line}></View>
              <TextInput style={styles.textInput} placeholder="Name"
              defaultValue='' onChangeText={newName => setName(newName)}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.createAccountInputLabels} >Email</Text>
              <View style={styles.line}></View>
              <TextInput style={styles.textInput} placeholder="example@email.com"
              defaultValue='' onChangeText={newEmail => setEmail(newEmail)}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.createAccountInputLabels}>Phone Number</Text>
              <View style={styles.line}></View>
              <TextInput style={styles.textInput} placeholder="+1 (111) 111-1111"
              defaultValue='' onChangeText={newPhonenumber => setPhonenumber(newPhonenumber)}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.createAccountInputLabels}>Country</Text>
              <View style={styles.line}></View>
              <TextInput style={styles.textInput} placeholder="Country"
              defaultValue='' onChangeText={newCountry => setCountry(newCountry)}
              />
            </View>
            
            <Text style={styles.radioLabel}>Monthly Newsletter for finance advice?</Text>
            
            <RadioButton
              value="Yes"
              status={ checked === 'Yes' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Yes')}
              color='green'
              backgroundColor='lightgreen'
              width='10%'
              height='5%'
              top='20%'
              left='10%'
            />

            <RadioButton
              value="No"
              status={ checked === 'No' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('No')}
              color='green'
              backgroundColor='lightgreen'
              width= '10%'
              height= '5%'
              top='15%'
              left='60%'
            />

            <Text style={styles.radioButtonLabelYes}>Yes</Text>
            <Text style={styles.radioButtonLabelNo}>No</Text>

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
        </ScrollView>
        
      );
    }
}
  
const styles = StyleSheet.create({
  container:{
    padding: '10%',
    backgroundColor: 'white',
    position: 'relative',
    paddingBottom: '100%'
  },
  inputSection:{
    position: 'relative',
    height: 170,
    top:10,
    padding: 0,
    left: 0
  },
  createAccountInputLabels: {
    top: '10%',
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    fontWeight: 600,
    position: 'absolute'
  },
  line: {
    top: '40%',
    width: '100%',
    borderBottomColor: '#239D54',
    borderBottomWidth: '2%',
    position: 'absolute'
  },
  textInput:{
    paddingHorizontal: '10%',
    position:'absolute',
    backgroundColor: '#72EC55',
    width: '100%',
    height: '30%',
    borderRadius: 10,
    top: '55%',
    color:"#239D54",
    fontFamily: 'Poppins-Regular',
    fontSize: '15%',
    borderColor: "#239D54",
    borderWidth: 3,

  },
  radioLabel: {
    position:'absolute',
    color: "#333",
    fontFamily : "Poppins-Medium",
    top: '100%',
    fontSize: '20%',
    padding: '10%'
  },
  radioButtonLabelYes: {
    position: 'absolute',
    color: '#333',
    fontFamily: 'Poppins-Regular',
    fontSize: '20%',
    top: '116%',
    left: '37%'
  },
  radioButtonLabelNo: {
    position: 'absolute',
    color: '#333',
    fontFamily: 'Poppins-Regular',
    fontSize: '20%',
    top: '116%',
    left: '87%'
  },
  createAccountSubmit: {
    position: 'absolute',
    width: '50%', 
    height: '8%',
    top: "135%",  
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


export default createAccountPage