import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { Image } from 'react-native';
import CustomButton2 from '../components/CustomButton2';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { useFonts } from '../hooks/useFonts';

// Empêcher l'écran de démarrage de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts();

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View className='flex-1 items-center bg-slate-200 dark:bg-slate-800 justify-center' onLayout={onLayoutRootView}>
            <SafeAreaView className="text-center">
                <View>
                    <View className="flex-1 items-center bg-slate-200 dark:bg-slate-800 justify-center">
                        <Image
                            source={images.cards}
                            className="max-w-[300px] max-h-[300px] w-full h-[300px]"
                            resizeMode='contain'
                            borderRadius={35}
                        />

                        <View className="p-4 mt-5">
                            <Text className="font-poppinsBold text-4xl dark:text-white text-center">TimeZen</Text>
                            <Text className="font-poppins dark:text-white text-center text-lg">
                                Enhance time management skills effortlessly
                            </Text>
                        </View>

                        <CustomButton2
                            title="Get Started"
                            handlePress={() => router.push('/sign-up')}
                        />

                        <CustomButton2
                            title="Connect you to Timezen"
                            handlePress={() => router.push('/sign-in')}
                        />

                    </View>
                </View>

                <StatusBar backgroundColor='#fff' style="light" />

            </SafeAreaView>
        </View>
    );
}