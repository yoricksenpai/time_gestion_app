// _layout.jsx
import React, { useContext, useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { AuthContext } from "../../contexts/AuthContext";
import CustomTabBar from '../../components/CustomTabBar';

const TabsLayout = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/sign-in');
        }
    }, [user]);

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