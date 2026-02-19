const BASE_URL = 'https://fakestoreapi.com';

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export type Category = string;

async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) {
        throw new Error(`FakeStore API error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
}

export const fetchProducts = (options?: {
    limit?: number;
    category?: string;
}): Promise<Product[]> => {
    const { limit, category } = options ?? {};
    if (category && category !== 'All') {
        const encoded = encodeURIComponent(category);
        const query = limit ? `?limit=${limit}` : '';
        return request<Product[]>(`/products/category/${encoded}${query}`);
    }
    const query = limit ? `?limit=${limit}` : '';
    return request<Product[]>(`/products${query}`);
};

export const fetchProduct = (id: number): Promise<Product> =>
    request<Product>(`/products/${id}`);

export const fetchCategories = (): Promise<Category[]> =>
    request<Category[]>('/products/categories');
