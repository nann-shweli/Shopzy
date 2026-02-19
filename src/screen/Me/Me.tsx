
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing } from '../../theme/colors';
import ProductFeed from '../../component/molecules/home/ProductFeed';
import { SafeAreaView } from 'react-native-safe-area-context';

const ORDERS_STATUS = [
    { label: 'Unpaid', icon: '💳' },
    { label: 'Processing', icon: '📦' },
    { label: 'Shipped', icon: '🚚' },
    { label: 'Review', icon: '💬' },
    { label: 'Returns', icon: '↩️' },
];

const SERVICES = [
    { label: 'Customer Service', icon: '🎧' },
    { label: 'Check In', icon: '📅' },
    { label: 'Free Trial Center', icon: '🆓' },
    { label: 'Policy', icon: '📄' },
];

const HEADER_ICONS = [
    { label: 'Vouchers', icon: '🎟️' },
    { label: 'Points', icon: '💰' },
    { label: 'Wallet', icon: '👛' },
    { label: 'Gift Card', icon: '🎁' },
];

const Me = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sign in / Register {'>'}</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity><Text style={styles.actionIcon}>scan</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Text style={styles.actionIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Icons Grid */}
                <View style={styles.headerGrid}>
                    {HEADER_ICONS.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.GridItem}>
                            <Text style={styles.icon}>{item.icon}</Text>
                            <Text style={styles.label}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* My Orders */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My Orders</Text>
                        <Text style={styles.viewAll}>View all {'>'}</Text>
                    </View>
                    <View style={styles.GridRow}>
                        {ORDERS_STATUS.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.GridItem}>
                                <Text style={styles.iconLarge}>{item.icon}</Text>
                                <Text style={styles.label}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Services */}
                <View style={styles.section}>
                    <View style={styles.GridRow}>
                        {SERVICES.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.GridItem}>
                                <Text style={styles.iconLarge}>{item.icon}</Text>
                                <Text style={styles.labelCenter}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* History/Wishlist Tabs */}
                <View style={styles.tabsRow}>
                    <View style={styles.tabItem}>
                        <Text style={styles.tabTitle}>👣 History</Text>
                        <Text style={styles.tabSubtitle}>66 item</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.tabItem}>
                        <Text style={styles.tabTitle}>❤️ Wishlist</Text>
                        <Text style={styles.tabSubtitle}>0 item</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.tabItem}>
                        <Text style={styles.tabTitle}>🏪 Following</Text>
                        <Text style={styles.tabSubtitle}>0 following</Text>
                    </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.m,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerActions: {
        flexDirection: 'row',
        gap: spacing.m
    },
    actionIcon: {
        fontSize: 20
    },
    headerGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: spacing.m,
        backgroundColor: 'white',
        marginBottom: spacing.s
    },
    GridItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    GridRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        fontSize: 24,
        marginBottom: 4
    },
    iconLarge: {
        fontSize: 28,
        marginBottom: 8
    },
    label: {
        fontSize: 12,
        color: '#333'
    },
    labelCenter: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center'
    },
    section: {
        backgroundColor: 'white',
        padding: spacing.m,
        marginBottom: spacing.s
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.l
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    viewAll: {
        color: '#999',
        fontSize: 12
    },
    tabsRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: spacing.m,
        marginBottom: spacing.s
    },
    tabItem: {
        flex: 1,
        alignItems: 'center'
    },
    separator: {
        width: 1,
        height: '80%',
        backgroundColor: '#eee'
    },
    tabTitle: {
        fontWeight: 'bold',
        marginBottom: 2
    },
    tabSubtitle: {
        color: '#999',
        fontSize: 10
    }
});

export default Me;
