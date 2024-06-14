import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Onboarding from './Components/Onboarding';
import Welcome from './Components/Welcome';

const Stack = createNativeStackNavigator();


// const MyScreen = ({ title }) => {
//   return <Text>{title}</Text>;
// };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: 'Onboarding' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'SignUp' }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'SignIn' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />  
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
