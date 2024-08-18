import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as CalendarAPI from 'expo-calendar';
import { useFonts } from '../../hooks/useFonts';
import * as SplashScreen from "expo-splash-screen";
import Goal from '../../components/Goal';
import useCalendarDates from '../../utils/calendarUtils';

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const { markedDates, onDayPress, markEventDates } = useCalendarDates();
    const [fontsLoaded] = useFonts();

    useEffect(() => {
        const fetchCalendarEvents = async () => {
            const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await CalendarAPI.getCalendarsAsync();
                const fetchedEvents = await CalendarAPI.getEventsAsync(
                    calendars[0].id,
                    new Date(),
                    new Date(new Date().getTime() + 604800000) // 7 days from now
                );
                setEvents(fetchedEvents);
                markEventDates(fetchedEvents);
            }
        };

        fetchCalendarEvents();
    }, [markEventDates]);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View className="flex-1 bg-white p-7" onLayout={onLayoutRootView}>
            <Text className="text-2xl font-poppins mb-4">Calendar</Text>
            <Calendar
                current={new Date().toISOString().split('T')[0]}
                minDate={'2020-01-01'}
                maxDate={'2030-12-31'}
                onDayPress={onDayPress}
                monthFormat={'MMMM yyyy'}
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
                    selectedDayBackgroundColor: 'blue',
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
            <ScrollView className="mt-4">
                {events.map((event) => (
                    <View key={event.id} className="bg-gray-200 p-2 rounded-md mb-2">
                        <Text className="text-lg font-semibold">{event.title}</Text>
                        <Text className="text-gray-600">
                            {new Date(event.startDate).toLocaleString()} - {new Date(event.endDate).toLocaleString()}
                        </Text>
                    </View>
                ))}
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />
                <Goal className={`bg-amber-400`} title={'Health Check'} time={'9:00-10:30AM'} />

            </ScrollView>
        </View>
    );
};

export default CalendarComponent;