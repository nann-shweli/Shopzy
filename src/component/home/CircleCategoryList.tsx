
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CIRCLE_CATEGORIES } from '../../data/mockData';
import { spacing, colors } from '../../theme/colors';

const CircleCategoryList = () => {
    const navigation = useNavigation<any>();

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductList')} style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {CIRCLE_CATEGORIES.map((item) => (
                    <View key={item.id} style={styles.itemWrapper}>
                        {renderItem({ item })}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.m,
        backgroundColor: 'white',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.s
    },
    itemWrapper: {
        width: '20%',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    itemContainer: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 10,
        color: colors.text,
        textAlign: 'center',
    },
});

export default CircleCategoryList;
