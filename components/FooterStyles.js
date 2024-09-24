// FooterStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width * 0.7; // 70% de la largeur de l'écran
const TAB_BAR_HEIGHT = 60;

export const createStyles = (fontsLoaded) => StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        height: 60,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeIndicator: {
        width: 40,
        height: 5,
        backgroundColor: 'gray',
        borderRadius: 2.5,
        marginTop: 5,
        marginBottom: 10,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50, // Match the height and width to maintain consistency
        justifyContent: 'center', // Ensure centering
        alignItems: 'center', // Ensure centering
    },
    iconWrapper: {
        zIndex: 1,
        justifyContent: 'center', // Make sure icon is centered
        alignItems: 'center', // Make sure icon is centered
    },
    label: {
        fontSize: 12,
        color: 'gray',
        marginTop: -15, // Reduce this to avoid too much negative margin
        fontFamily: fontsLoaded ? 'poppins' : 'System',
    },
    circleBackground: {
        position: 'absolute',
        bottom: 0,
        width: 50, // Match width to iconContainer to avoid shifting
        height: 50, // Match height to iconContainer to avoid shifting
        borderRadius: 25,
        backgroundColor: '#3498db',
    },
    activeTab: {
        backgroundColor: '#e6f3ff',
        borderRadius: 20,
    },
});
