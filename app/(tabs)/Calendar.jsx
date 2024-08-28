import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import * as CalendarAPI from 'expo-calendar';
import { useFonts } from '../../hooks/useFonts';
import * as SplashScreen from "expo-splash-screen";
import useCalendarDates from '../../utils/calendarUtils';
import CalendarView from '../../components/CalendarView';
import EventList from '../../components/EventList';
import styles from '../../constants/styles';
import { sampleEvents } from '../../constants/samplesEvents';

const CalendarComponent = () => {
    const [events, setEvents] = useState(sampleEvents);
    const { markedDates, onDayPress, markEventDates } = useCalendarDates();
    const [fontsLoaded] = useFonts();
    const [viewMode, setViewMode] = useState('month');

    useEffect(() => {
        const fetchCalendarEvents = async () => {
            const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await CalendarAPI.getCalendarsAsync();
                const fetchedEvents = await CalendarAPI.getEventsAsync(
                    calendars[0].id,
                    new Date(),
                    new Date(new Date().getTime() + 604800000)
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
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={styles.headerText}>Calendar</Text>
            <CalendarView markedDates={markedDates} onDayPress={onDayPress} />
            <EventList events={events} viewMode={viewMode} setViewMode={setViewMode} />
        </View>
    );
};

export default CalendarComponent;