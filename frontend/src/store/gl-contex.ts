import { create } from 'zustand'

interface Store {
    takeScreenshot: null | (() => string),
    setTakeScreenshot: (func: () => string) => void,
}

export const useGlContext = create<Store>((set) => ({
  takeScreenshot: null,
  setTakeScreenshot: (func: () => string) => set({takeScreenshot: func}),
}))