import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { searchUsers } from '../../services/userService';
import { saveGroup as saveGroupService } from '../../services/groupService';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateGroupForm({ groupMembers, setGroupMembers, navigation }) {
  const [groupName, setGroupName] = useState('');
  const [groupPicUrl, setGroupPicUrl] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [isGroupMembersModalVisible, setGroupMembersModalVisible] = useState(false);
  const [groupMembersTab, setGroupMembersTab] = useState('existing');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');

  const staticUsers = [
    { id: 1, userName: 'JohnDoe' },
    { id: 2, userName: 'JaneSmith' },
    { id: 3, userName: 'MikeJohnson' },
    { id: 4, userName: 'EmilyDavis' },
    { id: 5, userName: 'ChrisBrown' },
    // Add more static users as needed
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const token = await AsyncStorage.getItem('userToken');
      const results = await searchUsers(query, token, groupMembers);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addGroupMember = (member) => {
    setGroupMembers([...groupMembers, member]);
    setGroupMembersModalVisible(false);
  };

  const addGuestMember = () => {
    const guestMember = {
      userName: `${guestFirstName} ${guestLastName}`,
      firstName: guestFirstName,
      lastName: guestLastName,
      isGuest: true,
    };
    addGroupMember(guestMember);
  };

  const removeGroupMember = (memberUserName) => {
    setGroupMembers(groupMembers.filter(member => member.userName !== memberUserName));
  };

  const openGroupMembersModal = () => {
    setSearchQuery('');
    setSearchResults([]);
    setGroupMembersModalVisible(true);
  };

  const saveGroup = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await saveGroupService(groupName, groupPicUrl, groupDesc, groupMembers, token);
      // Navigate to the groups view
      navigation.navigate('Groups');
      console.log('Group saved successfully');
    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Group Name</Text>
        <TextInput
          style={styles.inputItem}
          placeholder="Enter group name"
          onChangeText={setGroupName}
          value={groupName}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Group Picture URL</Text>
        <TextInput
          style={styles.inputItem}
          placeholder="Enter group picture URL"
          onChangeText={setGroupPicUrl}
          value={groupPicUrl}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Group Members</Text>
        <TouchableOpacity
          style={styles.inputItem}
          onPress={openGroupMembersModal}
        >
          <Text>{groupMembers.length > 0 ? groupMembers.map(member => member.userName).join(', ') : 'Select group members'}</Text>
        </TouchableOpacity>
        <View style={styles.groupMembersContainer}>
          {groupMembers.map(member => (
            <View key={member.userName} style={styles.groupMemberItem}>
              <Text style={styles.groupMemberText}>{member.userName}</Text>
              <TouchableOpacity onPress={() => removeGroupMember(member.userName)}>
                <Ionicons name="close-circle-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Group Description</Text>
        <TextInput
          style={styles.inputItem}
          placeholder="Enter group description"
          onChangeText={setGroupDesc}
          value={groupDesc}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isGroupMembersModalVisible}
        onRequestClose={() => setGroupMembersModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tab, groupMembersTab === 'existing' && styles.activeTab]}
                onPress={() => setGroupMembersTab('existing')}
              >
                <Text style={[styles.tabText, groupMembersTab === 'existing' && styles.activeTabText]}>Existing User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, groupMembersTab === 'guest' && styles.activeTab]}
                onPress={() => setGroupMembersTab('guest')}
              >
                <Text style={[styles.tabText, groupMembersTab === 'guest' && styles.activeTabText]}>Guest</Text>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {groupMembersTab === 'existing' ? (
                <View style={styles.existingUserContainer}>
                  <Text style={styles.guestLabel}>User Search</Text>
                  <TextInput
                    style={styles.existingInput}
                    placeholder="Search for users"
                    value={searchQuery}
                    onChangeText={handleSearch}
                  />
                  <ScrollView style={styles.searchResultsList}>
                    {searchResults.map(user => (
                      <View key={user} style={styles.searchResultItem}>
                        <Text style={styles.searchResultName}>{user}</Text>
                        <TouchableOpacity onPress={() => addGroupMember({userName: user })}>
                          <Ionicons name="add-circle-outline" size={24} color="green" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                  <TouchableOpacity onPress={() => setGroupMembersModalVisible(false)} style={styles.existingCancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.guestContainer}>
                  <View style={styles.guestInputWrapper}>
                    <Text style={styles.guestLabel}>First Name</Text>
                    <TextInput
                      style={styles.guestInput}
                      placeholder="Enter first name"
                      onChangeText={setGuestFirstName}
                      value={guestFirstName}
                    />
                  </View>
                  <View style={styles.guestInputWrapper}>
                    <Text style={styles.guestLabel}>Last Name</Text>
                    <TextInput
                      style={styles.guestInput}
                      placeholder="Enter last name"
                      onChangeText={setGuestLastName}
                      value={guestLastName}
                    />
                  </View>
                  <TouchableOpacity style={styles.addButton} onPress={addGuestMember}>
                    <Text style={styles.buttonText}>Add Guest</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setGroupMembersModalVisible(false)} style={styles.guestCancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveGroup}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  groupMembersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  groupMemberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  groupMemberText: {
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '70%',
    height: '40%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  existingUserContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  guestContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  guestInputWrapper: {
    width: 225,
    marginBottom: 15,
  },
  existingLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  existingInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    width: 225,
  },
  guestInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  searchResultsList: {
    flex: 1,
    width: '100%',
  },
  searchResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%'
  },
  searchResultName: {
    flex: 1,
  },
  existingCancelButton: {
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    marginTop: 20,
  },
  guestCancelButton: {
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});