import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getExpenseDetails } from '../../services/expenseService'; // Make sure to implement this function in your service
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function ExpenseDetails({ route, navigation }) {
  const { groupId, expenseId, expenseName } = route.params;
  const [expenseDetails, setExpenseDetails] = useState(null);

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const details = await getExpenseDetails(groupId, expenseId, token);
        setExpenseDetails(details);
      } catch (error) {
        console.error('Error fetching expense details:', error);
      }
    };

    fetchExpenseDetails();
  }, [groupId, expenseId]);

  return (
    <View style={styles.container}>
      {expenseDetails ? (
        <ScrollView contentContainerStyle={styles.expenseDetailsContainer}>
          <View style={styles.card}>
            <Text style={styles.expenseTitle}>{expenseName}</Text>
            <Text style={styles.expenseDetailText}>Description: {expenseDetails.expenseDesc}</Text>
            <Text style={styles.expenseDetailText}>Date: {formatDate(expenseDetails.expenseDate)}</Text>
            <Text style={styles.expenseDetailText}>Total Amount: ${expenseDetails.totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.paidByTitle}>Paid By:</Text>
            <Text style={styles.paidByText}>{expenseDetails.paidByUser.firstName} {expenseDetails.paidByUser.lastName}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.participantsTitle}>Participants:</Text>
            {expenseDetails.participants.map((participant, index) => (
              <View key={index} style={styles.participantItem}>
                <Text style={styles.participantName}>{participant.firstName} {participant.lastName}</Text>
                <Text style={styles.participantOwes}>Owes: {participant.percentage}% (${participant.amountOwed.toFixed(2)})</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  expenseDetailsContainer: {
    padding: 20,
  },
  expenseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark gray text
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  expenseDetailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333', // Dark gray text
  },
  paidByTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paidByText: {
    fontSize: 16,
    color: '#333', // Dark gray text
  },
  participantsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  participantItem: {
    marginBottom: 10,
  },
  participantName: {
    fontSize: 16,
    color: '#333', // Dark gray text
  },
  participantOwes: {
    fontSize: 16,
    color: '#666', // Lighter gray text
  },
});