import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import { LogBox } from 'react-native';
import Register from './screens/Register';
import Home from './screens/Home';
import Navbar from './Componentes/Navbar';

const Stack = createStackNavigator();
 LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" component={Login} />
         <Stack.Screen
          name="Register" component = {Register}
        />
         <Stack.Screen
          name="Home" component = {Home}
          options={{ headerLeft: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}