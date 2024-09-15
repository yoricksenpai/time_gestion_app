import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { router } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton2";
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../../tamagui.config';
import PasswordStrengthIndicator from "./TempFile";
import { useAuth } from '../../contexts/AuthContext';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SignUp = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleInputChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
    if (field === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength >= 4) return "fort";
    if (strength === 3) return "medium";
    return "faible";
  };

  const submit = async () => {
    if (!form.email || !form.password || !form.confirmPassword || !form.username) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    if (passwordStrength === "faible") {
      alert("Veuillez choisir un mot de passe plus fort");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(form.username, form.email, form.password);
      alert("Inscription réussie");
      router.replace('/sign-in');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 justify-center items-center px-6 py-8">
          <StyledImage
            source={images.logo}
            resizeMode="contain"
            className="w-32 h-32 mb-6"
          />
          <StyledText className="text-3xl font-bold mb-2">Timezen</StyledText>
          <StyledText className="text-lg text-gray-600 mb-8 text-center">
            Sign up to optimize your productivity
          </StyledText>

          <FormField
            title="Nom d'utilisateur"
            value={form.username}
            handleChangeText={(text) => handleInputChange('username', text)}
          />

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

          <PasswordStrengthIndicator strength={passwordStrength} />

          <FormField
            title="Confirmation du mot de passe"
            value={form.confirmPassword}
            handleChangeText={(text) => handleInputChange('confirmPassword', text)}
            secureTextEntry
          />

          <CustomButton
            title="S'inscrire"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <StyledView className="flex-row justify-center items-center mt-6">
            <StyledText className="text-gray-600">Déjà un compte? </StyledText>
            <StyledTouchableOpacity onPress={() => router.push("/sign-in")}>
              <StyledText className="text-blue-500 font-bold">Se connecter</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledScrollView>
      </StyledSafeAreaView>
      </TamaguiProvider>
  );
};

export default SignUp;