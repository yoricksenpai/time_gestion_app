import React, { useState } from 'react';
import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import Animated, { useAnimatedScrollHandler, useSharedValue, FadeIn, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { createActivity } from '../../api/activity';

const Create = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nature, setNature] = useState('Event');
    const [reminderDate, setReminderDate] = useState(new Date());
    const [reminderTime, setReminderTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [allDay, setAllDay] = useState(false);
    const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);
    const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [notification, setNotification] = useState(null);
    const router = useRouter();
    const scrollY = useSharedValue(0);
    
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const [fontsLoaded] = useFonts({
        poppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
        poppins: require('../../assets/fonts/Poppins-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
   const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCreateActivity = async (activityData) => {
        try {
            const response = await createActivity(activityData);
            console.log('Activity created:', response);
            showNotification('Activity created successfully!');
             // Navigate back to Home and pass the new activity data
        router.push({
            pathname: '/Home',
            params: { newActivity: JSON.stringify(response) }
        });
        } catch (error) {
            console.error('Error creating activity:', error);
            showNotification('Failed to create activity. Please try again.', 'error');
        }
    };
    const handleSubmit = () => {
        const combinedReminderTime = new Date(
            reminderDate.getFullYear(),
            reminderDate.getMonth(),
            reminderDate.getDate(),
            reminderTime.getHours(),
            reminderTime.getMinutes()
        );

        const combinedEndDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            endTime.getHours(),
            endTime.getMinutes()
        );

        const activityData = {
            name: name.trim(),
            description:description.trim(),
            nature: nature,
            ...(nature === 'Reminder' && { reminderTime: combinedReminderTime.toISOString() }),
            ...((nature === 'Event' || nature === 'Task') && { endDate: combinedEndDate.toISOString() }),
            ...(nature === 'Event' && { allDay })
        };

        console.log(activityData);
        handleCreateActivity(activityData);
        // Here you would typically send this data to your API
        router.push('/Home')
    };

    const onChangeDate = (event, selectedDate, dateType) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || new Date();

            switch (dateType) {
                case 'reminderDate':
                    setReminderDate(currentDate);
                    setShowReminderDatePicker(Platform.OS === 'ios');
                    break;
                case 'reminderTime':
                    setReminderTime(currentDate);
                    setShowReminderTimePicker(Platform.OS === 'ios');
                    break;
                case 'endDate':
                    setEndDate(currentDate);
                    setShowEndDatePicker(Platform.OS === 'ios');
                    break;
                case 'endTime':
                    setEndTime(currentDate);
                    setShowEndTimePicker(Platform.OS === 'ios');
                    break;
            }
        } else {
            setShowReminderDatePicker(false);
            setShowReminderTimePicker(false);
            setShowEndDatePicker(false);
            setShowEndTimePicker(false);
        }
    };

    const renderDateTimePicker = (show, value, onChange, mode) => {
        return show && (
            <DateTimePicker
                value={value}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">

            <Animated.ScrollView
                className="p-5"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >

                <TouchableOpacity onPress={() => router.back()} className="mb-4">
                    <Ionicons name="arrow-back" size={24} color="#3B82F6" />
                </TouchableOpacity>

                                        {notification && (
                <Animated.View 
                    entering={FadeIn}
                    exiting={FadeOut}
                    className={`absolute bottom-10 left-5 right-5 p-4 rounded-lg ${
                        notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Text className="text-white font-poppins text-center text-lg">
                        {notification.message}
                    </Text>
                </Animated.View>
            )}
                 <LinearGradient
                     colors={['#BFDBFE', '#A5F3FC']}
                     className="flex-1 justify-center items-center rounded-2xl shadow-lg mb-1"
                           start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                 >
                <Text className="text-3xl font-poppinsBold mb-6 text-blue-600 p-10 text-center">Create New Activity</Text>
                </LinearGradient>
                     <View className="mb-4">
                    <Text className="font-poppins text-gray-700 mb-2">Name</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-3 font-poppins bg-white"
                        placeholder="Enter activity name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View className="mb-4">
                    <Text className="font-poppins text-gray-700 mb-2">Description</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-3 font-poppins bg-white"
                        placeholder="Enter description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <View className="mb-4">
                    <Text className="font-poppins text-gray-700 mb-2">Nature</Text>
                    <View className="border border-gray-300 rounded-lg bg-white">
                        <Picker
                            selectedValue={nature}
                            onValueChange={(itemValue) => setNature(itemValue)}
                            style={{ fontFamily: 'Poppins' }}
                        >
                            <Picker.Item label="Event" value="Event" />
                            <Picker.Item label="Task" value="Task" />
                            <Picker.Item label="Reminder" value="Reminder" />
                        </Picker>
                    </View>
                </View>

                {nature === 'Reminder' && (
                    <>
                        <View className="mb-4">
                            <Text className="font-poppins text-gray-700 mb-2">Reminder Date</Text>
                            <TouchableOpacity
                                className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center"
                                onPress={() => setShowReminderDatePicker(true)}
                            >
                                <Text className="font-poppins">{reminderDate.toDateString()}</Text>
                                <Ionicons name="calendar-outline" size={24} color="#3B82F6" />
                            </TouchableOpacity>
                            {renderDateTimePicker(showReminderDatePicker, reminderDate, (event, date) => onChangeDate(event, date, 'reminderDate'), 'date')}
                        </View>
                        <View className="mb-4">
                            <Text className="font-poppins text-gray-700 mb-2">Reminder Time</Text>
                            <TouchableOpacity
                                className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center"
                                onPress={() => setShowReminderTimePicker(true)}
                            >
                                <Text className="font-poppins">{reminderTime.toLocaleTimeString()}</Text>
                                <Ionicons name="time-outline" size={24} color="#3B82F6" />
                            </TouchableOpacity>
                            {renderDateTimePicker(showReminderTimePicker, reminderTime, (event, date) => onChangeDate(event, date, 'reminderTime'), 'time')}
                        </View>
                    </>
                )}

                {(nature === 'Event' || nature === 'Task') && (
                    <>
                        <View className="mb-4">
                            <Text className="font-poppins text-gray-700 mb-2">End Date</Text>
                            <TouchableOpacity
                                className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center"
                                onPress={() => setShowEndDatePicker(true)}
                            >
                                <Text className="font-poppins">{endDate.toDateString()}</Text>
                                <Ionicons name="calendar-outline" size={24} color="#3B82F6" />
                            </TouchableOpacity>
                            {renderDateTimePicker(showEndDatePicker, endDate, (event, date) => onChangeDate(event, date, 'endDate'), 'date')}
                        </View>
                        {!allDay && (
                            <View className="mb-4">
                                <Text className="font-poppins text-gray-700 mb-2">End Time</Text>
                                <TouchableOpacity
                                    className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center"
                                    onPress={() => setShowEndTimePicker(true)}
                                >
                                    <Text className="font-poppins">{endTime.toLocaleTimeString()}</Text>
                                    <Ionicons name="time-outline" size={24} color="#3B82F6" />
                                </TouchableOpacity>
                                {renderDateTimePicker(showEndTimePicker, endTime, (event, date) => onChangeDate(event, date, 'endTime'), 'time')}
                            </View>
                        )}
                        {nature === 'Event' && (
                            <TouchableOpacity
                                className="flex-row items-center mb-4"
                                onPress={() => setAllDay(!allDay)}
                            >
                                <View className={`w-6 h-6 border-2 border-blue-500 rounded mr-2 ${allDay ? 'bg-blue-500' : 'bg-white'}`} />
                                <Text className="font-poppins text-gray-700">All Day</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
                <View className="flex items-center mt-4 mb-20">
                    <TouchableOpacity
                        className="bg-blue-500 p-4 rounded-full items-center justify-center shadow-md"
                        style={{ width: 60, height: 60 }}
                        onPress={handleSubmit}
                    >
                        <Ionicons name="checkmark" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="h-10"/>
            </Animated.ScrollView>

            {notification && (
                <Animated.View 
                    entering={FadeIn}
                    exiting={FadeOut}
                    className={`absolute bottom-10 left-5 right-5 p-4 rounded-lg ${
                        notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Text className="text-white font-poppins text-center text-lg">
                        {notification.message}
                    </Text>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

export default Create;