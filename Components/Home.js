import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import tw from 'twrnc'

const Home = ({ username, setUsername, placeholder }) => {
  const { width } = Dimensions.get('screen');
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const ITEM_WIDTH = width * 1;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.7;
  return (
    <ImageBackground
      source={require('../assets/Waimakariri.png')} // Replace with your asset path
      style={[tw`flex-1 justify-center items-center bg-opacity-10`, styles.backgroundImage]}
      resizeMode="cover" // Adjust resize mode as needed (e.g., 'contain', 'stretch')
    >

    <View style={tw`bg-white p-8 rounded-xl `}>
    <View style={tw`flex justify-center items-center mb-8`}>
     <Text style={tw`text-3xl font-bold flex items-center`}> CREATE USERNAME</Text>
    </View>
    <View style={tw`text-2xl font-bold flex items-center mb-4`}>
      <Text style={tw`text-lg font-semibold`} >Choose a username for your account</Text>
      <Text style={tw`text-lg font-semibold`}>You can always change it later</Text>
    </View>
      <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          focused && styles.focused, // Apply rounded styles when focused
        ]}
        value={username}
        onChangeText={setUsername}
        placeholder="Tap here to enter your Username"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
    </View>
    </ImageBackground>
      
  )
}

const styles = StyleSheet.create({
  container: {
    // Add any container styles you need here
  },
  textInput: {
    backgroundColor: 'white', // Adjust background color if needed
    padding: 10,
    borderRadius: 10,
  },
  focused: {
    borderColor: '#63CCFF', // Border color when focused
    borderWidth: 1,
  },
});

export default Home
