import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchProduct, Product } from '../../services/api';
import { colors, spacing } from '../../theme/colors';

const { width } = Dimensions.get('window');

const StarRow = ({ rate, count }: { rate: number; count: number }) => (
    <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map(i => (
            <Text key={i} style={styles.star}>
                {i <= Math.round(rate) ? '★' : '☆'}
            </Text>
        ))}
        <Text style={styles.ratingText}> {rate} ({count} reviews)</Text>
    </View>
);

const ProductDetail = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { productId } = route.params ?? {};

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!productId) {
            setError('No product ID provided');
            setLoading(false);
            return;
        }
        fetchProduct(productId)
            .then(data => setProduct(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [productId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading product...</Text>
            </SafeAreaView>
        );
    }

    if (error || !product) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.errorText}>⚠️ {error ?? 'Product not found'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{product.category}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Title & Price */}
                    <Text style={styles.title}>{product.title}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        {product.rating.count > 300 && (
                            <View style={styles.hotBadge}>
                                <Text style={styles.hotBadgeText}>🔥 Popular</Text>
                            </View>
                        )}
                    </View>

                    {/* Rating */}
                    <StarRow rate={product.rating.rate} count={product.rating.count} />

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Description */}
                    <Text style={styles.sectionLabel}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Shipping Info */}
                    <View style={styles.shipInfo}>
                        <Text style={styles.shipIcon}>🚚</Text>
                        <View>
                            <Text style={styles.shipTitle}>Free Shipping</Text>
                            <Text style={styles.shipSubtitle}>Estimated delivery: 3–7 business days</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.wishlistBtn}>
                    <Text style={styles.wishlistText}>♡  Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.addToCartBtn, added && styles.addedBtn]}
                    onPress={() => setAdded(true)}
                >
                    <Text style={styles.addToCartText}>
                        {added ? '✓ Added to Cart' : '🛍️  Add to Cart'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
    loadingText: { marginTop: spacing.s, color: colors.textLight },
    errorText: { color: colors.error, marginBottom: spacing.m },
    backBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.l, paddingVertical: spacing.s, borderRadius: 6 },
    backBtnText: { color: 'white', fontWeight: 'bold' },
    imageContainer: {
        width,
        height: width * 0.85,
        backgroundColor: '#f8f8f8',
        position: 'relative',
    },
    image: { width: '100%', height: '100%' },
    categoryBadge: {
        position: 'absolute',
        top: spacing.m,
        left: spacing.m,
        backgroundColor: 'rgba(0,0,0,0.08)',
        paddingHorizontal: spacing.s,
        paddingVertical: 3,
        borderRadius: 4,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#444',
        textTransform: 'capitalize',
    },
    content: { padding: spacing.m },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        lineHeight: 26,
        marginBottom: spacing.s,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.s,
        gap: spacing.s,
    },
    price: { fontSize: 24, fontWeight: 'bold', color: colors.price },
    hotBadge: { backgroundColor: '#FFE4E1', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
    hotBadgeText: { color: colors.primary, fontSize: 12, fontWeight: '600' },
    starRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.m },
    star: { fontSize: 16, color: '#FFB800' },
    ratingText: { fontSize: 13, color: '#666', marginLeft: 4 },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: spacing.m },
    sectionLabel: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.s },
    description: { fontSize: 14, color: '#555', lineHeight: 22 },
    shipInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.m,
        marginTop: spacing.l,
        backgroundColor: '#f5f5f5',
        padding: spacing.m,
        borderRadius: 8,
    },
    shipIcon: { fontSize: 24 },
    shipTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
    shipSubtitle: { fontSize: 12, color: colors.textLight, marginTop: 2 },
    footer: {
        flexDirection: 'row',
        padding: spacing.m,
        gap: spacing.m,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: 'white',
    },
    wishlistBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: spacing.m,
        alignItems: 'center',
    },
    wishlistText: { fontWeight: '600', color: '#333', fontSize: 14 },
    addToCartBtn: {
        flex: 2,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: spacing.m,
        alignItems: 'center',
    },
    addedBtn: { backgroundColor: colors.success },
    addToCartText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
});

export default ProductDetail;
