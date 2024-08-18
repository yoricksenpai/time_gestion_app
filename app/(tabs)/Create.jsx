import React, { useCallback, useState } from 'react';
import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

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

    const router = useRouter();
    const scrollY = useSharedValue(0);
    const lastScrollY = useSharedValue(0);

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
            name,
            description,
            nature,
            creationDate: new Date(), // Using current date as creation date
            ...(nature === 'Reminder' && { reminderTime: combinedReminderTime }),
            ...((nature === 'Event' || nature === 'Task') && { endDate: combinedEndDate }),
            ...(nature === 'Event' && { allDay })
        };

        console.log(activityData);
        // Here you would typically send this data to your API
        router.back();
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

    const [fontsLoaded] = useFonts({
        poppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
        poppins: require('../../assets/fonts/Poppins-Medium.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    return (
        <SafeAreaView style={{ flex: 1 }} className='bg-gray-50'>
            <Animated.ScrollView
                className = 'p-5'
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Text className="text-3xl font-poppins font-bold mb-6 text-blue-600">Create New Activity</Text>

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
                                <Ionicons name="calendar-outline" size={24} color="gray" />
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
                                <Ionicons name="time-outline" size={24} color="gray" />
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
                                <Ionicons name="calendar-outline" size={24} color="gray" />
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
                                    <Ionicons name="time-outline" size={24} color="gray" />
                                </TouchableOpacity>
                                {renderDateTimePicker(showEndTimePicker, endTime, (event, date) => onChangeDate(event, date, 'endTime'), 'time')}
                            </View>
                        )}
                        {nature === 'Event' && (
                            <TouchableOpacity
                                className="flex-row items-center "
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
                        className="bg-blue-500 p-4 rounded-full items-center justify-center"
                        style={{ width: 60, height: 60 }}
                        onPress={handleSubmit}
                    >
                        <Ionicons name="checkmark" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="h-10"/>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

export default Create;