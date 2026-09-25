import { create } from 'zustand';

export const useNovaVisitaStore = create((set) => ({
  fiscalizadoresSelecionados: [],
  
  toggleFiscalizador: (id) => set((state) => {
    const existe = state.fiscalizadoresSelecionados.includes(id);
    if (existe) {
      return {
        fiscalizadoresSelecionados: state.fiscalizadoresSelecionados.filter(fId => fId !== id)
      };
    } else {
      return {
        fiscalizadoresSelecionados: [...state.fiscalizadoresSelecionados, id]
      };
    }
  }),

  limparSelecao: () => set({ fiscalizadoresSelecionados: [] }),
}));