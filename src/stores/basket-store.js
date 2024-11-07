import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBasketStore = create(
    persist(
        (set, get) => ({
            items: [],
            setItems: (items) => set({ items: items }),
        }),
        {
            name: 'basket-storage'
        },
    ),
)