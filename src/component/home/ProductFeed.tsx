
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../../hooks/useProducts';
import { spacing, colors } from '../../theme/colors';
import { Product } from '../../services/api';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - spacing.m * 3) / 2;

const TABS = ['For You', 'New In', 'Deals', 'Bestsellers'];

// Map our tabs to API categories
const TAB_CATEGORY_MAP: Record<string, string | undefined> = {
    'For You': undefined,
    'New In': "women's clothing",
    'Deals': 'electronics',
    'Bestsellers': "men's clothing",
};

interface ProductFeedProps {
    filterCategory?: string;
}

const StarRating = ({ rate }: { rate: number }) => {
    const full = Math.floor(rate);
    const half = rate - full >= 0.5;
    return (
        <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map(i => (
                <Text key={i} style={styles.star}>
                    {i <= full ? '★' : i === full + 1 && half ? '½' : '☆'}
                </Text>
            ))}
            <Text style={styles.ratingCount}>({rate})</Text>
        </View>
    );
};

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.brandTag}>
                <Text style={styles.brandText}>{product.category}</Text>
            </View>
            <View style={styles.bagIcon}>
                <Text>🛍️</Text>
            </View>
        </View>
        <View style={styles.details}>
            <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
            <StarRating rate={product.rating.rate} />
            <View style={styles.priceRow}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                {product.rating.count > 300 && (
                    <View style={styles.hotTag}><Text style={styles.hotTagText}>🔥 Hot</Text></View>
                )}
            </View>
        </View>
    </TouchableOpacity>
);

const ProductFeed = ({ filterCategory }: ProductFeedProps) => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState('For You');

    const resolvedCategory = filterCategory ?? TAB_CATEGORY_MAP[activeTab];
    const { products, loading, error } = useProducts({ category: resolvedCategory });

    const renderProduct = ({ item }: { item: Product }) => (
        <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        />
    );

    return (
        <View style={styles.container}>
            {/* Tabs — only show when no external filter */}
            {!filterCategory && (
                <View style={styles.tabContainer}>
                    {TABS.map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {activeTab === tab ? '✨ ' : ''}{tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading products...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>⚠️ {error}</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.grid}
                />
            )}
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
        backgroundColor: '#333',
    },
    tabText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        marginTop: spacing.s,
        color: colors.textLight,
        fontSize: 14,
    },
    errorContainer: {
        padding: spacing.m,
        alignItems: 'center',
    },
    errorText: {
        color: colors.error,
        fontSize: 14,
    },
    grid: {
        paddingHorizontal: spacing.m,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: spacing.m,
    },
    card: {
        width: COLUMN_WIDTH,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    imageContainer: {
        height: COLUMN_WIDTH * 1.1,
        position: 'relative',
        backgroundColor: '#fafafa',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    brandTag: {
        position: 'absolute',
        top: spacing.s,
        left: spacing.s,
        backgroundColor: 'rgba(255,255,255,0.92)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
    },
    brandText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'capitalize',
    },
    bagIcon: {
        position: 'absolute',
        bottom: spacing.s,
        right: spacing.s,
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        padding: spacing.s,
    },
    productTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#222',
        lineHeight: 16,
        marginBottom: 4,
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    star: {
        fontSize: 10,
        color: '#FFB800',
    },
    ratingCount: {
        fontSize: 9,
        color: '#999',
        marginLeft: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.price,
    },
    hotTag: {
        backgroundColor: '#FFE4E1',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 3,
    },
    hotTagText: {
        fontSize: 9,
        color: colors.primary,
        fontWeight: 'bold',
    },
});

export default ProductFeed;
