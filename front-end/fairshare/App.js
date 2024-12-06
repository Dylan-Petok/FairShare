import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CreateAccountView from './components/CreateAccountView';
import LoginAccountView from './components/LoginAccountView';
import SettlementsView from './components/SettlementsView';
import CreationModal from './components/creationModal/CreationModal';
import AccountView from './components/AccountView';
import GroupsView from './components/groupPage/GroupsView';
import FriendsView from './components/FriendsView';
import GroupDetails from './components/groupPage/GroupDetails'; 
import ExpenseDetails from './components/groupPage/ExpenseDetails'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function GroupsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupsView"
        component={GroupsView}
        options={{ title: 'Groups', headerLeft: () => null }} 
      />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={({ route }) => ({ title: route.params.groupName })} 
      />
      <Stack.Screen
        name="ExpenseDetails"
        component={ExpenseDetails}
        options={({ route, navigation }) => ({ title: "Expense Details" })} 
      />
    </Stack.Navigator>
  );
}

function MainTabNavigator({ navigation }){
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Settlements') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Groups') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Settlements" component={SettlementsView} options={{ title: 'Settlements' }}/>
      <Tab.Screen name="Groups" component={GroupsStack} options={{ headerShown: false }}/>
      <Tab.Screen 
        name="Creation" 
        options={{ 
          title: '', 
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ 
              position: 'absolute', 
              bottom: -10, 
              height: 70, 
              width: 70, 
              borderRadius: 35, 
              backgroundColor: '#007BFF', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <Ionicons name="add" size={40} color="#fff" />
            </View>
          ), 
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => navigation.navigate('CreationModal')}
              style={{ 
                top: -20, 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <View style={{ 
                width: 70, 
                height: 70, 
                borderRadius: 35, 
                backgroundColor: '#007BFF', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <Ionicons name="add" size={40} color="#fff" />
              </View>
            </TouchableOpacity>
          ), 
        }}
      >
        {() => null}
      </Tab.Screen>
      <Tab.Screen name="Friends" component={FriendsView} options={{ title: 'Friends' }}/>
      <Tab.Screen name="Account" component={AccountView} options={{ title: 'Account' }}/>
    </Tab.Navigator>
  );
}

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateAccountView" screenOptions={({ route }) => ({
          presentation: route.name === 'CreationModal' ? 'modal' : 'card',
        })}>
        <Stack.Screen name="Login" component={LoginAccountView} options={{ title: "" }}/>
        <Stack.Screen name="CreateAccount" component={CreateAccountView} options={{ title: '' }}/>
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="CreationModal" component={CreationModal} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}