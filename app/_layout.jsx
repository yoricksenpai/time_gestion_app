import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from "expo-router"

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ presentation: 'modal', headerShown:false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />

    </Stack>
  )
}

export default Layout
