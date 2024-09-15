import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton2";
import { useAuth } from '../../contexts/AuthContext';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../../tamagui.config';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SignIn = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
  };

  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(form.email, form.password);
      router.replace('/(tabs)/Home');
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 justify-center items-center px-6">
          <StyledImage
            source={images.logo}
            resizeMode="contain"
            className="w-32 h-32 mb-6"
          />
          <StyledText className="text-3xl font-bold mb-2">Timezen</StyledText>
          <StyledText className="text-lg text-gray-600 mb-8">
            Regain your productivity track
          </StyledText>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormField
            title="Mot de passe"
            value={form.password}
            handleChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
          />

          <StyledTouchableOpacity 
            className="self-end mb-4"
            onPress={() => router.push("/resetPassword")}
          >
            <StyledText className="text-blue-500">Mot de passe oublié?</StyledText>
          </StyledTouchableOpacity>

          <CustomButton
            title="Connexion"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <StyledView className="flex-row justify-center items-center mt-6">
            <StyledText className="text-gray-600">Pas encore de compte? </StyledText>
            <StyledTouchableOpacity onPress={() => router.push("/sign-up")}>
              <StyledText className="text-blue-500 font-bold">S'inscrire</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledScrollView>
      </StyledSafeAreaView>
      </TamaguiProvider>
  );
};

export default SignIn;
