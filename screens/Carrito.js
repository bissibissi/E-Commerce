import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carrito({ route }) {
  // Recibir productos de Home.js
  const { productos } = route.params || [];

  // Estado del carrito
  const [carritoItems, setCarritoItems] = useState([]);

  // Total en Bs y USD
  const tipoCambio = 186; // Ejemplo
  const totalBs = carritoItems.reduce((sum, item) => sum + (item.priceBs || 0), 0);
  const totalUsd = totalBs / tipoCambio;

  // Cargar carrito al iniciar
  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@carrito');
        let carritoGuardado = jsonValue != null ? JSON.parse(jsonValue) : [];

        // Agregar productos enviados desde Home
        if (productos && productos.length > 0) {
          carritoGuardado = [...carritoGuardado, ...productos];
        }

        setCarritoItems(carritoGuardado);
      } catch (e) {
        console.log('Error cargando carrito:', e);
      }
    };

    cargarCarrito();
  }, []);

  // Guardar carrito cada vez que cambie
  useEffect(() => {
    const guardarCarrito = async () => {
      try {
        await AsyncStorage.setItem('@carrito', JSON.stringify(carritoItems));
      } catch (e) {
        console.log('Error guardando carrito:', e);
      }
    };

    guardarCarrito();
  }, [carritoItems]);

  // Agregar producto al carrito
  const agregarAlCarrito = producto => {
    setCarritoItems(prev => [...prev, producto]);
  };

  // Eliminar producto
  const eliminarDelCarrito = name => {
    setCarritoItems(prev => prev.filter(item => item.name !== name));
  };

  // Vaciar carrito
  const vaciarCarrito = () => setCarritoItems([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito</Text>

      <FlatList
        data={carritoItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.source} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text>{item.name}</Text>
              <Text>{(item.priceBs || 0).toLocaleString()} Bs</Text>
            </View>
            <TouchableOpacity onPress={() => eliminarDelCarrito(item.name)}>
              <Text style={styles.remove}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>El carrito está vacío</Text>}
      />

      {carritoItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: {totalBs.toLocaleString()} Bs</Text>
          <Text style={styles.totalText}>Total: {totalUsd.toFixed(2)} USD</Text>

          <TouchableOpacity onPress={vaciarCarrito} style={styles.clearButton}>
            <Text style={styles.clearText}>Vaciar Carrito</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón de prueba para agregar un producto desde la lista de Home */}
      {productos && productos.length > 0 && (
        <TouchableOpacity onPress={() => agregarAlCarrito(productos[0])} style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar primer producto de Home</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 50, 
    fontSize: 16, 
    color: '#555' 
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  image: { 
    width: 50, 
    height: 50, 
    borderRadius: 5 
  },
  remove: { 
    color: 'red', 
    marginLeft: 10 
  },
  totalContainer: { 
    marginTop: 20 
  },
  totalText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  clearButton: { 
    marginTop: 10, 
    backgroundColor: '#663fe6ff', 
    padding: 10, 
    borderRadius: 5 
  },
  clearText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  addButton: { 
    marginTop: 20, 
    backgroundColor: '#28a745', 
    padding: 10, 
    borderRadius: 5 
  },
  addButtonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
});