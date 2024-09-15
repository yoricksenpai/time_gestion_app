import React from 'react';
import { Button } from "tamagui";
import { useFonts } from 'expo-font';

const CustomButton = ({ title, handlePress, isLoading }) => {
  const [fontsLoaded] = useFonts({
    poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Button
      size="$3"
      width={300}
      theme="active"
      backgroundColor="#2F80ED"  // Changed to a specific blue color
      color="white"  // Added to ensure text is white
      borderRadius="$2"  // Reduced border radius for a less rounded look
      height={55}  // Reduced height to match the image
      marginTop={28}
      onPress={handlePress}
      disabled={isLoading}
      opacity={isLoading ? 0.5 : 1}
      fontFamily="$body"
      fontSize={17}  // Slightly reduced font size
      fontWeight="bold"  // Made the text bold
    >
      {title}
    </Button>
  );
};

export default CustomButton;