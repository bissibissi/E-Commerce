import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registrar() {
    
    AsyncStorage.setItem('usuario', user);
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('password', password);
    
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.safeArea}> 
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Cuenta</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="User"
          value={user}
          onChangeText={setUser}
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={registrar}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 100,  
    backgroundColor: '#ffffffff', 
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',  
    padding: 20,
    paddingTop: 20, 
    backgroundColor: '#ffffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20,  
    color: '#6684e5ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8d1bf1ff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#663fe6ff',  
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
