import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Goal = ({ title, time }) => (
    <TouchableOpacity style={styles.container}>
        <View className="bg-amber-400 rounded-md shadow-md mb-3 p-4"  style={styles.content}>
            <Text className="text-lg font-semibold font-poppins text-white" style={styles.title}>{title}</Text>
            <Text className="text-white font-poppins" style={styles.time}>{time}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    content: {
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins', // Assurez-vous que cette police est bien chargée
    },
    time: {
        fontFamily: 'Poppins', // Assurez-vous que cette police est bien chargée
    },
});

export default Goal;