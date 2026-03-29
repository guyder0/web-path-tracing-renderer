import axios from "axios";

import { BACKEND_API_URL } from "@/api/config";
import { type SceneJSON, type RenderJSON } from "@/store/scene-store-interface";
import { useSceneStore } from "@/store/scene-store";

export async function ExportScene(scene: SceneJSON) {
    const canvas = document.getElementById('scene-canvas')?.querySelector('canvas')
    const blob = await new Promise<Blob>((resolve) => {
        canvas!.toBlob((blob) => resolve(blob!), 'image/png')
    })

    let data = new FormData()
    data.append('scene', JSON.stringify(scene))
    data.append('image', blob, 'scene.png')

    axios.post(BACKEND_API_URL + "/gallery/save", data, {
        headers: {
            'x-user-id': '1',
            'x-user-hashed-password': '1',
        }
    })
}

export async function ImportScene(hash: string) {
    try {
        const response = await axios.get(BACKEND_API_URL + "/gallery/load/" + hash + "/")
        const data = response.data

        const store = useSceneStore.getState()
        store.importJSON(data)
    }
    catch {
        return undefined
    }
}

export async function RenderScene(render: RenderJSON) {
    axios.post(BACKEND_API_URL + "/render", render)
}

export async function GetScenes(page: number) {
    return axios.get(BACKEND_API_URL + `/gallery/list`,
        {
            params: {
                start: (page-1)*4,
                end: (page-1)*4 + 3,
            }
        }
    )
}