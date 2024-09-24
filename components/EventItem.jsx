import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../constants/styles';

const EventItem = ({ event, onPress }) => {
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const reminderTime = event.reminderTime ? new Date(event.reminderTime) : null;

const formatTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Date invalide';
    }
    return date.toLocaleDateString();
};

  return (
    <TouchableOpacity style={styles.eventItem} onPress={() => onPress(event)}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{event.name}</Text>
        <Text style={styles.eventNature}>{event.nature}</Text>
      </View>
      <Text style={styles.eventDate}>Date de fin</Text>
      {endDate && (
        <Text style={styles.eventTime}>
           {formatTime(endDate)}
        </Text>
      )}
      {reminderTime && (
        <Text style={styles.eventReminder}>
          Reminder: {formatTime(reminderTime)}
        </Text>
      )}
      {event.description && <Text style={styles.eventNotes}>{event.description}</Text>}
    </TouchableOpacity>
  );
};

export default EventItem;