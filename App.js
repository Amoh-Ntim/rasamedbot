import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Onboarding from './Components/Onboarding';
import Welcome from './Components/Welcome';
import { Appearance, StyleSheet, useColorScheme } from 'react-native';


const Stack = createNativeStackNavigator();


// const MyScreen = ({ title }) => {
//   return <Text>{title}</Text>;
// };

const App = () => {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <NavigationContainer style={[themeContainerStyle,themeTextStyle]}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />  
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'SignUp' }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'SignIn' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />  
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: 'Onboarding' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});

export default App;
