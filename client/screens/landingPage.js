import React from 'react'
import {Text, View, StyleSheet} from 'react-native';

function LandingPage() {
  return (
    <>
    {/ Whole Page /}
    <View styles={styles.landingPage}>

        {/ Container Holding Content /}
        <View styles={styles.container}>

            {/ Container holding headers (Title) and Line /}
            <View class="title_container">
                
                {/ Smaller Heading: "Welcome To" /}
                <Text class="secondary_heading">
                    Welcome to
                </Text>
                
                {/ Bigger Heading: "Intellispend" /}
                <Text class="primary_heading">
                    Intellispend
                </Text>

                {/ Insert Line Here /}

            </View>

            {/ Container Holding Buttons/}
            <View class="button_container">



            </View>

        </View>

    </View>

    </>
    
  )
}

const styles = StyleSheet.create({
    landingPage: {
        height: '100%',
        backgroundColor: '#043C2C',
    },
    container: {
        
    }
})

export default LandingPage

