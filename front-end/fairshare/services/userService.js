const BASE_URL = 'http://192.168.10.105:8080/api/users/search'; // Replace with your actual backend URL

export const searchUsers = async (query, token, groupMembers) => {
  try {
    const memberUserNames = groupMembers
      .filter(member => !member.isGuest) // Exclude guest members
      .map(member => member.userName)
      .join(',');
    const response = await fetch(`${BASE_URL}?query=${query}&exclude=${memberUserNames}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const results = await response.json();
    return results; // Return the results as they are
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};