
const BASE_URL = 'http://192.168.10.105:8080/api/groups'; // Replace with your actual backend URL

export const saveGroup = async (groupName, groupPicUrl, groupDesc, groupMembers, token) => {
  try {
    console.log(groupMembers)
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupName: groupName,
        pictureUrl: groupPicUrl,
        groupDesc: groupDesc,
        groupMembers: groupMembers,
      })
    });
    if (!response.ok) {
      throw new Error('Failed to save group');
    }
    return
  } catch (error) {
    console.error('Error saving group:', error);
    throw error;
  }
};

export const fetchUserGroups = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user groups');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user groups:', error);
      throw error;
    }
  };

  export const fetchGroupMembers = async (groupId, token) => {
    console.log("Fetching group:", groupId)
    try {
      const response = await fetch(`${BASE_URL}/${groupId}/members`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch group members');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching group members:', error);
      throw error;
    }
  };

