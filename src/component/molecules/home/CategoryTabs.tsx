
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, spacing } from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useCategories } from '../../../hooks/useCategories';

interface CategoryTabsProps {
    backgroundColor?: string;
    onCategoryChange?: (category: string) => void;
    selectedCategory?: string;
}

const CategoryTabs = ({
    backgroundColor = colors.primary,
    onCategoryChange,
    selectedCategory = 'All',
}: CategoryTabsProps) => {
    const navigation = useNavigation<any>();
    const { categories, loading } = useCategories();

    const handlePress = (category: string) => {
        if (onCategoryChange) {
            onCategoryChange(category);
        } else {
            // Navigate to product list if no handler provided
            navigation.navigate('ProductList', { category });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {loading ? (
                    <ActivityIndicator color="white" style={{ marginHorizontal: spacing.m }} />
                ) : (
                    categories.map((category, index) => {
                        const isActive = category === selectedCategory;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.tabItem}
                                onPress={() => handlePress(category)}
                            >
                                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                    {category}
                                </Text>
                                {isActive && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>
            <TouchableOpacity style={[styles.menuButton, { backgroundColor }]}>
                <Text style={{ color: 'white', fontSize: 20 }}>☰</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: spacing.s,
        paddingBottom: spacing.s,
        alignItems: 'center',
    },
    tabItem: {
        marginRight: spacing.l,
        alignItems: 'center',
        position: 'relative',
        height: 30,
    },
    tabText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
        fontWeight: '700',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 2,
        backgroundColor: 'white',
    },
    menuButton: {
        paddingHorizontal: spacing.s,
        paddingBottom: spacing.s,
        backgroundColor: colors.primary,
        justifyContent: 'center',
    },
});

export default CategoryTabs;
