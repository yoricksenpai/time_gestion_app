    // components/CustomButton.jsx

import { TouchableOpacity, Text } from "react-native";
import React, {useCallback} from "react";
import { styled } from "nativewind";
    import {useFonts} from "../hooks/useFonts";
    import * as SplashScreen from "expo-splash-screen"; // Ensure nativewind is imported

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}) => {

    const [fontsLoaded] = useFonts();

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
  return (
    <StyledTouchableOpacity
      style={{
        borderWidth: 10,
        borderBlockColor: "#0a0a0a",
        borderStartColor: "#0a0a0a",
        borderEndColor: "#0a0a0a",
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
      }}
      className={`bg-sky-500 border-2 border-black rounded-r-2xl min-h-[59px] w-full justify-center items-center 
      ${containerStyle}  ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <StyledText className={`text-black text-base font-poppinsBold `}>
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default CustomButton;
