import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton2";
import {Link, useNavigation} from "expo-router";
import PasswordStrengthIndicator from "./TempFile";
import { styled } from "nativewind";
import {useFonts} from "expo-font";
import { registerUser, loginUser } from '../../api/auth';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const Inscription = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    poppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

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
    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await registerUser(form.email, form.password);
      alert("Inscription réussie");
      navigation.navigate('SignIn');
    } catch (error) {
      alert("Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <StyledSafeAreaView className='bg-white h-full'>
      <StyledScrollView>
        <StyledView className='w-11/12 mx-auto justify-center  min-h-[85vh] items-center px-4 my-4'>
          <StyledImage
            source={images.logo}
            resizeMode='contain'
          />

          <StyledText className='text-lg text-black text-center font-poppins mt-7'>
            Sign up to optimize your productivity
          </StyledText>

          <FormField
            title='Email*'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType='email-address'
          />

          <FormField
            title='Mot de passe*'
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
              setPasswordStrength(getPasswordStrength(e));
            }}
            secureTextEntry
          />

          <PasswordStrengthIndicator strength={passwordStrength} />

          <FormField
            title='Confirmation du mot de passe*'
            value={form.confirmPassword}
            handleChangeText={(e) => {
              setForm({ ...form, confirmPassword: e });
              setPasswordStrength(getPasswordStrength(e));
            }}
            secureTextEntry
          />

          <CustomButton
            title='Inscription'
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <StyledView className='justify-center pt-1 flex-row gap-2'>
            <StyledText className='text-base text-black font-poppins'>
              Already used Timezen App ?
            </StyledText>
            <Link
                style={{ fontFamily: 'poppinsBold' }}
              href='/sign-in'
              className='text-base  font-poppins underline'
            >
              sign-in
            </Link>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default Inscription;
