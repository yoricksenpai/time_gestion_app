import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { useFonts } from '../../hooks/useFonts';
import * as SplashScreen from "expo-splash-screen";
import useCalendarDates from '../../utils/calendarUtils';
import CalendarView from '../../components/CalendarView';
import EventList from '../../components/EventList';
import FilterButtons from '../../components/FilterButtons';
import { getActivitiesByDateRange } from '../../api/activity';
import { useRouter } from "expo-router";
import { human, material } from 'react-native-typography';

const CalendarComponent = () => {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('all');
    const { markedDates, onDayPress, markEventDates } = useCalendarDates();
    const [fontsLoaded] = useFonts();
    const [viewMode, setViewMode] = useState('month');

    useEffect(() => {
        const today = new Date();
        const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        fetchActivities(today, oneMonthLater);
    }, [markEventDates]);

    const fetchActivities = async (startDate, endDate) => {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedActivities = await getActivitiesByDateRange(startDate, endDate);
            const now = new Date();
            const nonExpiredActivities = fetchedActivities.filter(activity => new Date(activity.endDate) >= now);
            setEvents(nonExpiredActivities);
            markEventDates(nonExpiredActivities);
        } catch (error) {
            console.error('Error fetching activities:', error);
            setError('Failed to load activities. Please try again. ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const today = new Date();
        const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        fetchActivities(today, oneMonthLater).then(() => setRefreshing(false));
    }, []);

    const filteredEvents = events.filter(event => {
        if (filter === 'all') return true;
        return event.nature.toLowerCase() === filter;
    });

    const handleEventPress = (event) => {
        router.push({
            pathname: '/Update',
            params: { id: event._id }
        });
    };

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const renderItem = ({ item }) => {
        if (item.type === 'calendar') {
            return (
                <>
                    <Text style={[human.headline, 'text-center my-5']}>Calendar</Text>
                    <CalendarView markedDates={markedDates} onDayPress={onDayPress} />
                    <FilterButtons filter={filter} setFilter={setFilter} />
                </>
            );
        } else if (item.type === 'events') {
            if (filteredEvents.length === 0) {
                return (
                    <View className="flex-1 justify-center items-center p-5">
                        <Text style={[material.body1, 'text-center mb-2']}>
                            Aucune activité n'est disponible pour la période actuelle.
                        </Text>
                        <Text style={[material.body2, 'text-center text-gray-600']}>
                            Les activités peuvent être expirées ou absentes.
                        </Text>
                    </View>
                );
            }
            return (
                <EventList 
                    events={filteredEvents} 
                    viewMode={viewMode} 
                    setViewMode={setViewMode}
                    onEventPress={handleEventPress}
                />
            );
        }
        return null;
    };

    const data = [
        { type: 'calendar', id: 'calendar' },
        { type: 'events', id: 'events' }
    ];

    let content;
    if (isLoading) {
        content = <ActivityIndicator size="large" color="#0000ff" />;
    } else if (error) {
        content = <Text style={[material.body1, 'text-center text-red-500 m-5']}>{error}</Text>;
    } else {
        content = (
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        );
    }

    return (
        <View className="flex-1 bg-white" onLayout={onLayoutRootView}>
            {content}
            <View className="h-20"></View>
        </View>
    );
};

export default CalendarComponent;