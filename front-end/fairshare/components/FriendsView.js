import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

export default function FriendsView({ navigation }) {
    const [friends, setFriends] = useState([
        { id: 1, userName: 'JohnDoe', profilePicUrl: '' },
        { id: 2, userName: 'JaneSmith', profilePicUrl: '' },
        { id: 3, userName: 'MikeJohnson', profilePicUrl: '' },
        { id: 4, userName: 'EmilyDavis', profilePicUrl: '' },
        { id: 5, userName: 'ChrisBrown', profilePicUrl: '' },
        // Add more friends as needed
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const staticUsers = [
        { id: 6, userName: 'AliceGreen', profilePicUrl: '' },
        { id: 7, userName: 'BobWhite', profilePicUrl: '' },
        { id: 8, userName: 'CharlieBlack', profilePicUrl: '' },
        { id: 9, userName: 'DianaBlue', profilePicUrl: '' },
        { id: 10, userName: 'EveRed', profilePicUrl: '' },
        // Add more static users as needed
    ];

    const removeFriend = (id) => {
        setFriends(friends.filter(friend => friend.id !== id));
    };

    const addFriend = (user) => {
        setFriends([...friends, user]);
        setSearchResults(searchResults.filter(result => result.id !== user.id));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = staticUsers.filter(user =>
            user.userName.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.searchButton}>
                <Ionicons name="search" size={20} color="white" />
                <Text style={styles.searchButtonText}>Search Users</Text>
            </TouchableOpacity>
            <ScrollView style={styles.friendsList}>
                {friends.map(friend => (
                    <View key={friend.id} style={styles.friendContainer}>
                        <View style={styles.profilePicWrapper}>
                            <Image source={{ uri: friend.profilePicUrl || 'https://via.placeholder.com/50/gray' }} style={styles.profilePic} />
                        </View>
                        <Text style={styles.userName}>{friend.userName}</Text>
                        <TouchableOpacity onPress={() => removeFriend(friend.id)} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.searchBarContainer}>
                            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search users to add"
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                        </View>
                        <ScrollView style={styles.searchResultsList}>
                            {searchResults.map(user => (
                                <View key={user.id} style={styles.friendContainer}>
                                    <View style={styles.profilePicWrapper}>
                                        <Image source={{ uri: user.profilePicUrl || 'https://via.placeholder.com/50/gray' }} style={styles.profilePic} />
                                    </View>
                                    <Text style={styles.userName}>{user.userName}</Text>
                                    <TouchableOpacity onPress={() => addFriend(user)} style={styles.addButton}>
                                        <Text style={styles.addButtonText}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
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
        padding: 10,
        backgroundColor: '#f0f0f0', // Light gray background
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: 'gray',
        opacity: 0.3,
        shadowColor: 'black', // Blue shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,
    },
    searchButtonText: {
        color: 'black',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    friendsList: {
        flex: 1,
    },
    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    profilePicWrapper: {
        marginRight: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'gray',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    removeButton: {
        padding: 5,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        padding: 5,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    addButtonText: {
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
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // More opaque background
        borderRadius: 5,
        marginBottom: 20,
        shadowColor: '#007BFF', // Blue shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
        color: '007BFF'
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
    },
    searchResultsList: {
        flex: 1,
        width: '100%',
    },
    cancelButton: {
        padding: 10,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
        marginTop: 20,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});