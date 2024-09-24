import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterButtons = ({ filter, setFilter }) => {
  const filters = ['All', 'Event', 'Task', 'Reminder'];

  return (
    <View style={styles.container}>
      {filters.map((f) => (
        <TouchableOpacity
          key={f}
          style={[
            styles.button,
            filter === f.toLowerCase() && styles.activeButton
          ]}
          onPress={() => setFilter(f.toLowerCase())}
        >
          <Text style={[
            styles.buttonText,
            filter === f.toLowerCase() && styles.activeButtonText
          ]}>
            {f}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#333',
    fontWeight: '600',
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default FilterButtons;