
import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { CIRCLE_CATEGORIES } from '../../data/mockData';
import { spacing, colors } from '../../theme/colors';

const CircleCategoryList = () => {
    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* 
        We want 2 rows. FlatList with numColumns is great, but scrolling horizontal with 2 rows is tricky.
        The screenshot implies horizontal scrolling with 2 rows.
        A simple way is to map the data in chunks of 2, or just use a flex wrap container if the list is small (10 items).
        Screenshot shows 5 cols visible, 2 rows. 10 items total. It fits in one screen width effectively or is a horiz list.
        Let's assume it's just a flex-wrap container for now as 10 items fit 5x2 easily.
       */}
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
        width: '20%', // 5 items per row
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
