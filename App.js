import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Onboarding from './Components/Onboarding';
import Welcome from './Components/Welcome';
import Liver from './Components/BottomTabs/Liver';
import Kidney from './Components/BottomTabs/Kidney';
import Diabetes from './Components/BottomTabs/Diabetes';
import Heart from './Components/BottomTabs/Heart';
import { Appearance, StyleSheet, useColorScheme } from 'react-native';
import { ThemeProvider } from './Mode/ThemeContext';
import PrivacyPolicy from './Components/Privacypolicy';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Donut from './Components/BottomTabs/Donut';
import Mybarchart from './Components/BottomTabs/Mybarchart';
import ChangePassword from './Components/BottomTabs/ChangePassword';

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
    
      <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>

    <NavigationContainer style={[themeContainerStyle,themeTextStyle]}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />  
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />  
        {/* Adding the new screens */}
        <Stack.Screen name="Liver" component={Liver} options={{ headerShown: false }} />
        <Stack.Screen name="Kidney" component={Kidney} options={{ headerShown: false }} />
        <Stack.Screen name="Diabetes" component={Diabetes} options={{ headerShown: false }} />
        <Stack.Screen name="Heart" component={Heart} options={{ headerShown: false }} />
        <Stack.Screen name="Privacy" component={PrivacyPolicy} options={{ headerShown: false }} />
        <Stack.Screen name="Donut" component={Donut} options={{ headerShown: false }} />
        <Stack.Screen name="BarChart" component={Mybarchart} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
      </GestureHandlerRootView>
      </ThemeProvider>
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
