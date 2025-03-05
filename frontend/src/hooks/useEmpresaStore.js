 import { create } from "zustand";

const useEmpresaStore = create((set) => ({
  empresaActual: null,
  setEmpresaActual: (empresa) => set({ empresaActual: empresa }),
}));

export default useEmpresaStore;
