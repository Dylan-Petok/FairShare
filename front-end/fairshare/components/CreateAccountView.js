import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function CreateAccountView({ navigation }){
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log("Email", email);
        console.log("Password", password);
        console.log("First Name", firstName);
        console.log("Last Name", lastName),
        console.log("UserName", userName);
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}> Create Account </Text>

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

            <Button title="Submit" onPress={handleSubmit} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Or Log in here</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 8,
    },
    link: {
      color: 'blue',
      marginTop: 20,
      textAlign: 'center',
    },
  });