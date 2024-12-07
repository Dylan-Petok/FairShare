import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUserGroups } from '../../services/groupService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GroupsView({ navigation }) {
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userGroups = await fetchUserGroups(token);
      setGroups(userGroups);
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {groups.map((group) => (
        <TouchableOpacity
          key={group.groupID}
          style={styles.groupContainer}
          onPress={() => navigation.navigate('GroupDetails', { groupId: group.groupID, groupName: group.groupName })}
        >
          <Image
            source={{ uri: group.pictureUrl || 'https://via.placeholder.com/100/gray' }}
            style={styles.groupImage}
          />
          <View style={styles.groupDetails}>
            <Text style={styles.groupName}>{group.groupName}</Text>
            <Text style={styles.groupDesc}>{group.groupDesc}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  groupContainer: {
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
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
  },
  groupDetails: {
    marginLeft: 15,
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupDesc: {
    fontSize: 14,
    color: '#666',
  },
});