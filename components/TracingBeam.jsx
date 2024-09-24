// TracingBeam.jsx
import React, { useEffect, useRef, useState } from "react";
import { View, Animated } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { cn } from "../utils/cn"; // Assurez-vous que le chemin est correct

export const TracingBeam = ({ children, className }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(1000); // Valeur par défaut

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.measure((x, y, width, height) => {
        setSvgHeight(height);
      });
    }
  }, []);

  const y1 = scrollY.interpolate({
    inputRange: [0, svgHeight * 0.8],
    outputRange: [50, svgHeight],
    extrapolate: 'clamp',
  });

  const y2 = scrollY.interpolate({
    inputRange: [0, svgHeight],
    outputRange: [50, svgHeight - 200],
    extrapolate: 'clamp',
  });

  return (
    <View className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
      <View className="absolute -left-4 md:-left-20 top-3">
        <Animated.View
          style={{
            marginLeft: 27,
            height: 16,
            width: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e5e5e5',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.24,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Animated.View
            style={{
              height: 8,
              width: 8,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#d4d4d4',
              backgroundColor: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgb(16, 185, 129)', 'white'],
              }),
            }}
          />
        </Animated.View>
        <Svg
          width="20"
          height={svgHeight}
          viewBox={`0 0 20 ${svgHeight}`}
          style={{ marginLeft: 16 }}
        >
          <Path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
          />
          <Path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
          />
          <Defs>
            <LinearGradient id="gradient" x1="0" y1={y1} x2="0" y2={y2}>
              <Stop offset="0" stopColor="#18CCFC" stopOpacity="0" />
              <Stop offset="0.325" stopColor="#6344F5" />
              <Stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </LinearGradient>
          </Defs>
        </Svg>
      </View>
      <View ref={contentRef}>{children}</View>
    </View>
  );
};
