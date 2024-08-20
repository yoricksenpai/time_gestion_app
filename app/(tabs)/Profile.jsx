import React, {useCallback, useContext, useRef} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from '@/hooks/useFonts';
import { AuthContext } from '@/contexts/AuthContext';
import * as SplashScreen from "expo-splash-screen";
import { human, systemWeights } from 'react-native-typography'
import { LinearGradient } from 'expo-linear-gradient';

const ProgressBar = ({ progress, total }) => {
  const width = `${(progress / total) * 100}%`;
  return (
    <View className="h-3 bg-[#CDE2F2] rounded-full overflow-hidden">
      <LinearGradient
        colors={['#268EE1', '#15B2D1']}
        start={[0, 0]}
        end={[1, 0]}
        style={{ width, height: '100%' }}
        className="rounded-full"
      />
    </View>
  );
};

const Stat = ({ icon, value, label }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity className='m-1 shadow-2xl' onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View className="items-center bg-white p-3 rounded-xl shadow-md" style={{ transform: [{ scale: scaleAnim }] }}>
        <LinearGradient
          colors={['#268EE1', '#15B2D1']}
          className="p-3 rounded-full mb-2"
        >
          <Ionicons name={icon} size={24} color="#FFF" />
        </LinearGradient>
        <Text style={[human.title3, systemWeights.bold]} className="text-center font-poppins">{value}</Text>
        <Text style={[human.caption1]} className="italic text-center text-xs font-poppins text-gray-500">{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Goal = ({ title, description, progress, total }) => (
  <TouchableOpacity className="bg-white p-6 rounded-xl shadow-md mb-4">
    <View className='mb-2'>
      <Text style={[human.title2, systemWeights.bold]} className="text-lg font-poppins">{title}</Text>
      <Text style={[human.subhead]} className="mb-2 font-poppins text-gray-600">{description}</Text>
    </View>
    
    <View className='flex flex-row justify-between mt-1 mb-1'>
      <Text className="font-poppins text-xs text-gray-500">Performance</Text>
      <Text className='font-poppins text-xs text-gray-500'>{progress}/{total}</Text>
    </View>
    
    <ProgressBar progress={progress} total={total} />
  </TouchableOpacity>
);

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
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
    <ScrollView className="flex-1 bg-gray-100">
      <LinearGradient
        colors={['#268EE1', '#15B2D1']}
        className="p-6 pt-12 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-6">
            <Ionicons name="logo-react" size={40} color="#FFF" />
            <View>
              <Text style={[human.title1, systemWeights.bold]} className="font-poppins text-white">{user?.name || 'TimeZen'}</Text>
              <Text style={human.subhead} className="italic font-poppins text-white opacity-80">{user?.email || '@timezen.app'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={logout} className="bg-white p-2 rounded-full">
            <Ionicons name="log-out-outline" size={24} color="#268EE1" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View className="p-6">
        <Text style={[human.title2, systemWeights.bold]} className="text-lg font-poppins mb-6">Insights</Text>
        <View className="flex-row gap-4 justify-between  mb-8">
          <Stat icon="time" value="100%" label="Time management" />
          <Stat icon="flame" value="10,000" label="Activity tracked" />
          <Stat icon="trophy" value="10" label="Achievements" />
        </View>
        <Text style={[human.title2, systemWeights.bold]} className="text-lg font-poppins mb-6">Goals</Text>
        <View>
          <Goal
            title="Productivity guru"
            description="Plan for 500 minutes!"
            progress={200}
            total={500}
          />
          <Goal
            title="Weekend tasks"
            description="Complete tasks on weekends!"
            progress={1}
            total={2}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;