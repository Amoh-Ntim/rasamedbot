import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
const Stack = createNativeStackNavigator();

const MyScreen = ({ title }) => {
  return <Text>{title}</Text>;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'SignIn' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'SignUp' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
