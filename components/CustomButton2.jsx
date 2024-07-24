import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import {useFonts} from "expo-font";

       /** home button &**/
const CustomButton = ({title, handlePress,isLoading}) => {
    const [fontsLoaded] = useFonts({
               poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
               Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
           });
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-sky-500 rounded-xl 
    h-14 w-full mt-7 justify-center items-center
    ${isLoading ? 'opacity-50' : ''}`}
    disabled={isLoading}
    >
      <Text style={{ fontFamily: 'poppinsBold' }} className={`
        text-lg`}>
            {title}
        </Text>
    </TouchableOpacity>
  )

}

export default CustomButton