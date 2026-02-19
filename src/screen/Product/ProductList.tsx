import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../services/api';
import { colors, spacing } from '../../theme/colors';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - spacing.m * 3) / 2;

const ProductCard = ({
    product,
    onPress,
}: {
    product: Product;
    onPress: () => void;
}) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <View style={styles.imageBox}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>{product.title}</Text>
            <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingBadgeText}>★ {product.rating.rate}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const ProductList = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const category: string | undefined = route.params?.category;

    const [search, setSearch] = useState('');
    const { products, loading, error, refetch } = useProducts({ category: category === 'All' ? undefined : category?.toLowerCase() });

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()),
    );

    const renderItem = ({ item }: { item: Product }) => (
        <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        />
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            {/* Search Bar */}
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={`Search ${category ?? 'products'}...`}
                        placeholderTextColor="#aaa"
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Text style={styles.clearIcon}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Category Badge */}
            {category && (
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryLabel}>📂 {category}</Text>
                    <Text style={styles.countText}>
                        {loading ? '...' : `${filtered.length} products`}
                    </Text>
                </View>
            )}

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading products...</Text>
                </View>
            ) : error ? (
                <View style={styles.centered}>
                    <Text style={styles.errorText}>⚠️ {error}</Text>
                    <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.centered}>
                            <Text style={styles.emptyText}>No products found 😕</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    searchRow: {
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: spacing.s,
        height: 38,
    },
    searchIcon: { fontSize: 14, marginRight: 6 },
    searchInput: { flex: 1, fontSize: 14, color: colors.text },
    clearIcon: { fontSize: 14, color: '#999', padding: 4 },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        backgroundColor: 'white',
        marginBottom: spacing.s,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    categoryLabel: { fontWeight: '700', color: colors.text, textTransform: 'capitalize' },
    countText: { color: colors.textLight, fontSize: 13 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
    loadingText: { marginTop: spacing.s, color: colors.textLight },
    errorText: { color: colors.error, textAlign: 'center', marginBottom: spacing.m },
    retryBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.l, paddingVertical: spacing.s, borderRadius: 6 },
    retryText: { color: 'white', fontWeight: 'bold' },
    emptyText: { color: colors.textLight, fontSize: 16 },
    list: { padding: spacing.m },
    row: { justifyContent: 'space-between', marginBottom: spacing.m },
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
    imageBox: {
        height: COLUMN_WIDTH * 1.0,
        backgroundColor: '#fafafa',
    },
    image: { width: '100%', height: '100%' },
    cardContent: { padding: spacing.s },
    cardTitle: { fontSize: 12, fontWeight: '600', color: '#222', lineHeight: 16, marginBottom: 4 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardPrice: { fontSize: 14, fontWeight: 'bold', color: colors.price },
    ratingBadge: { backgroundColor: '#FFF9E6', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3 },
    ratingBadgeText: { color: '#E6A817', fontSize: 10, fontWeight: 'bold' },
});

export default ProductList;
