import React, { useContext, useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { AuthContext } from "../../contexts/AuthContext";
import CustomTabBar from '../../components/CustomTabBar';

const TabsLayout = () => {
    const { user, isLoading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/(auth)/sign-in');
        }
    }, [user, isLoading]);

    if (isLoading) {
        return null; // Ou un composant de chargement
    }

    if (!user) {
        return null; // L'utilisateur sera redirigé, pas besoin de rendre quoi que ce soit
    }

    return (
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
            
        </Tabs>
    );
};

export default TabsLayout;