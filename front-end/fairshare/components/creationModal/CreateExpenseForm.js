// fairshare/components/creationModal/CreateExpenseForm.js

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserGroups } from '../../services/groupService';
import { saveExpense } from '../../services/expenseService'; // Make sure to implement this function in your service

export default function CreateExpenseForm({ navigation }) {
  const [groupNames, setGroupNames] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupModalVisible, setGroupModalVisible] = useState(false);

  const [groupMembers, setGroupMembers] = useState([]); // Array of usernames
  const [contributors, setContributors] = useState([]);  // Array of selected usernames
  const [isContributorsModalVisible, setContributorsModalVisible] = useState(false);
  const [isPaidByModalVisible, setPaidByModalVisible] = useState(false); // State for Paid By modal

  const [expenseName, setExpenseName] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [totalAmount, settotalAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [percentages, setPercentages] = useState({}); // Object to store percentages for each user

  const fetchGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const groups = await fetchUserGroups(token);
      setGroupNames(groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGroups();
    });

    return unsubscribe;
  }, [navigation]);

  const selectGroup = (group) => {
    console.log(group)
    setSelectedGroup(group);
    setGroupModalVisible(false);

    // Update group members from the selected group's usernames
    if (group.usernames && group.usernames.length > 0) {
      setGroupMembers(group.usernames);
    } else {
      setGroupMembers([]);
    }

    // Clear contributors and percentages when the group changes
    setContributors([]);
    setPercentages({});
  };

  const toggleContributor = (username) => {
    if (contributors.includes(username)) {
      setContributors(contributors.filter((user) => user !== username));
      const newPercentages = { ...percentages };
      delete newPercentages[username];
      setPercentages(newPercentages);
    } else {
      setContributors([...contributors, username]);
    }
  };

  const removeContributor = (username) => {
    setContributors(contributors.filter((user) => user !== username));
    const newPercentages = { ...percentages };
    delete newPercentages[username];
    setPercentages(newPercentages);
  };

  const handlePercentageChange = (username, value) => {
    const newPercentages = { ...percentages, [username]: value };
    setPercentages(newPercentages);
  };

  const validatePercentages = () => {
    const total = Object.values(percentages).reduce((sum, value) => sum + parseFloat(value || 0), 0);
    return Math.abs(total - 100) < 0.01; // Allow for a small margin of error
  };

  const handleSave = async () => {
    if (!selectedGroup) {
      Alert.alert('Error', 'Please select a group.');
      return;
    }

    if (contributors.length === 0) {
      Alert.alert('Error', 'Please select at least one contributor.');
      return;
    }

    if (!totalAmount) {
      Alert.alert('Error', 'Please enter the expense amount.');
      return;
    }

    if (!paidBy) {
      Alert.alert('Error', 'Please select who paid.');
      return;
    }

    if (!validatePercentages()) {
      Alert.alert('Error', 'Total percentage must equal 100%');
      return;
    }

    // Transform contributors and percentages into expense_participants
    const expenseParticipants = contributors.reduce((acc, username) => {
      acc[username] = parseFloat(percentages[username]); // Ensure double values
      return acc;
    }, {});

    try {
      const token = await AsyncStorage.getItem('userToken');
      await saveExpense({
        groupId: selectedGroup.groupID,
        expenseName,
        expenseDesc,
        totalAmount,
        paidBy,
        expenseParticipants, // Use the transformed object
      }, token);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving expense:', error);
      Alert.alert('Error', 'Failed to save expense');
    }
  };

  return (
    <View style={styles.inputContainer}>
      {/* Group Selection */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Group Name</Text>
        <TouchableOpacity
          style={styles.inputItem}
          onPress={() => setGroupModalVisible(true)}
        >
          <Text>{selectedGroup ? selectedGroup.groupName : 'Select a group'}</Text>
        </TouchableOpacity>
      </View>

      {/* Group Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isGroupModalVisible}
        onRequestClose={() => setGroupModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setGroupModalVisible(false)}
        >
          <View style={styles.pickerModal}>
            <ScrollView>
              {groupNames.map((group) => (
                <TouchableOpacity
                  key={group.groupID}
                  style={styles.pickerItem}
                  onPress={() => selectGroup(group)}
                >
                  <Text style={styles.pickerItemText}>{group.groupName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Contributors Selection */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Contributors</Text>
        <TouchableOpacity
          style={styles.inputItem}
          onPress={() => setContributorsModalVisible(true)}
          disabled={!selectedGroup}
        >
          <Text>
            {contributors.length > 0 ? contributors.join(', ') : 'Select contributors'}
          </Text>
        </TouchableOpacity>
        <View style={styles.selectedItemsContainer}>
          {contributors.map((username) => (
            <View key={username} style={styles.selectedItem}>
              <Text style={styles.selectedItemText}>{username}</Text>
              <TouchableOpacity onPress={() => removeContributor(username)}>
                <Ionicons name="close-circle-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Contributors Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isContributorsModalVisible}
        onRequestClose={() => setContributorsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setContributorsModalVisible(false)}
        >
          <View style={styles.pickerModal}>
            <ScrollView>
              {groupMembers.map((username) => (
                <TouchableOpacity
                  key={username}
                  style={styles.pickerItem}
                  onPress={() => toggleContributor(username)}
                >
                  <Text style={styles.pickerItemText}>{username}</Text>
                  {contributors.includes(username) && (
                    <Ionicons name="checkmark" size={20} color="green" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Expense Name */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Expense Name</Text>
        <TextInput
          style={styles.inputItem}
          placeholder="Enter expense name"
          onChangeText={setExpenseName}
          value={expenseName}
        />
      </View>

      {/* Expense Description */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Expense Description</Text>
        <TextInput
          style={styles.inputItem}
          placeholder="Enter expense description"
          onChangeText={setExpenseDesc}
          value={expenseDesc}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      {/* Expense Amount */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Expense Amount</Text>
        <TextInput
          style={styles.inputItem}
          placeholder="Enter expense amount"
          keyboardType="numeric"
          onChangeText={settotalAmount}
          value={totalAmount}
        />
      </View>

      {/* Paid By */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Paid By</Text>
        <TouchableOpacity
          style={styles.inputItem}
          onPress={() => setPaidByModalVisible(true)}
          disabled={!selectedGroup}
        >
          <Text>{paidBy ? paidBy : 'Select who paid'}</Text>
        </TouchableOpacity>
      </View>

      {/* Paid By Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPaidByModalVisible}
        onRequestClose={() => setPaidByModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setPaidByModalVisible(false)}
        >
          <View style={styles.pickerModal}>
            <ScrollView>
              {groupMembers.map((username) => (
                <TouchableOpacity
                  key={username}
                  style={styles.pickerItem}
                  onPress={() => {
                    setPaidBy(username);
                    setPaidByModalVisible(false);
                  }}
                >
                  <Text style={styles.pickerItemText}>{username}</Text>
                  {paidBy === username && (
                    <Ionicons name="checkmark" size={20} color="green" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Percentage Participation */}
      {contributors.map((username) => (
        <View key={username} style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{username}'s Participation (%)</Text>
          <TextInput
            style={styles.inputItem}
            placeholder="Enter percentage"
            keyboardType="numeric"
            onChangeText={(value) => handlePercentageChange(username, value)}
            value={percentages[username] || ''}
          />
        </View>
      ))}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    padding: 20,
  },
  inputWrapper: {
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
  selectedMembersContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedMemberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f5fe',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedMemberText: {
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  pickerModal: {
    backgroundColor: '#fff',
    width: '80%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 20,
  },
  pickerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerItemText: {
    fontSize: 18,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f5fe',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedItemText: {
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
});