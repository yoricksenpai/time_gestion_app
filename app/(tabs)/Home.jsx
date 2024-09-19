import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Animated, Alert, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { human, systemWeights } from 'react-native-typography'
import { cn } from "../../utils/cn"; // Ensure the path is correct
import { useAuth } from '../../contexts/AuthContext';
import { getAllActivities, deleteActivities } from '../../api/activity';

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

const LoadingBentoGrid = () => {
  return (
    <View className="flex-1 justify-center items-center" style={{ minHeight: 300 }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="mt-4 text-blue-600 font-semibold">Chargement des activités...</Text>
    </View>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const params = useLocalSearchParams();

  const { user, loading, logout } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [activities, setActivities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const loadActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedActivities = await getAllActivities();
      setActivities(fetchedActivities);
    } catch (error) {
      console.error('Erreur lors du chargement des activités:', error);
      Alert.alert("Erreur", "Impossible de charger les activités. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadActivities();
    setRefreshing(false);
  }, [loadActivities]);

  useEffect(() => {
    if (!loading && user) {
      loadActivities();
    } else if (!loading && !user) {
      router.replace('/(auth)/sign-in');
    }
  }, [user, loading, loadActivities, router]);

  useEffect(() => {
    if (params.newActivity) {
      const newActivity = JSON.parse(params.newActivity);
      setActivities(prevActivities => [newActivity, ...prevActivities]);
    }
    if (params.refresh === 'true') {
      loadActivities();
    }
  }, [params.newActivity, params.refresh, loadActivities]);
  
  const AnimatedBentoGridItem = Animated.createAnimatedComponent(BentoGridItem);

  useEffect(() => {
    if (selectedItems.length === 0) {
      setIsMultiSelect(false);
    }
  }, [selectedItems]);

  const handleDeleteSelectedItems = async () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ces tâches ?",
      [
        {
          text: "Non",
          style: "cancel"
        },
        {
          text: "Oui",
          onPress: async () => {
            try {
              const result = await deleteActivities(selectedItems);
              console.log(result);
              await loadActivities();
              handleClearSelection();
              Alert.alert("Succès", `${result.deletedCount} activité(s) supprimée(s) avec succès`);
            } catch (error) {
              console.error('Erreur lors de la suppression des activités:', error);
              Alert.alert("Erreur", "Une erreur est survenue lors de la suppression des activités");
            }
          }
        }
      ]
    );
  };

  const handlePress = (id) => {
    if (isMultiSelect) {
      setSelectedItems(prev => {
        if (prev.includes(id)) {
          return prev.filter(item => item !== id);
        } else {
          return [...prev, id];
        }
      });
    } else {
      router.push({
        pathname: '/Update',
        params: { id: id }
      });
    }
  };

  const handleLongPress = (id) => {
    setIsMultiSelect(true);
    setSelectedItems([id]);
  };

  const handleClearSelection = () => {
    setIsMultiSelect(false);
    setSelectedItems([]);
  };

  const headerHeight = 150;
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const tabs = useMemo(() => ["Tasks", "Events", "Reminders"], []);
  const fakeTasks = useMemo(() => [
    { id: 'fake1', title: "Important events", description: "Key dates to remember", nature: "Task" },
    { id: 'fake2', title: "Inspirational quotes", description: "Daily motivation", nature: "Task" },
    { id: 'fake3', title: "Project milestones", description: "Track your progress", nature: "Task" },
    { id: 'fake4', title: "Healthy recipes", description: "Nutritious meal ideas", nature: "Task" },
    { id: 'fake5', title: "Podcasts to listen", description: "Expand your knowledge", nature: "Task" },
  ], []);

  const filteredActivities = useMemo(() => {
    let allActivities = [...activities, ...fakeTasks];
    
    switch (tabs[selectedTab]) {
      case 'Tasks':
        return allActivities.filter(activity => activity.nature === 'Task');
      case 'Events':
        return allActivities.filter(activity => activity.nature === 'Event');
      case 'Reminders':
        return allActivities.filter(activity => activity.nature === 'Reminder');
      default:
        return allActivities;
    }
  }, [activities, fakeTasks, selectedTab, tabs]);

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
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-headerHeight, 0, headerHeight],
          outputRange: [headerHeight / 2, 0, -headerHeight / 3],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: scrollY.interpolate({
      inputRange: [0, headerHeight / 2],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })
  }), [scrollY, headerHeight]);

  if (loading || !fontsLoaded) {
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
          className="bg-white rounded-lg p-4 mb-2 mt-2 font-poppins border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
        contentContainerStyle={{ paddingTop: headerHeight + 10, minHeight: SCREEN_HEIGHT + 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={headerHeight}
          />
        }
      >
        <BentoGrid>
          {isLoading ? (
            <LoadingBentoGrid />
          ) : (
            filteredActivities.map((activity) => (
              <AnimatedBentoGridItem
                key={activity._id || activity.id}
                style={{ opacity: fadeAnim }}
                title={activity.name || activity.title}
                description={activity.description}
                isSelected={selectedItems.includes(activity._id || activity.id)}
                isMultiSelect={isMultiSelect}
                onPress={() => handlePress(activity._id || activity.id)}
                onLongPress={() => handleLongPress(activity._id || activity.id)}
              />
            ))
          )}

          <View className="w-[48%] aspect-square mb-4 rounded-xl items-center justify-center">
            <TouchableOpacity
              className={cn(
                "p-5 rounded-full shadow-md",
                isMultiSelect ? "bg-red-500" : "bg-blue-500", 
                isLoading ? "hidden" : "visible"
              )}
              onPress={() => {
                if (isMultiSelect) {
                  if(selectedItems.length > 0){
                    handleDeleteSelectedItems();
                  } else {
                    handleClearSelection();
                  }
                } else {
                  router.push('/Create');
                }
              }}
            >
              <Ionicons name={isMultiSelect ? (selectedItems.length > 0 ? "trash" : "close") : "add"} size={24} color="white" />
            </TouchableOpacity>
          </View>
        </BentoGrid>
        <View className="h-20"></View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;