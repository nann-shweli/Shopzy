
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

import { colors, spacing } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductFeed from '../../component/home/ProductFeed';

const { width } = Dimensions.get('window');

const Cart = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cart</Text>
                <Text style={styles.location}>📍 Ship to Malaysia &gt;</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Empty State */}
                <View style={styles.emptyState}>
                    {/* Cart Icon */}
                    <View style={styles.cartIconContainer}>
                        <Text style={{ fontSize: 50 }}>🛒</Text>
                    </View>
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>Log in to see shopping cart</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.whiteButton}>
                            <Text style={styles.whiteButtonText}>Shop by Category</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.darkButton}>
                            <Text style={styles.darkButtonText}>Sign in / Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recommendations */}
                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>You Might Like to Fill it With</Text>
                    <View style={styles.line} />
                </View>
                <ProductFeed />
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'baseline',
        padding: spacing.m,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: spacing.s
    },
    location: {
        fontSize: 12,
        color: '#666'
    },
    emptyState: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: spacing.xl,
        marginBottom: spacing.m
    },
    cartIconContainer: {
        marginBottom: spacing.m
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: spacing.s
    },
    emptySubtitle: {
        color: '#999',
        marginBottom: spacing.l
    },
    buttonRow: {
        flexDirection: 'row',
        gap: spacing.m
    },
    whiteButton: {
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.l,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 4
    },
    whiteButtonText: {
        fontWeight: 'bold'
    },
    darkButton: {
        backgroundColor: '#222',
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.l,
        borderRadius: 4
    },
    darkButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.m,
        paddingHorizontal: spacing.xl
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd'
    },
    dividerText: {
        marginHorizontal: spacing.s,
        fontWeight: 'bold',
        color: '#333'
    }
});

export default Cart;
