import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDebtsByLender, getDebtsByBorrower, settleDebt } from '../services/debtService';

export default function SettlementsView({ navigation }) {
  const [activeTab, setActiveTab] = useState('OwesYou');
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);

  useEffect(() => {
    const fetchDebts = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('userToken');
        const data = activeTab === 'OwesYou' ? await getDebtsByLender(token) : await getDebtsByBorrower(token);
        setDebts(data);
      } catch (error) {
        console.error('Error fetching debts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDebts();
  }, [activeTab]);

  const handleSettle = async (debtID) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await settleDebt(debtID, token);
      setDebts(debts.map(debt => debt.debtID === debtID ? { ...debt, settled: true } : debt));
      setModalVisible(false);
    } catch (error) {
      console.error('Error settling debt:', error);
      Alert.alert('Error', 'Failed to settle debt');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderDebtItem = ({ item }) => (
    <View style={styles.debtItem}>
      <View style={styles.debtInfo}>
        <Text style={styles.debtText}>Expense: {item.expenseName}</Text>
        <Text style={styles.debtText}>User: {item.otherUserName}</Text>
        <Text style={styles.debtText}>Amount: ${item.amountOwed.toFixed(2)}</Text>
        <Text style={styles.debtText}>Date: {formatDate(item.expenseDate)}</Text>
        <Text style={styles.debtText}>Group: {item.groupName}</Text>
        <Text style={styles.debtText}>Settled: {item.settled ? 'Yes' : 'No'}</Text>
      </View>
      <TouchableOpacity
        style={[styles.settleButton, item.settled && styles.settledButton]}
        onPress={() => {
          setSelectedDebt(item);
          setModalVisible(true);
        }}
        disabled={item.settled}
      >
        <Text style={styles.settleButtonText}>{item.settled ? 'Settled' : 'Settle'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'OwesYou' && styles.activeTab]}
          onPress={() => setActiveTab('OwesYou')}
        >
          <Text style={[styles.tabText, activeTab === 'OwesYou' && styles.activeTabText]}>Owes You</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'YouOwe' && styles.activeTab]}
          onPress={() => setActiveTab('YouOwe')}
        >
          <Text style={[styles.tabText, activeTab === 'YouOwe' && styles.activeTabText]}>You Owe</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={debts}
          renderItem={renderDebtItem}
          keyExtractor={(item) => item.debtID.toString()}
          contentContainerStyle={styles.content}
        />
      )}

      {/* Settle Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to settle this debt?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleSettle(selectedDebt.debtID)}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
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
  content: {
    flexGrow: 1,
  },
  debtItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff', // White background for debt items
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  debtInfo: {
    flex: 1,
  },
  debtText: {
    fontSize: 16,
    color: '#333', // Dark gray text
  },
  settleButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  settledButton: {
    backgroundColor: 'gray',
  },
  settleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
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
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark gray text
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});