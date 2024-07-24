import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";

const ProgressBar = ({ progress, total }) => {
  const width = `${(progress / total) * 100}%`;
  return (
    <View className="h-2 bg-[#CDE2F2] rounded-lg overflow-hidden">
      <View style={{ width }} className="h-full bg-[#268EE1] rounded-lg" />
    </View>
  );
};

const Stat = ({ icon, value, label }) => (
  <View className="grid items-center text-center w-[27%]">
    <Ionicons name={icon} size={30} color="#000" />
    <Text className="text-xl text-center  font-poppinsbold">{value}</Text>
    <Text className=" text-center text-xs font-poppins">{label}</Text>
  </View>
);

const Goal = ({ title, description, progress, total }) => (
  <TouchableOpacity>
  <View className="bg-[#F0F0F0] p-6 rounded-lg mb-4">

    <View className='mb-2'>
    <Text className="text-lg font-poppinsbold">{title}</Text>
    <Text className="mb-2 font-poppins">{description}</Text>
    </View>
    
    <View className='flex flex-row justify-between mt-1 mb-1'>
      <Text className="font-poppins text-xs">Performance</Text>
      <Text className='font-poppins text-xs'>{progress}/{total}</Text>
    </View>
    
    <ProgressBar progress={progress} total={total} />
  </View>
  </TouchableOpacity>

);

const Profile = () => {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });
  return (
    <ScrollView className="flex-1 bg-gray-50 p-6">
      <View className="flex-row items-center gap-6 mb-6">
        <Ionicons name="logo-react" size={24} color="#000" />
        <View>
          <Text className="text-xl font-poppinsbold">TimeZen</Text>
          <Text className="text-lg font-poppins">@timezen.app</Text>
        </View>
      </View>
      <Text className="text-lg font-poppinsbold mb-6">Insights</Text>
      <View className="flex-row justify-between mb-8">
        <Stat icon="time" value="100%" label="Time management" />
        <Stat icon="flame" value="10,000" label="Activity tracked" />
        <Stat icon="trophy" value="10" label="Achievements" />
      </View>
      <Text className="text-lg font-poppinsbold mb-6">Goals</Text>
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
    </ScrollView>
  );
};

export default Profile;