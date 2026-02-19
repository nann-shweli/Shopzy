import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, Product } from '../services/api';

interface UseProductsOptions {
    category?: string;
    limit?: number;
}

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsResult => {
    const { category, limit } = options;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProducts({ category, limit });
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load products');
        } finally {
            setLoading(false);
        }
    }, [category, limit]);

    useEffect(() => {
        load();
    }, [load]);

    return { products, loading, error, refetch: load };
};
