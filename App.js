import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Rootnavigation from './src/RootNavigation';
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <>
    <Rootnavigation/>
    <Toast/>
    </>
    
  )
};


export default App;
