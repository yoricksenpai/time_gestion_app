import { StyleSheet } from 'react-native';
import COLORS from './colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        fontFamily: 'poppinsBold',
        marginBottom: 16,
    },
    calendar: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        padding: 10,
    },
    eventsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    eventsHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        fontFamily: 'poppinsBold',
    },
    viewModeText: {
        color: COLORS.primary,
        fontFamily: 'poppins',
    },
    eventsList: {
        paddingBottom: 20,
    },
    eventItem: {
        backgroundColor: COLORS.cardBackground,
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        fontFamily: 'poppins',
    },
    eventTime: {
        color: COLORS.secondaryText,
        fontFamily: 'poppins',
    },
    eventItem: {
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: 'poppins',
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
    color: COLORS.secondaryText,
    fontFamily: 'poppins',
  },
  eventTime: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: 'poppins',
    marginBottom: 8,
  },
  eventNotes: {
    fontSize: 14,
    color: COLORS.secondaryText,
    fontFamily: 'poppins',
    fontStyle: 'italic',
  },
});