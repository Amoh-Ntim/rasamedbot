import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Assuming Firebase is already initialized in your app's entry point
const auth = getAuth();

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Update isLoggedIn based on user object presence
    });

    return unsubscribe; // Function to clean up the listener on component unmount
  }, []);

  return (
    <View>
      {isLoggedIn ? (
        <>
          <Text>Welcome, you are signed in!</Text>
          {/* <Button title="Sign Out" onPress={() =>  Sign out logic } /> */}
        </>
      ) : (
        <>
          <Text>Please sign in to continue.</Text>
          {/* <Button title="Sign In" onPress={() =>  Sign in navigation } /> */}
        </>
      )}
    </View>
  );
};

export default Home;
