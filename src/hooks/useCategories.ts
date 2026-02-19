import { useState, useEffect } from 'react';
import { fetchCategories, Category } from '../services/api';

interface UseCategoriesResult {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

export const useCategories = (): UseCategoriesResult => {
    const [categories, setCategories] = useState<Category[]>(['All']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchCategories();
                if (!cancelled) {
                    // Capitalise each category label
                    const formatted = data.map(
                        c => c.charAt(0).toUpperCase() + c.slice(1),
                    );
                    setCategories(['All', ...formatted]);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load categories');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        load();
        return () => { cancelled = true; };
    }, []);

    return { categories, loading, error };
};
