import { create } from "zustand"

interface RenderDislayStore {
    isLoading: boolean,
    setIsLoading: (loading: boolean) => void,
    imageUrl: string | undefined,
    setImageUrl: (url: string | undefined) => void,
}

export const useRenderDisplay = create<RenderDislayStore>((set) => ({
    isLoading: false,
    setIsLoading: (loading: boolean) => set({isLoading: loading}),
    imageUrl: undefined,
    setImageUrl: (url: string | undefined) => set({imageUrl: url}),
}))