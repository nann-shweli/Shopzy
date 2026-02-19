
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing } from '../../theme/colors';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = "45%";

const CATEGORIES_SIDEBAR = [
    'Just for You', 'New In', 'Sale', 'Women Clothing', 'Beachwear', 'Home & Living', 'Curve', 'Men Clothing', 'Shoes', 'Cell Phones & Accessories', 'Underwear & Sleepwear'
];

const SUB_CATEGORIES_DATA: Record<string, { name: string, image: string }[]> = {
    'Women Clothing': [
        { name: 'View All', image: 'https://images.unsplash.com/photo-1551488852-d81a4d53e253?auto=format&fit=crop&w=200&q=80' },
        { name: 'New In', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=200&q=80' },
        { name: 'Top Rated', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=200&q=80' },
        { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80' }, // Red dress
        { name: 'Mini Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=200&q=80' },
        { name: 'Tops', image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=200&q=80' },
        { name: 'T-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80' },
        { name: 'Blouses', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d9c2?auto=format&fit=crop&w=200&q=80' },
        { name: 'Tank Tops & Camis', image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=200&q=80' }, // Tank top
        { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=200&q=80' },
        { name: 'Co-ords', image: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=200&q=80' },
        { name: 'Denim', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=200&q=80' },
    ],
    // Fallback for others
    'default': [
        { name: 'Item 1', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80' },
        { name: 'Item 2', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=200&q=80' },
        { name: 'Item 3', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=200&q=80' },
    ]
};

const CATEGORY_TITLES: Record<string, string> = {
    'Women Clothing': 'Shop by Category',
    'default': 'Picks for You'
};

import Header from '../../component/molecules/home/Header';

const Category = () => {
    const navigation = useNavigation<any>();
    const [activeCategory, setActiveCategory] = useState(CATEGORIES_SIDEBAR[3]);
    const subCategories = SUB_CATEGORIES_DATA[activeCategory] || SUB_CATEGORIES_DATA['default'];
    const sectionTitle = CATEGORY_TITLES[activeCategory] || CATEGORY_TITLES['default'];

    const handleItemPress = () => {
        navigation.navigate("ProductList", { category: activeCategory })
    }

    return (
        <View style={styles.container}>
            <Header backgroundColor="white" />
            <View style={styles.content}>
                {/* Sidebar */}
                <ScrollView style={styles.sidebar} showsVerticalScrollIndicator={false}>
                    {CATEGORIES_SIDEBAR.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.sidebarItem, activeCategory === cat && styles.sidebarItemActive]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <View style={[styles.activeIndicator, activeCategory === cat && { backgroundColor: 'black' }]} />
                            <Text style={[styles.sidebarText, activeCategory === cat && styles.sidebarTextActive]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <View style={{ height: 100 }} />
                </ScrollView>

                {/* Main Content */}
                <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                    <View style={styles.grid}>
                        {subCategories.map((item, index) => (
                            <TouchableOpacity onPress={handleItemPress} key={index} style={styles.gridItem}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </View>
                                <Text style={styles.itemText} numberOfLines={2}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: '#F5F5F5',
    },
    sidebarItem: {
        paddingVertical: spacing.m,
        paddingHorizontal: spacing.s,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sidebarItemActive: {
        backgroundColor: 'white',
    },
    activeIndicator: {
        width: 4,
        height: '100%',
        position: 'absolute',
        left: 0,
    },
    sidebarText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4
    },
    sidebarTextActive: {
        fontWeight: 'bold',
        color: 'black',
    },
    mainContent: {
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.m
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: spacing.m,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.m,
    },
    gridItem: {
        width: '28%',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: spacing.xs,
        backgroundColor: '#f0f0f0'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    itemText: {
        fontSize: 10,
        textAlign: 'center',
        color: '#333'
    }
});

export default Category;
