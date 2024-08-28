import React from 'react';
import { Calendar } from 'react-native-calendars';
import styles from '../constants/styles';
import COLORS from '../constants/colors';

const CalendarView = ({ markedDates, onDayPress }) => (
    <Calendar
        current={new Date().toISOString().split('T')[0]}
        minDate={'2020-01-01'}
        maxDate={'2030-12-31'}
        onDayPress={onDayPress}
        monthFormat={'MMMM yyyy'}
        hideArrows={false}
        hideExtraDays={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        enableSwipeMonths={true}
        markedDates={markedDates}
        theme={{
            backgroundColor: COLORS.background,
            calendarBackground: COLORS.cardBackground,
            textSectionTitleColor: COLORS.secondaryText,
            selectedDayBackgroundColor: COLORS.primary,
            selectedDayTextColor: COLORS.cardBackground,
            todayTextColor: COLORS.primary,
            dayTextColor: COLORS.text,
            dotColor: COLORS.primary,
            selectedDotColor: COLORS.cardBackground,
            arrowColor: COLORS.primary,
            monthTextColor: COLORS.primary,
            indicatorColor: COLORS.primary,
            textDayFontFamily: 'poppins',
            textMonthFontFamily: 'poppinsBold',
            textDayHeaderFontFamily: 'poppins',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '400',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
    />
);

export default CalendarView;