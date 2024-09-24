import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from '@/hooks/useFonts';
import { human, systemWeights } from 'react-native-typography'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { getUserInfo, logoutUser, getUserProfile  } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Renders a progress bar component.
 *
 * @param {number} progress - The current progress value.
 * @param {number} total - The total value.
 * @return {JSX.Element} The progress bar component.
 */
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

/**
 * Stat component renders a statistic card with an icon, value, and label.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - icon: The name of the icon to display.
 *   - value: The value to display.
 *   - label: The label to display.
 * @return {JSX.Element} A statistic card component with an icon, value, and label.
 */
const Stat = ({ icon, value, label }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /**
   * Handles the onPressIn event, animating the scaleAnim property to reduce its size.
   *
   * This function uses the `Animated.spring` method to animate the `scaleAnim` property
   * from its current value to `0.95`. The `useNativeDriver` option is set to `true` to
   * enable hardware acceleration for the animation.
   *
   * @return {void} This function does not return anything.
   */
  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handles the onPressOut event, animating the scaleAnim property back to its original value.
   *
   * @return {void} This function does not return anything.
   */
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


/**
 * Renders a goal component.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the goal.
 * @param {string} props.description - The description of the goal.
 * @param {number} props.progress - The progress of the goal.
 * @param {number} props.total - The total amount of the goal.
 * @return {JSX.Element} The goal component.
 */
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
/**
 * Renders the profile screen.
 *
 * @return {JSX.Element} The profile screen component.
 * @throws {Error} If there is an error while fetching or updating user information.
 */
const Profile = () => {

  const { user, logout } = useAuth();
  const [fontsLoaded] = useFonts();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        router.replace('/(auth)/sign-in');
        return;
      }

      try {
        const [info, profile] = await Promise.all([
          getUserInfo(),
          getUserProfile()
        ]);
        setUserInfo(info);
        setUserProfile(profile);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      await logout();
      router.replace('/(auth)/sign-in');
    } catch (err) {
      setError('Failed to logout');
      console.error('Error logging out:', err);
    }
  };

  if (!fontsLoaded || loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!user) {
    return <Text>Please log in to view your profile.</Text>;
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
              <Text style={[human.title1, systemWeights.bold]} className="font-poppins text-white">{userInfo?.username || 'TimeZen'}</Text>
              <Text style={human.subhead} className="italic font-poppins text-white opacity-80">{userInfo?.email || '@timezen.app'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} className="bg-white p-2 rounded-full">
            <Ionicons name="log-out-outline" size={24} color="#268EE1" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View className="p-6">
        <Text style={[human.title2, systemWeights.bold]} className="text-lg font-poppins mb-6">Insights</Text>
        <View className="flex-row gap-4 justify-between  mb-8">
          <Stat icon="time" value={userProfile?.stats.timeManagement || "0%"} label="Time management" />
          <Stat icon="flame" value={userProfile?.stats.activityTracked || "0"} label="Activity tracked" />
          <Stat icon="trophy" value={userProfile?.stats.achievements || "0"} label="Achievements" />
        </View>
        <Text style={[human.title2, systemWeights.bold]} className="text-lg font-poppins mb-6">Goals</Text>
        <View>
          {userProfile?.goals && userProfile.goals.length > 0 ? (
            userProfile.goals.map((goal, index) => (
              <Goal
                key={index}
                title={goal.title}
                description={goal.description}
                progress={goal.progress}
                total={goal.total}
              />
            ))
          ) : (
            <View className="bg-white p-6 rounded-xl shadow-md">
              <Text style={[human.body, systemWeights.light, { color: '#6B7280' }]} className="text-center font-poppins">
                You haven't set any goals yet. Start setting goals to track your progress!
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="h-20"></View>
    </ScrollView>
  );
};

export default Profile;