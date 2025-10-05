import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carrito({ route }) {

const { productos } = route.params || [];


 const [carritoItems, setCarritoItems] = useState([]);


 const tipoCambio = 186; 
 const totalBs = carritoItems.reduce((sum, item) => sum + (item.priceBs || 0), 0);
 const totalUsd = totalBs / tipoCambio;

 useEffect(() => {
 const cargarCarrito = async () => {
 try {
 const jsonValue = await AsyncStorage.getItem('@carrito');
 let carritoGuardado = jsonValue != null ? JSON.parse(jsonValue) : [];

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


 const agregarAlCarrito = producto => {
 setCarritoItems(prev => [...prev, producto]);
 };


 const eliminarDelCarrito = name => {
  setCarritoItems(prev => prev.filter(item => item.name !== name));
 };

 
 const vaciarCarrito = () => setCarritoItems([]);
 
 const confirmarCompra = () => {
 if (carritoItems.length === 0) {
 Alert.alert('Aviso', 'El carrito está vacío. Agregue productos para comprar.');
 return; }

    Alert.alert(
      '¡Compra Exitosa!', 
      `Gracias por su compra.`,
      [
        { 
          text: 'OK', 

          onPress: () => vaciarCarrito()
        }
      ]
    );
  };

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

          
          <TouchableOpacity onPress={confirmarCompra} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar Ahora</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#ff8251ff', 
    padding: 10, 
    borderRadius: 5 
  },
  clearText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },

    
  buyButton: { 
    marginTop: 10, 
    backgroundColor: '#b95933ff', 
    padding: 10, 
    borderRadius: 5 
  },
  buyButtonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  }
});