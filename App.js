import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import { LogBox } from 'react-native';
import Register from './screens/Register';
import Home from './screens/Home';
import Carrito from './screens/Carrito';
import Profile from './screens/Profile';
import Navbar from './Componentes/Navbar';
import Products from './screens/Products';


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
<<<<<<< HEAD
=======
        <Stack.Screen
        name = "Navbar" component = {Navbar}
        />
         <Stack.Screen
        name = "Products" component = {Products}
        />
         <Stack.Screen
        name = "Profile" component = {Profile}
        />
         <Stack.Screen
        name = "Carrito" component = {Carrito}
        />
>>>>>>> 8a90a325c88b24c731063d9c38e10f228ab02de4
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}