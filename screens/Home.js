import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import BarraNav from '../Componentes/BarraNav';

const images = [
  { name: '1.jpg', source: require('../../assets/1.jpg') },
  { name: '2.jpg', source: require('../../assets/2.jpg') },
  { name: '3.jpg', source: require('../../assets/3.jpg') },
  { name: '4.jpg', source: require('../../assets/4.jpg') },
];

function getRows(arr, itemsPerRow) {
  const rows = [];
  for (let i = 0; i < arr.length; i += itemsPerRow) {
    rows.push(arr.slice(i, i + itemsPerRow));
  }
  return rows;
}

export default function Home({ navigation }) {
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('Images');
    if (stored) {
      setSavedImages(JSON.parse(stored));
    }
  }, []);

  const saveImage = (name) => {
    if (!savedImages.includes(name)) {
      const newImages = [...savedImages, name];
      setSavedImages(newImages);
      localStorage.setItem('Images', JSON.stringify(newImages));
    }
  };

  const rows = getRows(images, 2);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar imágenes..."
        placeholderTextColor="#888"
        editable={false}
      />
      <View style={styles.imagesContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((img) => (
              <View key={img.name} style={styles.imageBox}>
                <View style={styles.imageWrapper}>
                  {!savedImages.includes(img.name) ? (
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => saveImage(img.name)}
                    >
                      <Text style={styles.saveButtonText}>+</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.savedLabel}>
                      <Text style={styles.savedLabelText}>✔</Text>
                    </View>
                  )}
                  <Image source={img.source} style={styles.image} />
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
      <BarraNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  imagesContainer: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageBox: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 140,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 220,
    borderRadius: 10,
  },
  saveButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#d00',
  },
  saveButtonText: {
    color: '#d00',
    fontWeight: 'bold',
    fontSize: 18,
  },
  savedLabel: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#0a0',
  },
  savedLabelText: {
    color: '#0a0',
    fontWeight: 'bold',
    fontSize: 18,
  },
});