import React, { useState } from 'react';
import { Button, TextInput, View, Text, ActivityIndicator, KeyboardAvoidingView, Image, Dimensions } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../firebase/FirebaseConfig';
import { FIREBASE_STORAGE } from '../firebase/FirebaseConfig';
import tw from 'twrnc';
import { Firestore } from 'firebase/firestore';
// import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading statem

  const auth = FIREBASE_AUTH;
  const { width } = Dimensions.get('screen');
  const handleSignIn = async () => {
    setIsLoading(true); // Set loading state to true before sign-in

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Replace with your actual logic to retrieve image name and type
        const userId = user.uid;
        const getUniqueImagePath = async (userId) => {
          try {
            const userDoc = await Firestore()
              .collection('users')
              .doc(userId)
              .get();
        
            if (userDoc.exists) {
              const userData = userDoc.data();
              return userData.users; // Replace with the actual field name
            } else {
              console.warn('User data not found.');
              return null;
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
          }
        };
        
        const uniqueImagePath = await getUniqueImagePath(userId);

        // if (uniqueImagePath) {
        //   const storage = FIREBASE_STORAGE; // Import getStorage
        //   const storageRef = ref(storage, uniqueImagePath);

        //   try {
        //     const imageRef = await getDownloadURL(storageRef);
        //     // Use imageRef to display the user's profile picture
        //     console.log('Profile picture URL:', imageRef);
        //     // Further logic to display image (e.g., using Image component)
        //   } catch (error) {
        //     console.error('Error getting download URL:', error);
        //     // Handle error, e.g., display a default image
        //   }
        // } else {
        //   console.log('User has no profile picture set.');

        navigation.navigate('Welcome', { uniqueImagePath});
        console.log('Signed in with user:', user.email); // Log the user's email for debugging
      // }
    }
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
     <Text style={tw`text-2xl font-bold flex items-center text-[#6C63FF]`}> SIGN IN</Text>
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
      <View style={ tw`bg-[#6C63FF] mt-12` }>
      <Button
        style={tw`rounded-lg p-8 h-16 flex justify-center items-center`} // Adjust styles as needed
        title={isLoading ? '' : 'Sign In'} // Set title based on loading state
        onPress={handleSignIn}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading && <ActivityIndicator size="small" color="blue" />} {/* Show ActivityIndicator when loading */}
      </Button>
      </View>
      <View style={ tw`flex justify-center items-center mt-12` }>
      <Text style={ tw`text-xl` }>Don't have an account?<Text style={tw`text-[#6C63FF] text-xl`} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text></Text>
      </View>
    </View>
    </View>
    </View>
     </KeyboardAvoidingView>
  );
};

export default SignIn;
