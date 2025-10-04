import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    if (email === 'admin' && password === '1234') {
      Alert.alert('¡Éxito!', 'Login correcto. Bienvenido.');
    
    } else {
      Alert.alert('Error', 'Email o contraseña incorrectos.\nPrueba: admin / 1234');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>  {/* ← Envuelve todo para manejar safe area */}
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
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
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
       <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 100,  // ← Ocupa toda la pantalla
    backgroundColor: '#5dfffa76',  // ← Fondo blanco para que no se vea raro
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // ← Cambiado: Empieza desde arriba en lugar de centrar
    padding: 20,
    paddingTop: 20,  // ← Padding extra arriba para "subirlo un poquito" sin pegarse al borde
    backgroundColor: '#5dfffa76',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20,  // ← Pequeño margen arriba del título para ajustar
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