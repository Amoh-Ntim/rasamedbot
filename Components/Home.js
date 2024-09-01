import React, { useState } from 'react'
import { Button, Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import tw from 'twrnc'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import { FIREBASE_DATABASE } from '../firebase/FirebaseConfig';
import uuid from 'react-native-uuid';



const Home = ({ navigation }) => {
  const { width } = Dimensions.get('screen'); 
  const [focused, setFocused] = useState(false);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('');
  // const [uniqueImageName, setUniqueImageName] = useState('');

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const ITEM_WIDTH = width * 1;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.7;
  

  const upload = async () => {
    try {
      await setDoc(doc(FIREBASE_DATABASE, "users", "eJi1FNZ7xFvYctcLTwmW"), {
        username: username,
      });
      console.log('Username submitted successfully!');
      navigation.navigate('Welcome'); // Navigate to Welcome screen after submission
    } catch (error) {
      console.error('Error submitting username:', error.message);
    }
  };

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //     console.log('Image URI:', result.assets[0].uri);

  //     // upload();
  //   }
  // };

  return (
    <ImageBackground
      source={require('../assets/Waimakariri.png')} // Replace with your asset path
      style={[tw`flex-1 justify-center items-center bg-opacity-10`, styles.backgroundImage]}
      resizeMode="cover" // Adjust resize mode as needed (e.g., 'contain', 'stretch')
    >

    <View style={tw`bg-white p-8 rounded-xl `}>
    <View style={tw`flex justify-center items-center mb-8`}>
     <Text style={tw`text-3xl font-bold flex items-center`}> CREATE PROFILE</Text>
    </View>
    <View style={tw`text-2xl font-bold flex justify-center items-center mb-4`}>
      <Text style={tw`text-xl font-semibold`} >Choose a username</Text>
      <Text style={tw`text-xl font-semibold`} >for your account</Text>
    </View>
    {/* profile pic */}
    {/* <View style={tw`flex justify-center items-center mt-4 mb-4`}>
    {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
    {/* </View> */}
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
    {/* access camera */}
    {/* <View style={tw`flex justify-center items-center mt-8`}>
      <Button title="Select Profile Picture" onPress={pickImage} />
    </View> */}
    <View style={tw`flex justify-center items-center mt-8`}>
      <Button title="Next" onPress={upload} />
    </View>
    </View>
    </ImageBackground>
      
  )
}

const styles = StyleSheet.create({
  container: {
    // Add any container styles you need here
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textInput: {
    backgroundColor: 'white', // Adjust background color if needed
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  focused: {
    borderColor: '#63CCFF', // Border color when focused
    borderWidth: 1,
  },
});

export default Home


// const handleCreate = async () => {
//   if (!image) {
//     console.error("Please select an image to upload.");
//     return; // Prevent further execution if no image is selected
//   }

//   try {
//     const storageRef = ref(FIREBASE_STORAGE, 'image');
//     const uploadResult = await uploadBytes(storageRef, image); // Upload the image

//     const userData = {
//       username: username,
//       imageUrl: uploadResult.metadata.fullPath // Get the uploaded image URL
//     };

//     await setDoc(doc(FIREBASE_DATABASE, "users", "eJi1FNZ7xFvYctcLTwmW"), userData);
//     console.log("Data submitted successfully!");
//   } catch (error) {
//     console.error(error.message);
//   }
// };