from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def render_scene():
    ...