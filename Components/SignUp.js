import React, { useState } from 'react';
import { Button, TextInput, View, Text, Dimensions, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
// import auth from '@react-native-firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase/FirebaseConfig';
import tw from 'twrnc';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const auth = FIREBASE_AUTH;
  const { width } = Dimensions.get('screen');
  const handleSignUp = async () => {
    setIsLoading(true); // Set loading state to true before sign-up

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!'); // Log success for debugging
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      // handle signup errors (e.g., display an error message)
    } finally {
      setIsLoading(false); // Set loading state to false after sign-up attempt
    }
  };
const ITEM_WIDTH = width * 1;
const ITEM_HEIGHT = ITEM_WIDTH * 0.7;

  return (
<KeyboardAvoidingView behavior="position">
    <View style={tw`flex`}>
    <View style={tw`rounded-b overflow-hidden`}>
    <Image
      source={require('../assets/undraw_medicine.png')}
      style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40,
        // borderRadius: 14,
        resizeMode: 'contain'
      }}
    />
    </View>
    <View style={ tw`rounded-lg m-4` }>
    <View style={tw`flex justify-center items-center`}>
     <Text style={tw`text-2xl font-bold flex items-center text-[#6C63FF]`}> SIGN UP</Text>
    </View>
    <View style={ tw`text-xl p-2` }>
    <View style={ tw`mt-12` }>
      <TextInput
      style={ tw`text-xl` }
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
    </View>
      <View style={ tw`mt-12` }>
      <TextInput
      style={ tw`text-xl` }
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      </View>
      <View style={ tw`mt-12` }>
      <TextInput
        style={ tw`text-xl` }
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      </View>
      <View style={ tw`bg-[#6C63FF] mt-12` }>
      <Button
        style={tw`rounded-lg p-8 h-16 flex justify-center items-center`} // Adjust styles as needed
        title={isLoading ? '' : 'Sign Up'} // Set title based on loading state
        onPress={handleSignUp}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading && <ActivityIndicator size="small" color="blue" />} {/* Show ActivityIndicator when loading */}
      </Button>
      </View>
      <View style={ tw`flex justify-center items-center mt-12` }>
      <Text style={ tw`text-xl` }>Already have an account?<Text style={tw`text-[#6C63FF] text-xl`} onPress={() => navigation.navigate('SignIn')}>Sign In</Text></Text>
      </View>
    </View>
    </View>
    </View>
     </KeyboardAvoidingView>
  );
};

export default SignUp;



// import { Image, StyleSheet, Text, View } from "react-native";
// import React from "react";

// const LoginScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.topImageContainer}>
//         <Image
//           source={require("../assets/topVector.png")}
//           style={styles.topImage}
//         />
//       </View>
//       <View style={styles.helloContainer}>
//         <Text style={styles.helloText}>Hello</Text>
//       </View>
//       <View>
//         <Text style={styles.signInText}>Sign in to your account</Text>
//       </View>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F5F5F5",
//     flex: 1,
//   },
//   topImageContainer: {},
//   topImage: {
//     width: "100%",
//     height: 130,
//   },
//   helloContainer: {},
//   helloText: {
//     textAlign: "center",
//     fontSize: 70,
//     fontWeight: "500",
//     color: "#262626",
//   },
//   signInText: {
//     textAlign: "center",
//     fontSize: 18,
//     color:"#262626"
//   },
// });