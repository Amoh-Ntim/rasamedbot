import React, { useState } from 'react';
import { Button, TextInput, View, Text, Dimensions, Image, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase/FirebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import tw from 'twrnc';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  const auth = FIREBASE_AUTH;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { width } = Dimensions.get('screen');

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!');
      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      console.error(error);
      // Handle signup errors (e.g., display an error message)
      alert('Sign-up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ITEM_WIDTH = width * 1;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.7;

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={tw`flex`}>
        <View style={tw`rounded-b overflow-hidden`}>
          <Image
            source={require('../assets/precognosislogo.png')}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              borderBottomLeftRadius: 40, 
              borderBottomRightRadius: 40,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={tw`rounded-lg m-4`}>
          <View style={tw`flex justify-center items-center`}>
            <Text style={tw`text-2xl font-bold flex items-center text-blue-600`}>SIGN UP</Text>
          </View>
          <View style={tw`text-xl p-2`}>
            <View style={tw`mt-4`}>
              <TextInput
                style={tw`text-xl border border-blue-700 rounded-xl p-2 text-black bg-white`}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={tw`mt-4`}>
              <View style={tw`relative`}>
                <TextInput
                  style={tw`text-xl border border-blue-700 rounded-xl p-2 text-black bg-white pr-10`}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={tw`absolute right-2 top-2`}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="blue"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`mt-4`}>
              <View style={tw`relative`}>
                <TextInput
                  style={tw`text-xl border border-blue-700 rounded-xl p-2 text-black bg-white pr-10`}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={tw`absolute right-2 top-2`}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="blue"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`bg-[#6C63FF] mt-12`}>
              <Button
                style={tw`rounded-lg p-8 h-16 flex justify-center items-center`}
                title={isLoading ? '' : 'Sign Up'}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading && <ActivityIndicator size="small" color="blue" />}
              </Button>
            </View>
            <View style={tw`flex justify-center items-center mt-12`}>
              <Text style={tw`text-xl`}>Already have an account? <Text style={tw`text-blue-600 text-xl`} onPress={() => navigation.navigate('SignIn')}>Sign In</Text></Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
