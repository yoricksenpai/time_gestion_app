import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <>
          <Tabs name='App' options={{ headerShown: false, title: 'Home' }}>
        <Tabs.Screen
          name='Home'
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            title: 'Home',
            tabBarIcon: ({focused}) => (
              <Ionicons name={'home-outline'} size={24} color={focused ? 'sky': 'gray'} />
            ),
          }}
        />
        <Tabs.Screen
          name='Profile'
          options={{
            headerShown: false,
            tabBarShowLabel: false,

            title: 'Profile',
            tabBarIcon: ({focused}) => (
              <Ionicons name={'person-outline'} size={24} color={focused ? 'blue' : 'gray'} />
            ),
          }}
        />
        <Tabs.Screen
          name='Calendar'
          options={{
            headerShown: false,
            title: 'Calendar',
            tabBarShowLabel: false,

            tabBarIcon: ({focused}) => (
              <Ionicons name={'calendar-outline'} size={24} color={focused ? 'blue' : 'gray'} />
            ),
          }}
        />

        <Tabs.Screen
          name='Create'
          options={{
            headerShown: false,
            title: 'Create',
            tabBarShowLabel: false,

            tabBarIcon: ({focused}) => (
              <Ionicons name={'add-circle-outline'} size={24} color={focused ? 'blue' : 'gray'} />
            ),
          }}
              />

      </Tabs>
    </>
  );
};

export default TabsLayout;

