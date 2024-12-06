const BASE_URL = 'http://192.168.10.105:8080/api';
export const getExpensesByGroup = async (groupId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/groups/${groupId}/expenses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const expenses = await response.json();
    return expenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

export const getExpenseDetails = async (groupId, expenseId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/groups/${groupId}/expenses/${expenseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch expense details');
      }
      const expenseDetails = await response.json();
      console.log(expenseDetails)
      return expenseDetails;
    } catch (error) {
      console.error('Error fetching expense details:', error);
      return null;
    }
  };

  export const saveExpense = async (expenseData, token) => {
    console.log(expenseData)
    try {
      const response = await fetch(`${BASE_URL}/groups/${expenseData.groupId}/expenses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
      });
      if (!response.ok) {
        throw new Error('Failed to save expense');
      }
      return
    } catch (error) {
      console.error('Error saving expense:', error);
      throw error;
    }
  };