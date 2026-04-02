import axios from 'axios'

import { useApiStore } from "@/api/store-config";

export async function CheckRenderer(
    handler: (is_alive: boolean) => void,
    timeout: number | undefined = undefined
) {
    const backendApiUrl = useApiStore.getState().backendApiUrl
    try {
        await axios.get(backendApiUrl + "/health", {timeout: 5000})
        handler(true);
    }
    catch {
        handler(false);
    }
    finally {
        timeout && setTimeout(() => CheckRenderer(handler), timeout)
    }
}

export async function CheckRepository(
    handler: (is_alive: boolean) => void,
    timeout: number | undefined = undefined
) {
    const githubApiUrl = useApiStore.getState().githubApiUrl
    try {
        await axios.get(githubApiUrl, {timeout: 5000})
        handler(true);
    }
    catch {
        handler(false);
    }
    finally {
        timeout && setTimeout(() => CheckRepository(handler), 5000)
    }
}