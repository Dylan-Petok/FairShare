import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function LoginAccountView({ navigation }){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log("UserName Submitted", userName);
        console.log("Password Submitted", password);
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