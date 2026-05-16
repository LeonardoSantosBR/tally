import { Products } from "./products"

export type ProductsStore = {
    products: Products[]
    addProduct: (product: Products) => void
    removeProduct: (name: string) => void
    updateProduct: (name: string, updates: Partial<Products>) => void
    clearProducts: () => void
}