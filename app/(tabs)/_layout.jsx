// _layout.jsx
import React, { useContext, useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { AuthContext } from "../../contexts/AuthContext";
import CustomTabBar from '../../components/CustomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * If the user is not logged in, redirect to the sign-in page.
 *
 * Otherwise, render the tabs layout, which includes the Home, Profile, Calendar, and Create screens.
 */
const TabsLayout = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();


useEffect(() => {
    if (!user && router.pathname !== '/(auth)/sign-in') {
        router.replace('/(auth)/sign-in');
    }
}, [user, router.pathname]);

    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                }}
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <Tabs.Screen name='Home' options={{ title: 'Home'}} />
                <Tabs.Screen name='Profile' options={{ title: 'Profile' }} />
                <Tabs.Screen name='Calendar' options={{ title: 'Calendar' }} />
                <Tabs.Screen name='Create' options={{ title: 'Create' }} />
            </Tabs>
        </>
    );
};

export default TabsLayout;