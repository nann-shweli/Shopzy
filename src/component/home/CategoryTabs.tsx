
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../theme/colors';
import { CATEGORIES } from '../../data/mockData';

interface CategoryTabsProps {
    backgroundColor?: string;
}

const CategoryTabs = ({ backgroundColor = colors.primary }: CategoryTabsProps) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {CATEGORIES.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.tabItem}>
                        <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>
                            {category}
                        </Text>
                        {index === 0 && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                ))}
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
        height: 30, // Fixed height to manage alignment
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
        justifyContent: 'center'
    }
});

export default CategoryTabs;
