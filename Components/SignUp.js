import React, { useState } from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase/FirebaseConfig';
import { doc, setDoc } from "firebase/firestore"; 
import { FIREBASE_DATABASE } from '../firebase/FirebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import tw from 'twrnc';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
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
    if (!username.trim()) {
      alert('Username is required.');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      setIsLoading(false);
      return;
    }

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Get the user object
    console.log('User signed up successfully!');

    // Upload username to Firestore
    await setDoc(doc(FIREBASE_DATABASE, 'users', user.uid), {
      username: username,
      // email: email, // Optionally store the email too
    });
    console.log('Username submitted successfully!');

    // Navigate to the Welcome screen or reset navigation to Home
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HealthGoals' }], // Change 'Welcome' to your actual screen name
      })
    );
  } catch (error) {
    console.error('Error during sign-up:', error.message);
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
            <Text style={tw`text-2xl font-bold flex items-center text-blue-600`}>
              SIGN UP
            </Text>
          </View>
          <View style={tw`text-xl p-2`}>
            {/* Username Input */}
            <View style={tw`mt-4`}>
              <TextInput
                style={tw`text-xl border border-blue-700 rounded-xl p-2 text-black bg-white`}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
              />
            </View>

            {/* Email Input */}
            <View style={tw`mt-4`}>
              <TextInput
                style={tw`text-xl border border-blue-700 rounded-xl p-2 text-black bg-white`}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
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

            {/* Confirm Password Input */}
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

            {/* Sign-Up Button */}
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

            {/* Already Have an Account? */}
            <View style={tw`flex justify-center items-center mt-12`}>
              <Text style={tw`text-md`}>
                Already have an account?{' '}
                <Text
                  style={tw`text-blue-600 text-md`}
                  onPress={() => navigation.navigate('SignIn')}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
