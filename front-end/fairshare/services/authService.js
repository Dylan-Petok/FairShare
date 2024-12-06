import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.10.105:8080/api/users';  // Replace with your actual backend URL

//function to handle login
export async function loginUser(userName, password){
    try{
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            }),
        });
        if(!response.ok){
            throw new Error(await response.text()); //throw error if login fails
        }

        const userData = await response.json();
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userName', userData.userName);
        await AsyncStorage.setItem('email', userData.email);
        return userData;

    } catch(error){
        throw error;
    }
}

export async function createUser(emailAddr, userName, firstName, lastName, password){
    try{
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailAddr,
                userName: userName,
                firstName: firstName,
                lastName: lastName, 
                password: password
            }),
        });
        if(!response.ok){
            throw new Error(await response.text());
        }

        const userData = await response.json();
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userName', userData.userName);
        await AsyncStorage.setItem('email', userData.email);
        return userData;

    } catch(error){
        throw error;
    }
}

export async function getUserToken() {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Failed to retrieve user token:', error);
        return null;
    }
}

export async function getUserName() {
    try {
        const userName = await AsyncStorage.getItem('userName');
        return userName;
    } catch (error) {
        console.error('Failed to retrieve user name:', error);
        return null;
    }
}

export async function getEmail() {
    try {
        const email = await AsyncStorage.getItem('email');
        return email;
    } catch (error) {
        console.error('Failed to retrieve user email:', error);
        return null;
    }
}

export async function fetchProtectedData() {
    try {
        const token = await getUserToken();
        const response = await fetch(`${BASE_URL}/protected-endpoint`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}