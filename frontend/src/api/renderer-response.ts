import { BACKEND_API_URL } from "@/api/config";
import axios from "axios";

export async function ExportScene(scene: object) {
    axios.post(BACKEND_API_URL + "/gallery/save", scene, {
        headers: {
            'x-user-id': '1',
            'x-user-hashed-password': '1',
        }
    })
}