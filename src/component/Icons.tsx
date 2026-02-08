import React from 'react';
import { Text } from 'react-native';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    focused?: boolean;
}

const Icons = ({ name, size = 24, color = '#000', focused }: IconProps) => {
    switch (name) {
        case 'Shop':
            return <Text style={{ fontSize: size, color }}>🛍️</Text>;
        case 'Category':
            return <Text style={{ fontSize: size, color }}>🔎</Text>;
        case 'Trends':
            return <Text style={{ fontSize: size, color }}>⤴</Text>;
        case 'Cart':
            return <Text style={{ fontSize: size, color }}>🛒</Text>;
        case 'Me':
            return <Text style={{ fontSize: size, color }}>👤</Text>;
        default:
            return <Text style={{ fontSize: size, color }}>🏠</Text>;
    }
};


export default Icons;
