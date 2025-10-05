import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Carrito from './screens/Carrito';
import Profile from './screens/Profile';
import Navbar from './Componentes/Navbar';
import Products from './screens/Products';


const Stack = createStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}