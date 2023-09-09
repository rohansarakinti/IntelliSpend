import React from 'react'
import {Text, View, StyleSheet} from 'react-native';

function LandingPage() {
  return (
    <>
    {/* Whole Page */}
    <View style={styles.landingPage}>

        {/* Container Holding Content */}
        <View style={styles.container}>

            {/* Container holding headers (Title) and Line */}
            <View style={styles.titleContainer}>
                
                {/* Smaller Heading: "Welcome To" */}
                <Text style={styles.secondaryHeading}>
                    Welcome to
                </Text>
                
                {/* Bigger Heading: "Intellispend" */}
                <Text style={styles.primaryHeading}>
                    Intellispend
                </Text>

                {/* Insert Line Here */}

            </View>

            {/* Container Holding Buttons */}
            <View style={styles.buttonContainer}>

                {/* Add buttons or content here */}
                
            </View>

        </View>

    </View>

    </>
    
  )
}

const styles = StyleSheet.create({
    landingPage: {
        height: '100%', // Set the height to 100% of the parent container
        backgroundColor: '#043C2C', // Background color
    },
    container: {
        // Define container styles here if needed
    },
    titleContainer: {
        // Define styles for the title container
    },
    secondaryHeading: {
        // Style for the smaller heading
    },
    primaryHeading: {
        // Style for the bigger heading
    },
    buttonContainer: {
        // Define styles for the button container
    }
})

export default LandingPage
