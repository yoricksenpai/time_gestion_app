// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { Link } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// const App = () => {
//   const [fontsLoaded] = useFonts({
//     poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
//     Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
//   });
//
//   if (!fontsLoaded) {
//     return null;
//   }
//
//   return (
//       <View className='flex-1 items-center bg-slate-200 dark:bg-slate-800 justify-center'>
//         <Text className='text-3xl dark:text-white font-poppinsBold'>Timezen</Text>
//         <Text className=' dark:text-white font-poppins font-light'>Enhance time management skills effortlessly</Text>
//         <Link className='dark:text-white' href='/Profile'>Go test the tabs</Link>
//       </View>
//   );
// };
//
// export default App;
import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";
import {  Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import CustomButton2 from '../components/CustomButton2';

export default function App() {
    const [fontsLoaded] = useFonts({
     poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
     Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
   });
    return (
        <View className='flex-1 items-center bg-slate-200 dark:bg-slate-800 justify-center'>
            <SafeAreaView className="text-center">
                <View>
                    <View className="flex-1 items-center bg-slate-200 dark:bg-slate-800 justify-center">
                        <Image
                            source={images.cards}
                            className="max-w-[300px] max-h-[300px] w-full h-[300px]"
                            resizeMode='contain'
                            borderRadius={35}
                        />

                        <View className=" p-4 mt-5">
                            <Text style={{ fontFamily: 'poppinsBold' }} className="text-4xl dark:text-white  text-center">TimeZen</Text>
                            <Text className="dark:text-white font-poppins  text-center text-lg">
                                Enhance time management skills effortlessly

                            </Text>
                        </View>

                        <View />


                        <CustomButton2
                            title="Get Started"
                            handlePress={()=> router.push('/sign-up')}
                        />



                        <CustomButton2
                            title="Create And Account"
                            handlePress={()=> router.push('/sign-in')}
                        />

                    </View>
                </View>

                <StatusBar backgroundColor='#fff' style="light" />

            </SafeAreaView>
        </View>
    );
}

