import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('SignIn'); // navigate to signin screen after successful signup
    } catch (error) {
      console.error(error);
      // handle signup errors (e.g., display an error message)
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text onPress={() => navigation.navigate('SignIn')}>Already have an account? Sign In</Text>
    </View>
  );
};

export default SignUp;
