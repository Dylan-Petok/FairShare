import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getExpensesByGroup } from '../../services/expenseService';
import { fetchGroupMembers } from '../../services/groupService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ExpensesTab({ expenses, navigation, groupId }) {
  return (
    <ScrollView contentContainerStyle={styles.expenseTabContainer}>
      {expenses.map((expense) => (
        <TouchableOpacity
          key={expense.expenseID}
          style={styles.expenseContainer}
          onPress={() => navigation.navigate('ExpenseDetails', { groupId, expenseId: expense.expenseID, expenseName: expense.expenseName })}
        >
          <View style={styles.expenseDetails}>
            <Text style={styles.expenseName}>{expense.expenseName}</Text>
            <Text style={styles.expenseDesc}>{expense.expenseDesc}</Text>
            <Text style={styles.expenseDesc}>{formatDate(expense.expenseDate)}</Text>
          </View>

          <View style={styles.expenseAmountContainer}>
            <Text style={styles.expenseAmount}>${expense.totalAmount}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function MembersTab({ members }) {
  return (
    <ScrollView contentContainerStyle={styles.membersTabContainer}>
      {members.map((member) => (
        <View key={member.userId} style={styles.memberContainer}>
          <Image
            source={{ uri: member.profilePicUrl || 'https://via.placeholder.com/100/gray' }}
            style={styles.memberImage}
          />
          <View style={styles.memberDetails}>
            <Text style={styles.memberName}>{member.userName}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default function GroupDetails({ route, navigation }) {
  const { groupId } = route.params;
  const [activeTab, setActiveTab] = useState('Expenses');
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);

  const handleTabFocus = async () => {
    if (activeTab === 'Expenses') {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const fetchedExpenses = await getExpensesByGroup(groupId, token);
        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    } else if (activeTab === 'Members') {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const groupMembers = await fetchGroupMembers(groupId, token);
        setMembers(groupMembers);
      } catch (error) {
        console.error('Error fetching group members:', error);
      }
    }
  };

  useEffect(() => {
    handleTabFocus();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Expenses' && styles.activeTab]}
          onPress={() => setActiveTab('Expenses')}
        >
          <Text style={[styles.tabText, activeTab === 'Expenses' && styles.activeTabText]}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Members' && styles.activeTab]}
          onPress={() => setActiveTab('Members')}
        >
          <Text style={[styles.tabText, activeTab === 'Members' && styles.activeTabText]}>Members</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Expenses' ? (
        <ExpensesTab expenses={expenses} onTabFocus={handleTabFocus} navigation={navigation} groupId={groupId} />
      ) : (
        <MembersTab members={members} onTabFocus={handleTabFocus} navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  // ------------------------- expense styles --------------------------------------------
  expenseTabContainer: {
    flexGrow: 1,
  },
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  expenseDetails: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseDesc: {
    fontSize: 14,
    color: '#666',
  },
  expenseAmountContainer: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  // ------------------------------ members styles --------------------------------
  membersTabContainer: {
    flexGrow: 1,
  },
  memberContainer: {
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
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
  },
  memberDetails: {
    marginLeft: 15,
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});