import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Navbar from '../Componentes/Navbar'; 


export default function Profile({ navigation }) {
    
    const [username, setUsername] = useState('...');
    const [loading, setLoading] = useState(true);

    const loadUsername = async () => {
        try {
            
            const storedUsername = await AsyncStorage.getItem('usuario');
            if (storedUsername) {
                setUsername(storedUsername);
            } else {
                setUsername('Invitado'); 
            }
        } catch (error) {
            console.error("Error al cargar el usuario:", error);
            setUsername('Error');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        loadUsername();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar la sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Salir', 
                    onPress: async () => {
                        try {
                           
                            await AsyncStorage.removeItem('usuario');
                            
                            Alert.alert('¡Adiós!', 'Sesión cerrada correctamente.');
                            
                            
                            navigation.navigate('Login'); 

                        } catch (error) {
                            Alert.alert('Error', 'No se pudo cerrar la sesión.');
                            console.error("Error al cerrar sesión:", error);
                        }
                    },
                    style: 'destructive'
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentWrapper}> 
                
                <ScrollView contentContainerStyle={styles.contentScroll}>
                    <View style={styles.contentContainer}>

                        {loading ? (
                            
                            <ActivityIndicator size="large" color="#663fe6ff" style={styles.loadingIndicator} />
                        ) : (
                            
                            <View style={styles.infoContainer}>
                                
                                <Text style={styles.welcomeText}>
                                    Hola,
                                </Text>
                                <Text style={styles.usernameTitle}>
                                    {username} 👋
                                </Text>

                               
                                <Text style={styles.placeholderText}>
                                    Esta es tu vista de perfil.
                                </Text>

                                
                                <TouchableOpacity 
                                    style={styles.logoutButton}
                                    onPress={handleLogout}
                                >
                                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                       
                        <View style={{height: 100}}></View>
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
        flexGrow: 1, 
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center', 
    },

    
    contentContainer: {
        width: '100%', 
        alignItems: 'center', 
    },
    
   
    infoContainer: {
        alignItems: 'center', 
        paddingVertical: 50,
        width: '100%',
    },

    loadingIndicator: {
        marginTop: 50,
    },

    
    welcomeText: {
        fontSize: 33,
        color: '#666666',
        marginBottom: 5,
    },
   
    usernameTitle: {
        fontSize: 37,
        fontWeight: 'bold',
        color: '#c45f30ff', 
        marginBottom: 30, 
        textAlign: 'center',
    },

    placeholderText: {
        fontSize: 16,
        color: '#666666',
        marginVertical: 4,
        textAlign: 'center',
        marginBottom: 50,
    },

    
    logoutButton: {
        backgroundColor: '#D9534F', 
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8, 
        marginTop: 20,
        width: '80%', 
        alignItems: 'center',
        elevation: 3, 
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

   
});