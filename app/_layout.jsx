import React from 'react'
import { Slot, Stack } from "expo-router"
import { AuthProvider } from '../contexts/AuthContext'; // Ajoutez cette ligne

const Layout = () => {
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ presentation: 'modal', headerShown:false }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    )
}

export default Layout