from fastapi import APIRouter
import matplotlib.pyplot as plt

from models import RenderParameters
from core.converter import json_to_mitsuba
from core.renderer import render_scene as mitsuba_render

router = APIRouter()

@router.post("/")
async def render_scene(render_params: RenderParameters):
    mitsuba_params = json_to_mitsuba(render_params)
    img = mitsuba_render(mitsuba_params)
    plt.imshow(img)


def test_render(render_params: RenderParameters):
    mitsuba_params = json_to_mitsuba(render_params)
    img = mitsuba_render(mitsuba_params)
    return img