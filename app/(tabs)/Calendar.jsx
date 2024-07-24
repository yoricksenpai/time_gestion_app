import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as CalendarAPI from 'expo-calendar';
import { useFonts } from 'expo-font';

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    const [fontsLoaded] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    });
    const Goal = ({ title, time}) => (
        <TouchableOpacity>
            <View className="bg-[#F0F0F0] p-4 rounded-lg mb-4">

                <View className='mb-1'>
                    <Text className="text-lg font-poppinsbold">{title}</Text>
                    <Text className=" font-poppins">{time}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
    useEffect(() => {
        (async () => {
            const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await CalendarAPI.getCalendarsAsync();
                const events = await CalendarAPI.getEventsAsync(
                    calendars[0].id,
                    new Date(),
                    new Date(new Date().getTime() + 604800000) // 7 days from now
                );
                setEvents(events);
                markEventDates(events);
            }
        })();
    }, []);

    const markEventDates = (events) => {
        let marked = {};
        events.forEach((event) => {
            const date = event.startDate.split('T')[0]; // format the date
            marked[date] = {
                marked: true,
                dotColor: 'skyblue',
                activeOpacity: 0,
            };
        });
        setMarkedDates(marked);
    };

    const onDayPress = (day) => {
        // Si la date est déjà sélectionnée, la désélectionner
        if (selectedDate === day.dateString) {
            setSelectedDate(null);
            setMarkedDates({
                ...markedDates,
                [day.dateString]: {
                    ...markedDates[day.dateString],
                    selected: false,
                    selectedDayBackgroundColor: 'transparent',
                },
            });
        } else {
            // Sinon, la sélectionner
            if (selectedDate) {
                setMarkedDates({
                    ...markedDates,
                    [selectedDate]: {
                        ...markedDates[selectedDate],
                        selected: false,
                        selectedDayBackgroundColor: 'transparent',
                    },
                });
            }

            setSelectedDate(day.dateString);
            setMarkedDates({
                ...markedDates,
                [day.dateString]: {
                    ...markedDates[day.dateString],
                    selected: true,
                    selectedDayBackgroundColor: 'blue', // Couleur bleu foncé
                },
            });
        }
    };

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-poppins mb-4">Calendar</Text>
            <Calendar
                current={new Date().toISOString().split('T')[0]}
                minDate={'2020-01-01'}
                maxDate={'2030-12-31'}
                onDayPress={onDayPress}
                monthFormat={'MMMM yyyy'} // Affiche le mois en lettres et l'année
                hideArrows={false}
                hideExtraDays={false}
                firstDay={1}
                hideDayNames={false}
                showWeekNumbers={false}
                enableSwipeMonths={true}
                markedDates={markedDates}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: 'blue', // Couleur bleu foncé
                    selectedDayTextColor: '#ffffff',
                    dayTextColor: '#2d4150',
                    dotColor: 'skyblue',
                    selectedDotColor: '#ffffff',
                    monthTextColor: 'skyblue',
                    indicatorColor: 'skyblue',
                    textDayFontFamily: 'font-poppins',
                    textMonthFontFamily: 'font-poppins',
                    textDayHeaderFontFamily: 'font-poppins',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                }}
            />
            <View className="mt-4">
                {events.map((event) => (
                    <View key={event.id} className="bg-gray-200 p-2 rounded-md mb-2">
                        <Text className="text-lg font-semibold">{event.title}</Text>
                        <Text className="text-gray-600">
                            {new Date(event.startDate).toLocaleString()} - {new Date(event.endDate).toLocaleString()}
                        </Text>
                    </View>
                ))}
            </View>
            <ScrollView>
                <Goal title={'Health Check'} time={'9:00-10:30AM'}></Goal>
            </ScrollView>
        </View>
    );
};

export default CalendarComponent;