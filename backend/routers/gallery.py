from fastapi import APIRouter, Form, File, UploadFile
from fastapi.responses import FileResponse
from pathlib import Path
import os, json

from models import SceneParameters

router = APIRouter()

@router.post("/save")
async def save_scene(
    image: UploadFile = File(..., alias='image'),
    scene: str = Form(..., alias='scene'),
    ):
    scene_data = SceneParameters.model_validate_json(scene)
    jsn = json.dumps(json.loads(scene), indent=4, ensure_ascii=False)
    print(jsn)


@router.get("/load/{file_hash}/")
async def load_scene(file_hash: str) -> SceneParameters:
    spath = Path('scenes/' + file_hash)
    sfile = list(spath.glob('*.json'))[0]
    with open(sfile, "r", encoding="utf-8") as f:
        scene = json.loads(f.read())
    return scene


@router.get("/list")
async def get_list(start: int = 0, end: int = -1):
    result = []
    spath = Path('/home/guyder/web-path-tracing-renderer/backend/scenes')

    for shash in spath.iterdir():
        sname = list(shash.glob('*.json'))[0]
        result.append({
            'hash': shash.name,
            'title': sname.stem,
        })

    print(result[start:end])
    return result[start:end]

@router.get("/image/{file_hash}/")
def get_image(file_hash: str):
    ipath = Path('scenes/' + file_hash + '/image.png')
    return FileResponse(ipath)