import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../Component/Header';

const TestScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Header/>
        <Text>TestScreen</Text>
       
    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({})