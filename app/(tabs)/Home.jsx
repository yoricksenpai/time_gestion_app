import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";



const BentoGrid = ({ children }) => {
  return (
    <View className="flex-auto grow text-center flex-row w-auto flex-wrap justify-around">
      {children}
    </View>
  );
};

const BentoGridItem = ({ title, isSelected, isMultiSelect, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      className={`w-[49%] h-36 hover:text-justify mb-4 p-4 rounded-md shadow-lg ${isSelected ? (isMultiSelect ? 'bg-red-500' : 'bg-blue-500') : 'bg-sky-100'}`}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text className={`text-base font-poppins ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const underlineWidth = useRef(new Animated.Value(0)).current;
  const underlinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkAuth().then(r => "is a User");
  }, []);

  const checkAuth = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    if (!userToken) {
      router.replace('/(auth)/sign-in');
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedItems.length === 0) {
      setIsMultiSelect(false);
    }
  }, [selectedItems]);

  useEffect(() => {
    Animated.timing(underlineWidth, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.spring(underlinePosition, {
      toValue: selectedTab * 116.4,
      useNativeDriver: false,
    }).start();
  }, [selectedTab]);

  if (isLoading || !fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  const handlePress = (title) => {
    if (isMultiSelect) {
      setSelectedItems(prev => {
        if (prev.includes(title)) {
          return prev.filter(item => item !== title);
        } else {
          return [...prev, title];
        }
      });
    } else {
      setSelectedItems([title]);
    }
  };

  const handleLongPress = (title) => {
    setIsMultiSelect(true);
    setSelectedItems([title]);
  };

  const handleClearSelection = () => {
    setIsMultiSelect(false);
    setSelectedItems([]);
  };

  const tabs = ["Events", "Tasks", "Reminders"];

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="p-4">
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Type here to search events"
          placeholderTextColor="#999"
          style={{ fontFamily: 'Poppins' }}
        />
      </View>
      <View className="flex-row justify-between px-4 mb-4 relative">
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedTab(index)}>
            <Text className={`font-poppins ${selectedTab === index ? 'text-sky-600' : 'text-gray-800'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: -5,
            height: 2,
            width: underlineWidth,
            backgroundColor: 'skyblue',
            transform: [{ translateX: underlinePosition }]
          }}
        />
      </View>

      <BentoGrid>
        {["Important events", "Inspirational quotes", "Project milestones", "Healthy recipes", "Podcasts to listen"].map((title) => (
          <BentoGridItem
            key={title}
            title={title}
            isSelected={selectedItems.includes(title)}
            isMultiSelect={isMultiSelect}
            onPress={() => handlePress(title)}
            onLongPress={() => handleLongPress(title)}
          />
        ))}
        <View className="w-[48%] h-30 mb-4 rounded-md items-center justify-center">
          <TouchableOpacity className="p-5 rounded-md bg-blue-500 shadow-md" onPress={isMultiSelect ? handleClearSelection : null}>
            {isMultiSelect ? (
              <Ionicons name="trash" size={24} color="white" />
            ) : (
              <Text className="text-base font-poppins text-white">+</Text>
            )}
          </TouchableOpacity>
        </View>
      </BentoGrid>
    </ScrollView>
  );
};

export default Home;
