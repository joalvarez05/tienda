import { create } from "zustand";

const useProductoStore = create((set) => ({
  productoStore: [],
  setProductoStore: (productos) => set({ productoStore: productos }),
}));

export default useProductoStore;
