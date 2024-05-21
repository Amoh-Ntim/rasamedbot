import React, { useState } from 'react';
import { Button, TextInput, View, Text, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../firebase/FirebaseConfig';
import tw from 'twrnc';
// import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading statem

  const auth = FIREBASE_AUTH;
  const handleSignIn = async () => {
    setIsLoading(true); // Set loading state to true before sign-in

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;

      console.log('Signed in with user:', user.email); // Log the user's email for debugging
      // navigation.navigate('Home');
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/user-not-found') {
        alert('User account not found. Please create an account.');
      } else {
        alert('An error occurred. Please try again later.');
      }
      console.error(error);
    }finally {
      setIsLoading(false); // Set loading state to false regardless of success/failure
    }
  };

  return (
    <View style={ tw`text-xl` }>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}
      <Text style={ tw`text-xl` } onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign In
      </Text>
    </View>
  );
};

export default SignIn;
