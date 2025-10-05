import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../Componentes/Navbar';

const initialProducts = [
  { name: 'Producto 1', size: 'grande', priceBs: 2790, source: require('../assets/1.jpg') },
  { name: 'Producto 2', size: 'mediano', priceBs: 1300, source: require('../assets/2.jpg') },
  { name: 'Producto 3', size: 'grande', priceBs: 3000, source: require('../assets/3.jpg') },
  { name: 'Producto 4', size: 'mediano', priceBs: 1400, source: require('../assets/4.jpg') },
];

export default function Home() {
  const navigation = useNavigation();

  const [products, setProducts] = useState(initialProducts);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newSize, setNewSize] = useState('');

  // 💵 Estado de la tasa del dólar (persistente)
  const [tasaDolar, setTasaDolar] = useState(40);

  // 📥 Cargar tasa del dólar almacenada
  useEffect(() => {
    const cargarTasa = async () => {
      try {
        const valorGuardado = await AsyncStorage.getItem('tasaDolar');
        if (valorGuardado !== null) {
          setTasaDolar(parseFloat(valorGuardado));
        }
      } catch (error) {
        console.log('Error al cargar la tasa del dólar:', error);
      }
    };
    cargarTasa();
  }, []);

  // 💾 Guardar tasa del dólar cada vez que cambie
  useEffect(() => {
    AsyncStorage.setItem('tasaDolar', tasaDolar.toString());
  }, [tasaDolar]);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory =
      !selectedCategory || selectedCategory === 'todos' ? true : p.size === selectedCategory;
    return matchSearch && matchCategory;
  });

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const selectCategory = category => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setDropdownVisible(false);
  };

  // 🗑️ Eliminar producto
  const deleteProduct = name => {
    setProducts(prev => prev.filter(p => p.name !== name));
  };

  // ✏️ Abrir modal de edición
  const openEditModal = product => {
    setEditingProduct(product);
    setNewName(product.name);
    setNewPrice(product.priceBs.toString());
    setNewSize(product.size);
  };

  // 💾 Guardar cambios
  const saveEdit = () => {
    setProducts(prev =>
      prev.map(p =>
        p.name === editingProduct.name
          ? { ...p, name: newName, priceBs: parseFloat(newPrice), size: newSize }
          : p
      )
    );
    setEditingProduct(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>BIENVENIDO</Text>

          {/* 💵 Campo para cambiar tasa del dólar */}
          <View style={styles.tasaContainer}>
            <Text style={styles.tasaLabel}>Tasa del dólar (Bs):</Text>
            <TextInput
              style={styles.tasaInput}
              keyboardType="numeric"
              value={tasaDolar.toString()}
              onChangeText={value => setTasaDolar(parseFloat(value) || 0)}
            />
          </View>

          {/* 🔍 Buscador */}
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar producto..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />

          {/* 📂 Categorías */}
          <View style={styles.dropdownWrapper}>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
              <Text style={styles.dropdownButtonText}>
                {selectedCategory
                  ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                  : 'Categorías'}{' '}
                {dropdownVisible ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectCategory('grande')}>
                  <Text style={styles.dropdownItemText}>Grande</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectCategory('mediano')}>
                  <Text style={styles.dropdownItemText}>Mediano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectCategory('todos')}>
                  <Text style={styles.dropdownItemText}>Todos</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* 🛍️ Lista de productos */}
          <View style={styles.imageGrid}>
            {filteredProducts.map((p, index) => (
              <View key={index} style={styles.imageContainer}>
                {/* 🔼 Botones de Editar y Eliminar arriba */}
                <View style={styles.crudButtons}>
                  <TouchableOpacity style={styles.crudButton} onPress={() => openEditModal(p)}>
                    <Text style={styles.crudButtonText}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.crudButton, { backgroundColor: '#ca25256e' }]}
                    onPress={() => deleteProduct(p.name)}
                  >
                    <Text style={[styles.crudButtonText, { color: '#ff8251ff' }]}>❌</Text>
                  </TouchableOpacity>

                </View>

                {/* 🖼️ Imagen y detalles */}
                <Image source={p.source} style={styles.image} resizeMode="cover" />
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{p.name}</Text>
                <Text style={{ textAlign: 'center' }}>
                  {p.priceBs.toLocaleString()} Bs / ${(p.priceBs / tasaDolar).toFixed(2)} USD
                </Text>

                {/* 🛒 Agregar al carrito */}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('Carrito', { productos: [p] })}
                >
                  <Text style={styles.addButtonText}>🛒 Agregar al Carrito</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <Navbar navigation={navigation} />

      {/* ✏️ Modal de edición */}
      <Modal visible={editingProduct !== null} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Editar Producto</Text>
            <TextInput style={styles.modalInput} value={newName} onChangeText={setNewName} />
            <TextInput
              style={styles.modalInput}
              value={newPrice}
              onChangeText={setNewPrice}
              keyboardType="numeric"
            />
            <TextInput style={styles.modalInput} value={newSize} onChangeText={setNewSize} />

            <Button title="Guardar" onPress={saveEdit} />
            <Button title="Cancelar" color="red" onPress={() => setEditingProduct(null)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9f9' },
  contentWrapper: { flex: 1 },
  scrollContent: { alignItems: 'center', padding: 20 },

  title: { fontSize: 30, fontWeight: 'bold', color: '#ff8251ff', marginBottom: 20 },

  tasaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
  },
  tasaLabel: { fontWeight: 'bold', marginRight: 10 },
  tasaInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
  },

  searchInput: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },

  dropdownWrapper: { width: '90%', marginBottom: 20 },

  dropdownButton: { backgroundColor: '#ff8251ff', padding: 12, borderRadius: 10 },
  dropdownButtonText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },

  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    overflow: 'hidden',
  },
  dropdownItem: { padding: 12 },
  dropdownItemText: { fontSize: 16, color: '#333' },

  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },

  imageContainer: {
    width: 150,
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eaeaea',
    marginBottom: 10,
    padding: 5,
    position: 'relative',
  },
  image: { width: '100%', height: 120, borderRadius: 10 },

  crudButtons: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    gap: 5,
    zIndex: 1,
  },
  crudButton: {
    backgroundColor: '#ff8251ff',
    padding: 5,
    borderRadius: 5,
  },
  crudButtonText: { color: '#fff', fontSize: 12 },

  addButton: { marginTop: 5, backgroundColor: '#ff5a18d9', padding: 5, borderRadius: 5 },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 12 },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalInput: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 5, borderRadius: 5 },
});
