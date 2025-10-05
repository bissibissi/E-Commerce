import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Navbar from '../Componentes/Navbar';


export default function Home({ navigation }) {
    const [searchText, setSearchText] = useState('');

    const handleLogout = () => {
        navigation.navigate('Login'); 
    };
  



    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentWrapper}> 
                <ScrollView contentContainerStyle={styles.contentScroll}>
                    <View style={styles.contentContainer}>
                        
            
                      
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar peluches..."
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        
                        
                        <View style={styles.categoryContainer}>
                            <TouchableOpacity 
                                style={styles.categoryButton} 
                                onPress={() => handleCategoryPress('Pequeños')}
                            >
                                <Text style={styles.categoryButtonText}>Pequeños</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.categoryButton} 
                                onPress={() => handleCategoryPress('Grandes')}
                            >
                                <Text style={styles.categoryButtonText}>Grandes</Text>
                            </TouchableOpacity>
                        </View>

                        
                        <View style={{height: 500}}>
                            <Text style={styles.placeholderText}>Aquí iria la lista de peluches...</Text>
                        </View>
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
        backgroundColor: '#FFFFFF',
    },
    
    
    contentWrapper: {
        flex: 1, 
    },
    contentScroll: {
        padding: 20,
        alignItems: 'center', 
    },

    contentContainer: {
        width: '100%', 
        alignItems: 'center',
    },
    welcomeText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, 
        color: '#663fe6ff',
        marginTop: 10, 
    },
    
    searchInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccccccff',
        borderRadius: 10, 
        paddingHorizontal: 15,
        marginBottom: 13, 
        fontSize: 16,
    },
    categoryContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%',
        marginBottom: 30,
    },
    categoryButton: {
        backgroundColor: '#663fe6ff', 
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    categoryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    placeholderText: {
        fontSize: 16,
        color: '#666666',
        marginVertical: 4,
    },
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