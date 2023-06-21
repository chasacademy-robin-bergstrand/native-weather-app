import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import AddCity from './Screens/AddCity';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'hsla(360, 100%, 100%, 0.6)',
            },
            headerTransparent: true,
            headerTitle: 'Weather',
          }}
        />
        <Stack.Screen
          name='Add'
          component={AddCity}
          options={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'hsla(360, 100%, 100%, 0.6)',
            },
            headerTransparent: true,
            headerTitle: 'Add city',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
