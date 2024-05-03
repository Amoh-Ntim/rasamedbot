import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home'); // navigate to home screen after successful signin
    } catch (error) {
      console.error(error);
      // handle signin errors (e.g., display an error message)
    }
  };

  return (
    <View>
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
      <Button title="Sign In" onPress={handleSignIn} />
      <Text onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign Up</Text>
    </View>
  );
};

export default SignIn;
