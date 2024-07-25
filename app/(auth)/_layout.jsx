import React, {useContext, useEffect} from "react";
import {Stack, useRouter} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from '../../contexts/AuthContext';
const Auth_layout = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        if (user) {
            // Rediriger vers la page d'accueil si l'utilisateur est déjà connecté
            router.replace('/(tabs)/Home');
        }
    }, [user]);
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
