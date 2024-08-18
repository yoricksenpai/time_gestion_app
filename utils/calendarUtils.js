// useCalendarDates.js
import { useState, useCallback } from 'react';

const useCalendarDates = () => {
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    const markEventDates = useCallback((events) => {
        let marked = {};
        events.forEach((event) => {
            const date = event.startDate.split('T')[0];
            marked[date] = {
                marked: true,
                dotColor: 'skyblue',
                activeOpacity: 0,
            };
        });
        setMarkedDates(marked);
    }, []);

    const onDayPress = useCallback((day) => {
        if (selectedDate === day.dateString) {
            setSelectedDate(null);
            setMarkedDates(prev => ({
                ...prev,
                [day.dateString]: {
                    ...prev[day.dateString],
                    selected: false,
                    selectedDayBackgroundColor: 'transparent',
                },
            }));
        } else {
            if (selectedDate) {
                setMarkedDates(prev => ({
                    ...prev,
                    [selectedDate]: {
                        ...prev[selectedDate],
                        selected: false,
                        selectedDayBackgroundColor: 'transparent',
                    },
                }));
            }
            setSelectedDate(day.dateString);
            setMarkedDates(prev => ({
                ...prev,
                [day.dateString]: {
                    ...prev[day.dateString],
                    selected: true,
                    selectedDayBackgroundColor: 'blue',
                },
            }));
        }
    }, [selectedDate]);

    return { markedDates, selectedDate, markEventDates, onDayPress };
};

export default useCalendarDates;