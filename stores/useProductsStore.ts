import { ProductsStore } from '@/types'
import { create } from 'zustand'

export const useProductsStore = create<ProductsStore>((set) => ({
    products: [],
    addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
    removeProduct: (name) =>
        set((state) => ({
            products: state.products.filter((p) => p.name !== name),
        })),
    updateProduct: (name, updates) =>
        set((state) => ({
            products: state.products.map((p) =>
                p.name === name ? { ...p, ...updates } : p,
            ),
        })),
    clearProducts: () => set({ products: [] }),
}))
