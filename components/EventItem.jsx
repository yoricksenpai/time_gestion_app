// EventItem.jsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../constants/styles';

const EventItem = ({ event }) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableOpacity style={styles.eventItem}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{startDate.toDateString()}</Text>
      </View>
      <Text style={styles.eventTime}>
        {formatTime(startDate)} - {formatTime(endDate)}
      </Text>
      {event.notes && <Text style={styles.eventNotes}>{event.notes}</Text>}
    </TouchableOpacity>
  );
};

export default EventItem;