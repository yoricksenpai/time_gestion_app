import React from 'react'
import { Slot, Stack } from "expo-router"
import { AuthProvider } from '../contexts/AuthContext'; // Ajoutez cette ligne
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Layout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
            <Stack screenOptions={{animation : 'flip'}}>
                <Stack.Screen name="index" options={{ headerShown: false, animation : 'flip' }} />
                <Stack.Screen name="(tabs)" options={{ headerShown:false, animation : 'flip' }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false,animation : 'flip' }} />
            </Stack>
        </AuthProvider>
        </GestureHandlerRootView>
    )
}

export default Layout