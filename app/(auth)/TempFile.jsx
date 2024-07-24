import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const PasswordStrengthIndicator = ({ strength }) => {
    const getColor = () => {
        switch (strength) {
            case 'faible':
                return 'bg-red-500';
            case 'medium':
                return 'bg-yellow-500';
            case 'fort':
                return 'bg-green-500';
            default:
                return 'bg-gray-300';
        }
    };

    const getFilledBars = () => {
        switch (strength) {
            case 'faible':
                return 1;
            case 'medium':
                return 2;
            case 'fort':
                return 3;
            default:
                return 0;
        }
    };

    const filledBars = getFilledBars();
    const color = getColor();

    return (
        <StyledView className="flex-row space-x-1 mt-2">
            {[1, 2, 3].map((bar) => (
                <StyledView
                    key={bar}
                    className={`h-1 flex-1 rounded-full ${
                        bar <= filledBars ? color : 'bg-gray-300'
                    }`}
                />
            ))}
        </StyledView>
    );
};

export default PasswordStrengthIndicator;