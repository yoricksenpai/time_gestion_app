// hooks/useFonts.js
import { useFonts as useExpoFonts } from 'expo-font';

export const useFonts = () => {
  return useExpoFonts({
    poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });
};