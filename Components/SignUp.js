import React, { useState } from 'react';
import { Button, TextInput, View, Text, Dimensions, Image } from 'react-native';
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
      // navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      // handle signup errors (e.g., display an error message)
    }
  };
const ITEM_WIDTH = width * 1;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;

  return (
    <View style={tw`flex`}>
    <View>
    <Image
      source={require('../assets/undraw_medicine.png')}
      style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        // borderRadius: 14,
        resizeMode: 'contain'
      }}
    />
    </View>
    <View style={ tw`rounded-lg m-4` }>
     <Text> SIGN UP</Text>
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
      <View style={ tw`mt-12` }>
      <Button style={ tw`rounded-lg p-8 h-16` } title="Sign Up" onPress={handleSignUp} />
      </View>
      <View style={ tw`mt-12` }>
      <Text style={ tw`text-xl` } onPress={() => navigation.navigate('SignIn')}>Already have an account? Sign In</Text>
      </View>
    </View>
    </View>
    </View>
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