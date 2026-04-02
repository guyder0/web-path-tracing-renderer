import { create } from "zustand"

interface RenderDislayStore {
    imageUrl: string | undefined,
    setImageUrl: (url: string | undefined) => void,
}

export const useRenderDisplay = create<RenderDislayStore>((set, get) => ({
    imageUrl: undefined,
    setImageUrl: (url: string | undefined) => set({imageUrl: url}),
}))