// fairshare/services/debtService.js

const BASE_URL = 'http://192.168.10.105:8080/api/debts';

export const getDebtsByLender = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/lender`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch debts by lender');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching debts by lender:', error);
    throw error;
  }
};

export const getDebtsByBorrower = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/borrower`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch debts by borrower');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching debts by borrower:', error);
    throw error;
  }
};

export const settleDebt = async (debtID, token) => {
    try {
      const response = await fetch(`${BASE_URL}/settle/${debtID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to settle debt');
      }
      return await response.json();
    } catch (error) {
      console.error('Error settling debt:', error);
      throw error;
    }
  };