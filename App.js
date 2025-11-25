import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';

const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#050505',
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 6,
        height: 64,
      },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Home: 'sparkles-outline',
          Favorites: 'heart-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <FavoritesProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="light" />
          <Tabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesProvider>
  );
}
