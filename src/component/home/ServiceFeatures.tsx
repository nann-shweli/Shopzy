
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme/colors';

const ServiceFeatures = () => {
    return (
        <View style={styles.container}>
            <View style={styles.featureItem}>
                {/* Truck Icon Placeholder */}
                <Text style={styles.icon}>🚚</Text>
                <View>
                    <Text style={styles.title}>Free Shipping</Text>
                    <Text style={styles.subtitle}>Buy S$20.93 more to get</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.featureItem}>
                {/* Box Icon Placeholder */}
                <Text style={styles.icon}>📦</Text>
                <View>
                    <Text style={styles.title}>Free Return</Text>
                    <Text style={styles.subtitle}>For change of minds</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF5F0', // Light beige/pinkish background from screenshot
        paddingVertical: spacing.m,
        paddingHorizontal: spacing.s,
        alignItems: 'center',
    },
    featureItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    icon: {
        fontSize: 18,
        marginRight: 4
    },
    title: {
        fontWeight: 'bold',
        color: '#5C3317', // Dark brown text
        fontSize: 12,
    },
    subtitle: {
        color: '#8B5A2B', // Lighter brown
        fontSize: 10,
        marginTop: 2,
    },
    separator: {
        width: 1,
        height: '80%',
        backgroundColor: '#E6D3C8',
        marginHorizontal: spacing.s,
    }
});

export default ServiceFeatures;
