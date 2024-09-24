import React from 'react';
import { View, Animated, Easing } from 'react-native';

const LoadingBentoGrid = () => {
  const animatedValues = React.useMemo(() => 
    Array(6).fill(0).map(() => new Animated.Value(0)), 
  []);

  React.useEffect(() => {
    const animations = animatedValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            delay: index * 150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          })
        ])
      )
    );

    Animated.parallel(animations).start();

    return () => animations.forEach(anim => anim.stop());
  }, [animatedValues]);

  const renderLoadingItem = (index) => {
    const opacity = animatedValues[index];
    const translateY = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    });

    return (
      <Animated.View
        key={index}
        style={{
          opacity,
          transform: [{ translateY }],
        }}
        className="w-[48%] aspect-square mb-4 rounded-xl bg-gray-200"
      />
    );
  };

  return (
    <View className="flex-1 flex-row flex-wrap justify-between p-4">
      {Array(6).fill(0).map((_, index) => renderLoadingItem(index))}
    </View>
  );
};

export default LoadingBentoGrid;