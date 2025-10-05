import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Navbar from '../Componentes/Navbar';


export default function Home({ navigation }) {

  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentWrapper}> 
        <ScrollView contentContainerStyle={styles.contentScroll}>
            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>¡Bienvenido!</Text>
                <View style={{height: 500}}></View>
            </View>
        </ScrollView>
      </View>
      <Navbar navigation={navigation} />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9d5520b',
  },
  
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


  contentWrapper: {
    flex: 1, 
  },
  contentScroll: {
    padding: 20,
    alignItems: 'center',
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#663fe6ff',
    marginTop: 50,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666666',
    marginVertical: 4,
  },
});