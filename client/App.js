import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, Alert, Pressable} from 'react-native'
import { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import LandingPage from "./screens/landingPage"
import LoginPage from './screens/loginPage'
import CreateAccountPage2 from './screens/createAccountPage2'

// Define the main App component
export default function App() {
  return(
    <CreateAccountPage2 />
  )
}
;