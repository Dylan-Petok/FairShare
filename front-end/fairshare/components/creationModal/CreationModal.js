import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CreateGroupForm from './CreateGroupForm';
import CreateExpenseForm from './CreateExpenseForm';

export default function CreationModal({ navigation }) {
  const [activeTab, setActiveTab] = useState('expense');
  const [groupMembers, setGroupMembers] = useState([]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'expense' && styles.activeTab]}
            onPress={() => setActiveTab('expense')}
          >
            <Text style={[styles.tabText, activeTab === 'expense' && styles.activeTabText]}>Create Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'group' && styles.activeTab]}
            onPress={() => setActiveTab('group')}
          >
            <Text style={[styles.tabText, activeTab === 'group' && styles.activeTabText]}>Create Group</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'expense' ? (
      <CreateExpenseForm navigation={navigation} />
    ) : (
      <CreateGroupForm groupMembers={groupMembers} setGroupMembers={setGroupMembers} navigation={navigation} />
    )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});