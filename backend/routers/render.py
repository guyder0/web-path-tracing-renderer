from fastapi import APIRouter
from fastapi.responses import Response

from models import RenderParameters
from core.converter import json_to_mitsuba
from core.renderer import render_scene as mitsuba_render
from exception import AppException

router = APIRouter()

@router.post("/")
async def render_scene(render_params: RenderParameters):
    mitsuba_params = json_to_mitsuba(render_params.model_dump())
    img = mitsuba_render(mitsuba_params)
    return Response(img, media_type="image/png")