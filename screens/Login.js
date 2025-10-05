import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // <-- ¡Importar Alert!
import { SafeAreaView } from 'react-native-safe-area-context'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  
  useEffect(() => {
    AsyncStorage.getItem('usuario').then(valor => {
      if (valor) {
        setUser(valor);
      }
    });
  }, []);

  function entrar() {
   
    if (user.trim() === '' || password.trim() === '') {
     
      Alert.alert('Error de Ingreso', 'Por favor, ingresa tu usuario y contraseña.', [{ text: 'OK' }]);
      return; 
    }
    AsyncStorage.setItem('usuario', user);
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
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

        <TouchableOpacity style={styles.button} onPress={entrar}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonR} onPress={() => navigation.navigate('Register')}>
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
    color: '#00020aff',
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
  buttonR: {
    backgroundColor: '#64005cff', 
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