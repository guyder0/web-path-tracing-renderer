from typing import List, Literal
from pydantic import BaseModel

class Vector3(BaseModel):
    x: float
    y: float
    z: float


class SceneObject(BaseModel):
    id: int
    type: Literal["cube", "sphere", "rectangle"]
    position: Vector3
    rotation: Vector3
    scale: Vector3
    color: str
    material: Literal["diffuse", "emitter", "dielectric", "conductor"]


class SceneCamera(BaseModel):
    position: Vector3
    lookAt: Vector3
    up: Vector3
    fov: int


class SceneParameters(BaseModel):
    objects: List[SceneObject]
    camera: SceneCamera