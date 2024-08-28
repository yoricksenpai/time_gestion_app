import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import EventItem from './EventItem';
import styles from '../constants/styles';

const EventList = ({ events, viewMode, setViewMode }) => (
    <>
        <View style={styles.eventsHeader}>
            <Text style={styles.eventsHeaderText}>Events</Text>
            <TouchableOpacity onPress={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}>
                <Text style={styles.viewModeText}>{viewMode === 'month' ? 'Week View' : 'Month View'}</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={events}
            renderItem={({ item }) => <EventItem event={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.eventsList}
        />
    </>
);

export default EventList;