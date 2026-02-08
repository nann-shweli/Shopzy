
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PRODUCTS } from '../../data/mockData';
import { spacing, colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - spacing.m * 3) / 2; // 2 columns with spacing

const TABS = ['For You', 'New In', 'Deals', 'Bestsellers'];

const ProductFeed = () => {
    const [activeTab, setActiveTab] = useState('For You');

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {activeTab === tab ? '✨ ' : ''}{/* Add icon placeholder for "New In" etc if needed */}
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Grid */}
            <View style={styles.grid}>
                {PRODUCTS.map((product) => (
                    <View key={product.id} style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: product.image }} style={styles.image} />
                            {/* Brand Tag */}
                            <View style={styles.brandTag}>
                                <Text style={styles.brandText}>{product.brand}</Text>
                            </View>
                            {/* Shopping Bag Icon */}
                            <View style={styles.bagIcon}>
                                <Text>👜</Text>
                            </View>
                        </View>
                        <View style={styles.details}>
                            {product.tag && (
                                <View style={styles.tag}><Text style={styles.tagText}>{product.tag}</Text></View>
                            )}
                            {/* We don't have product name in screenshot cards, mostly images and brand? 
                   Actually screenshot shows iPhone with "Apple" tag and price. 
                   Adidas jacket with "Adidas" tag and price? No visible price in the bottom feed of screenshot, 
                   Wait, screenshot shows "Apple" brand tag top left of image.
                   And a shopping bag icon floating.
                   No price visible?
                   Wait, let me look closely at screenshot.
                   "For You" section.
                   Left card: iPhone pink. Label "Apple" top left. No price visible on simple view? Or maybe cut off.
                   Right card: Green Jacket. Label "Adidas" top left. Floating red shopping bag with heart.
                */}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.m,
        backgroundColor: '#F5F5F5',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: spacing.m,
        paddingHorizontal: spacing.s,
    },
    tab: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.s,
        borderRadius: 4,
    },
    activeTab: {
        backgroundColor: '#333', // Dark background for active tab "For You"
    },
    tabText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.m,
        gap: spacing.m,
    },
    card: {
        width: COLUMN_WIDTH,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: spacing.s,
        aspectRatio: 0.7, // Taller cards
    },
    imageContainer: {
        flex: 1,
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    brandTag: {
        position: 'absolute',
        top: spacing.s,
        left: spacing.s,
        backgroundColor: 'white', // 'Brand' styled tag
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 2
    },
    brandText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333'
    },
    bagIcon: {
        position: 'absolute',
        bottom: spacing.s,
        right: spacing.s,
        backgroundColor: 'rgba(255,255,255,0.8)',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    details: {
        padding: spacing.s
    },
    tag: {
        backgroundColor: '#FFE4E1',
        alignSelf: 'flex-start',
        paddingHorizontal: 4,
        borderRadius: 2,
        marginBottom: 4
    },
    tagText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: 'bold'
    }
});

export default ProductFeed;
