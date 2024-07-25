import { StyleSheet, Text, View } from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Tabs, useRouter} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {AuthContext} from "../../contexts/AuthContext";

const TabsLayout = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
            router.replace('/(auth)/sign-in');
        }
    }, [user]);
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

