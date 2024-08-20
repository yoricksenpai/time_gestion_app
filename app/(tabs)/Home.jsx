import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {router, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { human, systemWeights } from 'react-native-typography'
import { cn } from "../../utils/cn"; // Assurez-vous que le chemin est correct

//ajoute le blur au header la prochaine fois 

const BentoGrid = ({ className, children }) => {
  return (
    <View className={cn("flex-1 flex-row flex-wrap justify-between", className)}>
      {children}
    </View>
  );
};

const BentoGridItem = ({ className, title, description, isSelected, isMultiSelect, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      className={cn(
        "w-[48%] aspect-square mb-4 p-4 rounded-xl shadow-lg",
        isSelected ? (isMultiSelect ? "bg-red-500" : "bg-blue-500") : "bg-white",
        className
      )}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View className="flex-1 justify-between">
        <Text className={cn(
          "text-base font-bold",
          isSelected ? "text-white" : "text-gray-800"
        )}>
          {title}
        </Text>
        <Text className={cn(
          "text-xs",
          isSelected ? "text-white" : "text-gray-600"
        )}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


const Home = () => {
  const router2 = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  

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

  const headerHeight = 150;
  const tabs = useMemo(() => ["Tasks", "Events", "Reminders"], []);
  const tasks = useMemo(() => [
    { title: "Important events", description: "Key dates to remember" },
    { title: "Inspirational quotes", description: "Daily motivation" },
    { title: "Project milestones", description: "Track your progress" },
    { title: "Healthy recipes", description: "Nutritious meal ideas" },
    { title: "Podcasts to listen", description: "Expand your knowledge" },
  ], []);

  const headerAnimatedStyle = useMemo(() => ({
    backgroundColor: scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: ['rgba(255,255,255,1)', 'rgba(255,255,255,0.8)'],
      extrapolate: 'clamp',
    }),
    shadowOpacity: scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, 0.3],
      extrapolate: 'clamp',
    }),
  }), [scrollY, headerHeight]);

  if (isLoading || !fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Animated.View
        className="absolute top-0 left-0 right-0 z-50 pt-5 px-4"
        style={[
          {
            height: headerHeight,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 5,
          },
          headerAnimatedStyle
        ]}
      >
        <TextInput
          className="bg-white rounded-lg p-4 mb-2 mt-2 font-poppins border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
          placeholder="Type here to search events"
          placeholderTextColor="#999"
        />
        <View className="flex-row justify-between">
          {tabs.map((tab, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setSelectedTab(index)}
              className={cn(
                "py-2 px-4 rounded-full",
                selectedTab === index ? "bg-blue-500" : "bg-transparent"
              )}
            >
              <Text className={cn(
                "font-poppins font-bold",
                selectedTab === index ? "text-white" : "text-blue-500"
              )}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: headerHeight + 10 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <BentoGrid>
          {tasks.map((task) => (
            <BentoGridItem
              key={task.title}
              title={task.title}
              description={task.description}
              isSelected={selectedItems.includes(task.title)}
              isMultiSelect={isMultiSelect}
              onPress={() => handlePress(task.title)}
              onLongPress={() => handleLongPress(task.title)}
            />
          ))}
          <View className="w-[48%] aspect-square mb-4 rounded-xl items-center justify-center">
            <TouchableOpacity
              className={cn(
                "p-5 rounded-full shadow-md",
                isMultiSelect ? "bg-red-500" : "bg-blue-500"
              )}
              onPress={() => {
                if (isMultiSelect) {
                  handleClearSelection();
                } else {
                  router2.push('/Create');
                }
              }}
            >
              <Ionicons name={isMultiSelect ? "trash" : "add"} size={24} color="white" />
            </TouchableOpacity>
          </View>
        </BentoGrid>
        <View className="h-20"></View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
