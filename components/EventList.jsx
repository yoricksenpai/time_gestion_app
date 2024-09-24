import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import EventItem from './EventItem';
import styles from '../constants/styles';

const EventList = ({ events, viewMode, setViewMode, onEventPress }) => {
        console.log('EventList props:', { events, viewMode }); // Ajoutez ce log

  const renderItem = ({ item }) => (
    <EventItem event={item} onPress={onEventPress} />
  );

  return (
    <>
      <View style={styles.eventsHeader}>
        <Text style={styles.eventsHeaderText}>Activities</Text>
        <TouchableOpacity onPress={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}>
          <Text style={styles.viewModeText}>{viewMode === 'month' ? 'Week View' : 'Month View'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.eventsList}
      />
    </>
  );
};

export default EventList;