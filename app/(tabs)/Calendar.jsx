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

    //changer le style (encore) de la  page a cause des coulerus des taches et le scrollview bref et moche

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
        <View className="flex-1 bg-gray-100 p-7" onLayout={onLayoutRootView}>
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
                markedDates={markedDates}    theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#3498db',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#3498db',
        dayTextColor: '#2d4150',
        dotColor: '#3498db',
        selectedDotColor: '#ffffff',
        arrowColor: '#3498db',
        monthTextColor: '#3498db',
        indicatorColor: '#3498db',
        textDayFontFamily: 'poppins',
        textMonthFontFamily: 'poppinsBold',
        textDayHeaderFontFamily: 'poppins',
        textDayFontWeight: '400',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '400',
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
    }}
    style={{
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }}
/>
<ScrollView 
    className="mt-4"
    style={{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }}
    contentContainerStyle={{
        paddingBottom: 20,
    }}
>
    {events.map((event) => (
        <View key={event.id} className="bg-white p-4 rounded-md mb-3 shadow-md">
            <Text className="text-lg font-semibold font-poppins">{event.title}</Text>
            <Text className="text-gray-600 font-poppins">
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