import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Goal = ({ title, time }) => (
    <TouchableOpacity style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{time}</Text>
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