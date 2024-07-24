import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import "nativewind";
import CustomButton from "../../components/CustomButton2";

const resetpassword = () => {
  const [form, setForm] = useState({
    email: "",
    number: "+237",
    password: "",
    userName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    // Add your submission logic here
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center items-center  min-h-[85vh] px-4 my-4'>
          {/*<Image*/}
          {/*  source={images.logo}*/}
          {/*  resizeMode='contain'*/}
          {/*  className='w-[100px] h-[65px]'*/}
          {/*/>*/}

          <Text style={{fontFamily:"poppinsBold"}} className='text-xl  text-center text-black  pb-2'>
            Reinitialiser votre Mot de passe
          </Text>

          <Text className='text-base text-black text-center font-poppins p-2'>
            Entrez un e-mail ou un nom utilisateur valide pour recevoir les
            instructions de reinitialisation
          </Text>

          <FormField
            title='E-mail ou Nom utilisateur'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-4'
            keyboardType='email-address'
          />

          <FormField
            title='N° de Téléphone'
            value={form.number}
            handleChangeText={(e) => setForm({ ...form, number: e })}
            otherStyles='mt-4'
            keyboardType='phone-pad'
            size={12}
          />

          <View
            className='justify-end items-end
          '
          >
            <Text className='text-black mt-1'> (Optionel)</Text>
          </View>

          <CustomButton
            title='Envoyer'
            handlePress={submit}
            containerStyle='mt-3'
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default resetpassword;
