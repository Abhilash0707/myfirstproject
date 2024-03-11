// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';


const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a loading process or any initialization logic
    const timer = setTimeout(() => {
      // Navigate to the login screen after a certain delay
      navigation.replace('Drawernav');
    }, 2000); // Adjust the delay time as needed

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Image source={require('./path/to/your/splash_image.png')} style={styles.logo} /> */}
      <Text>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set the background color as needed
  },
  logo: {
    width: 200, // Adjust the width and height of the image
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
