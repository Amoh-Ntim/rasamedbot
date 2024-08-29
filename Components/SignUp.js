import React, { useState } from 'react';
import { Button, TextInput, View, Text, Dimensions, Image, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';
// import auth from '@react-native-firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase/FirebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import tw from 'twrnc';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [showPassword, setShowPassword] = useState(false);

  const auth = FIREBASE_AUTH;
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};
  const { width } = Dimensions.get('screen');
  const handleSignUp = async () => {
    setIsLoading(true); // Set loading state to true before sign-up

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!'); // Log success for debugging
      // Reset the navigation stack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
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
    <View style={ tw`mt-4` }>
      <TextInput
      style={ tw`text-xl border border-gray-400 rounded p-2 text-black bg-white` }
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
    </View>
      <View style={ tw`mt-4` }>
      <View>
      <TextInput
      style={ tw`text-xl border border-gray-400 rounded p-2 text-black bg-white` }
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={!showPassword}
      />
      </View>
      <View>
      <TouchableOpacity onPress={toggleShowPassword}>
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                />
            </TouchableOpacity>
      </View>
      </View>
      <View style={ tw`mt-4` }>
      <TextInput
        style={ tw`text-xl border border-gray-400 rounded p-2 text-black bg-white` }
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                />
            </TouchableOpacity>
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



