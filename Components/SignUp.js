import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
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

  return (
    <View style={ tw`bg-blue-500 bg-opacity-20 rounded-lg m-4` }>
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
  );
};

export default SignUp;
