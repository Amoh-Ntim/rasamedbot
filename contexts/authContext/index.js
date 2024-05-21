import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
  handleSignIn: async () => {},
  handleSignOut: async () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle user sign-in
  const handleSignIn = async (email, password) => {
    try {
      setIsLoading(true); // Set loading state to true while signing in
      const authUser = await auth().signInWithEmailAndPassword(email, password);
      setUser(authUser); // Update user state on successful sign-in
    } catch (error) {
      console.error(error); // Handle errors (e.g., display error message)
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success/failure
    }
  };

  // Function to handle user sign-out
  const handleSignOut = async () => {
    try {
      setIsLoading(true); // Set loading state to true while signing out
      await auth().signOut();
      setUser(null); // Update user state to null on successful sign-out
    } catch (error) {
      console.error(error); // Handle errors (e.g., display error message)
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success/failure
    }
  };

  // Check authentication state on component mount (optional)
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return unsubscribe; // Cleanup function to avoid memory leaks
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    handleSignIn,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
