import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Auth_layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='sign-in'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='sign-up'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='resetPassword'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='resetPassword1'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  );
};

export default Auth_layout;
//mongodb user password bJHv3cXkC7LWNbJv
