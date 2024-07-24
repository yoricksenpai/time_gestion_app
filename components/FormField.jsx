import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { icons } from "../constants";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const FormField = ({
                       title,
                       value,
                       placeholder,
                       handleChangeText,
                       otherStyles,
                       keyboardType,
                       secureTextEntry,
                   }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = title.toLowerCase().includes("mot de passe");

    return (
        <StyledView className={`space-y-0 space-x-0 gap-0 mt-4`}>
            <StyledText className='text-m text-black' style={{ fontFamily: 'poppinsBold' }}>{title}</StyledText>

            <StyledView className='border-2 rounded-xl border-gray-400 w-full h-12 px-4 focus:border-gray-300 items-center flex-row'>
                <StyledTextInput
                    className='flex-1 text-black font-poppins text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !showPassword}
                />

                {isPasswordField && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <StyledImage
                            source={showPassword ? icons.eyeHide : icons.eye}
                            className='w-6 h-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </StyledView>
        </StyledView>
    );
};

export default FormField;