// CustomTabBar.jsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { createStyles } from "./FooterStyles"
import { useFonts } from "../hooks/useFonts";

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const springConfig = {
        damping: 15,
        stiffness: 150,
    };
    const [fontsLoaded] = useFonts();
    const styles = createStyles(fontsLoaded);

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home-outline';
                } else if (route.name === 'Profile') {
                    iconName = 'person-outline';
                } else if (route.name === 'Calendar') {
                    iconName = 'calendar-outline';
                } else if (route.name === 'Create') {
                    iconName = 'add-circle-outline';
                }

                const animatedIconStyle = useAnimatedStyle(() => {
                    return {
                        color: withSpring(
                            isFocused ? 'white' : 'gray',
                            springConfig
                        ),
                    };
                });

                const animatedCircleStyle = useAnimatedStyle(() => {
                    return {
                        transform: [
                            { scale: withSpring(isFocused ? 1 : 0, springConfig) },
                            { translateY: withSpring(isFocused ? 0 : 10, springConfig) }
                        ],
                        opacity: withSpring(isFocused ? 1 : 0, springConfig),
                    };
                });

                const animatedLabelStyle = useAnimatedStyle(() => {
                    return {
                        opacity: withSpring(isFocused ? 0 : 1, springConfig),
                        transform: [
                            { translateY: withSpring(isFocused ? 10 : 0, springConfig) }
                        ],
                    };
                });

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.tab}
                    >
                        <View style={styles.iconContainer}>
                            <Animated.View style={[styles.circleBackground, animatedCircleStyle]} />
                            <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
                                <Ionicons name={iconName} color={isFocused ? 'white' : 'gray'} size={24} />
                            </Animated.View>
                        </View>
                        <Animated.Text style={[styles.label, animatedLabelStyle]}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;