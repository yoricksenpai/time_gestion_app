import { useFonts } from "expo-font";
  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    Julius: require('../assets/fonts/JuliusSansOne-Regular.ttf'),


  });
  export default fontsLoaded