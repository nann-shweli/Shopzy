
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { colors, spacing } from '../../theme/colors';
import Header from '../../component/home/Header';

const { width } = Dimensions.get('window');

const TREND_STORES = [
    { id: '1', name: 'Balvessa', price: 'S$9.49', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80' },
    { id: '2', name: 'SU ER', price: 'S$6.95', image: 'https://images.unsplash.com/photo-1529139574466-a302d27f819f?auto=format&fit=crop&w=400&q=80' },
    { id: '3', name: 'MAISONFOX', price: 'S$10.65', image: 'https://images.unsplash.com/photo-1507680434567-5739c8a95262?auto=format&fit=crop&w=400&q=80' },
    { id: '4', name: 'Resyla', price: 'S$8.24', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80' },
];

const TREND_ITEMS = [
    {
        id: '1',
        brand: 'Resyla',
        tag: '#Basic',
        images: [
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=400&q=80'
        ],
        prices: ['S$8.24', 'S$8.54', 'S$7.99', 'S$11.45'],
        review: 'j***0: Cute little camisole dress cover up. Will be wearing...'
    },
    {
        id: '2',
        brand: '23WEILIANG',
        tag: 'Sales surge 78%',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1600185365926-3a810c9d7486?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80'
        ],
        prices: ['S$19.51', 'S$17.18', 'S$22.93', 'S$28.79'],
        review: 'a***a: These shoes are really worth buying for. huhuhu so...'
    }
]

const Trends = () => {
    return (
        <View style={styles.container}>
            <Header backgroundColor="black" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Top Banner Area */}
                <View style={styles.topSection}>
                    <Text style={styles.topTitle}>New Trends Store This Month  &gt;</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topScroll}>
                        {TREND_STORES.map((store) => (
                            <View key={store.id} style={styles.storeCard}>
                                <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>
                                <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
                                <Image source={{ uri: store.image }} style={styles.storeImage} />
                                <Text style={styles.storePrice}>{store.price}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Feed */}
                <View style={styles.feed}>
                    {TREND_ITEMS.map((item) => (
                        <View key={item.id} style={styles.feedItem}>
                            <View style={styles.feedHeader}>
                                <View style={styles.brandAvatar}><Text>{item.brand[0]}</Text></View>
                                <View>
                                    <Text style={styles.brandName}>{item.brand}</Text>
                                    <Text style={styles.brandTag}>{item.tag}</Text>
                                </View>
                            </View>

                            <View style={styles.feedImages}>
                                {item.images.map((img, idx) => (
                                    <View key={idx} style={styles.feedImageContainer}>
                                        <Image source={{ uri: img }} style={styles.feedImage} />
                                        <Text style={styles.feedPrice}>{item.prices[idx]}</Text>
                                    </View>
                                ))}
                            </View>

                            <Text style={styles.reviewText}>{item.review}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    topSection: {
        backgroundColor: '#333',
        padding: spacing.m,
    },
    topTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: spacing.m,
        marginLeft: spacing.xs
    },
    topScroll: {
        paddingRight: spacing.m,
    },
    storeCard: {
        width: 100,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 4,
        marginRight: spacing.s,
        alignItems: 'center',
        position: 'relative'
    },
    newBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#7B68EE',
        paddingHorizontal: 4,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 1
    },
    newBadgeText: {
        color: 'white',
        fontSize: 8,
    },
    storeName: {
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 4
    },
    storeImage: {
        width: 80,
        height: 100,
        borderRadius: 4,
        marginBottom: 4
    },
    storePrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black'
    },
    feed: {
        padding: spacing.s
    },
    feedItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: spacing.m,
        marginBottom: spacing.m
    },
    feedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.m,
        gap: spacing.s
    },
    brandAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandName: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    brandTag: {
        fontSize: 10,
        color: '#7B68EE'
    },
    feedImages: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    feedImageContainer: {
        width: '23%',
        alignItems: 'center',
        gap: 4
    },
    feedImage: {
        width: '100%',
        aspectRatio: 0.8,
        borderRadius: 4
    },
    feedPrice: {
        fontSize: 10,
        color: colors.primary,
        fontWeight: 'bold'
    },
    reviewText: {
        marginTop: spacing.s,
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic'
    }
});

export default Trends;
