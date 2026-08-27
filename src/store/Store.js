import { create } from "zustand";

const useProductStore = create((set) => ({

  products: [],
  product: null,
  loading: false,
  error: null,


  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });

const response = await fetch(
  "https://dummyjson.com/products?limit=0"
);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      set({
        products: data.products,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // Fetch single product
  fetchProductDetails: async (id) => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `https://dummyjson.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();

      set({
        product: data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // Clear selected product
  clearProduct: () => {
    set({
      product: null,
    });
  },
}));

export default useProductStore;