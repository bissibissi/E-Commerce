import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Navbar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      
       <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Carrito')}>
        <Text style={styles.icon}>🛒</Text>
        <Text style={styles.label}>Carrito</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.label}>Profile</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffffdb',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 23,
    marginTop: 13,
  },
  label: {
    fontSize: 14,
    marginTop: 2,
  },
});