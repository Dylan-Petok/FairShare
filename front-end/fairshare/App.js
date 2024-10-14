import { View, Text, Button } from 'react-native';
import CreateAccountView from './components/CreateAccountView';
import LoginAccountView from './components/LoginAccountView';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginAccountView} options={{ title: 'Log In' }}/>
        <Stack.Screen name="CreateAccount" component={CreateAccountView} options={{ title: 'Create Account' }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );

  
}