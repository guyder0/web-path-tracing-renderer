import axios from "axios";

import { useApiStore } from "@/api/store-config";
import { type SceneJSON, type RenderJSON } from "@/store/scene-interface";
import { useSceneStore } from "@/store/scene-store";
import { useGlContext } from "@/store/gl-contex";

export async function ExportScene({objects}: SceneJSON) {
    const backendApiUrl = useApiStore.getState().backendApiUrl
    const takeScreenshot = useGlContext.getState().takeScreenshot
    const screenshotUrl = takeScreenshot!()
    const response = await fetch(screenshotUrl);
    const blob = await response.blob();

    let data = new FormData()
    data.append('scene', JSON.stringify({objects}))
    data.append('image', blob, 'scene.png')

    axios.post(backendApiUrl + "/gallery/save/", data, {
        headers: {
            'x-user-id': '1',
            'x-user-hashed-password': '1',
        }
    })
}

export async function ImportScene(hash: string) {
    const backendApiUrl = useApiStore.getState().backendApiUrl

    try {
        const response = await axios.get(backendApiUrl + "/gallery/load/" + hash + "/")
        const data = response.data

        const store = useSceneStore.getState()
        store.importJSON(data)
    }
    catch {
        return undefined
    }
}

export async function RenderScene(render: RenderJSON) {
    const backendApiUrl = useApiStore.getState().backendApiUrl

    try {
        const response = await axios.post(backendApiUrl + '/render/', render, { timeout: 0, responseType: 'blob' });
        const objectUrl = URL.createObjectURL(response.data);
        return objectUrl;
    } catch (error) {
        console.log(error);
    }
}

export async function GetScenes(page: number) {
    const backendApiUrl = useApiStore.getState().backendApiUrl

    return axios.get(backendApiUrl + `/gallery/list/`,
        {
            params: {
                start: (page-1)*4,
                end: (page-1)*4 + 4,
            }
        }
    )
}