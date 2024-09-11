import { View, Text, Image } from "react-native";
import React, {useContext, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton2";
import {Link, router, useNavigation} from "expo-router";
import { styled } from "nativewind";
import {  loginUser } from '../../api/auth';
import { AuthContext } from '../../contexts/AuthContext';
const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);
const StyledLink = styled(Link);

const Connection = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username:"",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const result = await loginUser(form.email, form.password, form.username);
      // Utilisez la fonction login du contexte
      await login({
        token: result.token,
        // Ajoutez ici d'autres informations sur l'utilisateur si nécessaire
      });
      router.replace('/(tabs)/Home');
    } catch (error) {
      alert("Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
      <StyledSafeAreaView className='bg-white flex-1 justify-center w-full'>
        <StyledView className='w-full mx-auto justify-center items-center px-4 my-4'>
          <StyledImage
              source={images.logo}
              resizeMode='contain'
              alt='Timezen Logo'
          />
          <StyledText style={{fontFamily:'poppinsBold'}} className='text-2xl text-black  mt-4'>
            <StyledText >Timezen</StyledText>
          </StyledText>
          <StyledText className='text-lg text-black font-poppins mt-2'>
            Regain your productivity track
          </StyledText>
          <FormField
              title='Email*'
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles='mt-4'
              keyboardType='email-address'
          />
          <FormField
              title='Mot de passe*'
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-4'
              secureTextEntry
        />
        <FormField
          title="Nom d'utilisateur"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-4"
          keyboardType={"text"} />
        
          <StyledView className='flex-row justify-start w-full pt-2'>
            <StyledLink
                href='/resetPassword'
                className='text-primary underline mt-1'
            >
              <StyledText className='font-poppins'>Mot de passe oublié?</StyledText>
            </StyledLink>
          </StyledView>
          <CustomButton
              title='Connexion'
              handlePress={submit}
              isLoading={isSubmitting}
          />
          <CustomButton
              title='Inscription'
              handlePress={() => router.push("/sign-up")}
              isLoading={isSubmitting}
          />
        </StyledView>
      </StyledSafeAreaView>
  );
};

export default Connection;