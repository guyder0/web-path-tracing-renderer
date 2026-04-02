import axios from "axios";

import { BACKEND_API_URL } from "@/api/config";
import { type SceneJSON, type RenderJSON } from "@/store/scene-store-interface";
import { useSceneStore } from "@/store/scene-store";
import { useGlContext } from "@/store/gl-contex";

export async function ExportScene({objects}: SceneJSON) {
    const takeScreenshot = useGlContext.getState().takeScreenshot
    console.log(takeScreenshot)
    const screenshotUrl = takeScreenshot!()
    const response = await fetch(screenshotUrl);
    const blob = await response.blob();

    let data = new FormData()
    data.append('scene', JSON.stringify({objects}))
    data.append('image', blob, 'scene.png')

    axios.post(BACKEND_API_URL + "/gallery/save/", data, {
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
    try {
        const response = await axios.post(BACKEND_API_URL + '/render/', render, { timeout: 0, responseType: 'blob' });
        const objectUrl = URL.createObjectURL(response.data);
        return objectUrl;
    } catch (error) {
        console.log(error);
    }
}

export async function GetScenes(page: number) {
    return axios.get(BACKEND_API_URL + `/gallery/list/`,
        {
            params: {
                start: (page-1)*4,
                end: (page-1)*4 + 4,
            }
        }
    )
}