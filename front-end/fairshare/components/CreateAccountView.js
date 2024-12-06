import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUser } from '../services/authService'; // Adjust the import path as needed

export default function CreateAccountView({ navigation }) {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    try {
      const userData = await createUser(email, userName, firstName, lastName, password);
      navigation.navigate('Main');
      console.log(userData);
    } catch (error) {
      console.error('Create account error:', error.message); // This will log to the browser console
      Alert.alert('Account could not be created', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>FairShare</Text>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Log in here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark gray text
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});