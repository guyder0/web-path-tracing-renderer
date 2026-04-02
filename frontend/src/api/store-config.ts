import { create } from "zustand"

interface ApiStore {
    backendApiUrl: string,
    githubApiUrl: string,
    setBackendApiUrl: (url: string) => void,
}

export const useApiStore = create<ApiStore>((set) => ({
    backendApiUrl: "http://localhost:8000",
    githubApiUrl: "https://api.github.com/repos/guyder0/web-path-tracing-renderer",
    setBackendApiUrl: (url: string) => set({backendApiUrl: url}),
}))