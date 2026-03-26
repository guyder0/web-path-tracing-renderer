import axios from 'axios'

import { BACKEND_API_URL, GITHUB_API_URL } from "@/api/config";

export async function CheckRenderer(
    handler: (is_alive: boolean) => void,
    timeout: number | undefined = undefined
) {
    try {
        await axios.get(BACKEND_API_URL + "/health", {timeout: 5000})
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
    try {
        await axios.get(GITHUB_API_URL, {timeout: 5000})
        handler(true);
    }
    catch {
        handler(false);
    }
    finally {
        timeout && setTimeout(() => CheckRepository(handler), 5000)
    }
}