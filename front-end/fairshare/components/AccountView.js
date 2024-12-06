import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserName, getUserToken, getEmail } from '../services/authService'; // Adjust the import path as needed
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

export default function AccountView({ navigation }) {
    const [userName, setUserName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState(''); // Default profile picture URL
    const [email, setEmail] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [isProfilePicModalVisible, setProfilePicModalVisible] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            const storedUserName = await getUserName();
            const storedEmail = await getEmail();
            setUserName(storedUserName);
            setEmail(storedEmail);
        }
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userEmail');
        navigation.navigate('Login');
    };

    const handleUpdateEmail = async () => {
        await AsyncStorage.setItem('userEmail', newEmail);
        setEmail(newEmail);
        setModalVisible(false);
    };

    const handleUpdateProfilePic = async () => {
        // Logic to update profile picture
        setProfilePicModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profilePicWrapper}>
                    <Image source={{ uri: profilePicUrl || 'https://via.placeholder.com/100/gray' }} style={styles.profilePic} />
                    <TouchableOpacity
                        style={styles.editProfilePicButton}
                        onPress={() => setProfilePicModalVisible(true)}
                    >
                        <Ionicons name="pencil" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.userName}>{userName}</Text>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.email}>{email}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new email"
                            onChangeText={setNewEmail}
                            value={newEmail}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleUpdateEmail}>
                            <Text style={styles.modalButtonText}>Update Email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isProfilePicModalVisible}
                onRequestClose={() => setProfilePicModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile Picture</Text>
                        {/* Add your profile picture update logic here */}
                        <TouchableOpacity style={styles.modalButton} onPress={handleUpdateProfilePic}>
                            <Text style={styles.modalButtonText}>Update Profile Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setProfilePicModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        backgroundColor: '#f0f0f0', // Light gray background
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    profilePicWrapper: {
        position: 'relative',
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'gray',
        marginRight: 20,
    },
    editProfilePicButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#007BFF',
        borderRadius: 20,
        padding: 5,
    },
    profileInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    email: {
        fontSize: 16,
        marginRight: 10,
    },
    editButton: {
        padding: 5,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    modalButton: {
        width: '100%',
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});