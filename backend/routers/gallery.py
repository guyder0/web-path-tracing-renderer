from fastapi import APIRouter, Body
from models import SceneParameters
from utils.authorization import authorize_user

router = APIRouter()

@router.post("/save")
async def save_scene(scene: SceneParameters = Body()):
    authorize_user()
    print(scene)