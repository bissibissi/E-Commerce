import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity // Necesario para el botón "Cerrar Sesión"
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Necesario para SafeAreaView
import Navbar from '../Componentes/Navbar';


export default function Home({ navigation }) {

  // Función para cerrar sesión y volver a la pantalla de Login
  const handleLogout = () => {
    // Navegamos de vuelta al Login (asumiendo que así se llama tu pantalla de login en la navegación)
    navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi E-commerce</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENIDO PRINCIPAL EN BLANCO (EL PLACEHOLDER) */}
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
        <Text style={styles.placeholderText}>Esta es la página principal (Home).</Text>
        <Text style={styles.placeholderText}>El contenido de tu e-commerce se construirá aquí.</Text>
      <View>
          <Navbar navigation={navigation} />
      </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Estilos de la Cabecera
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#64005cff', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Estilos del Contenido Principal (El espacio en blanco)
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#663fe6ff',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666666',
    marginVertical: 4,
  },
});