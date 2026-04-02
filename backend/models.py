from typing import List, Literal, Optional
from pydantic import BaseModel

class Vector3(BaseModel):
    x: float
    y: float
    z: float


class SceneObject(BaseModel):
    id: str
    type: Literal["cube", "sphere", "rectangle"]
    position: Vector3
    rotation: Vector3
    scale: Vector3
    color: str
    material: Literal["diffuse", "emitter", "dielectric", "conductor"]
    bsdfProps: Optional[dict] = None
    emitterProps: Optional[dict] = None


class SceneCamera(BaseModel):
    position: Vector3
    lookAt: Vector3
    up: Vector3
    fov: float


class SceneParameters(BaseModel):
    objects: List[SceneObject]


class RenderParameters(SceneParameters):
    sensor: SceneCamera
    spp: int
    width: int
    height: int