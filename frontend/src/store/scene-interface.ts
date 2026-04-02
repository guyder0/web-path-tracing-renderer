import * as THREE from 'three'
import { type RefObject } from 'react'

export interface Store {
  objects: Array<ObjectProps>,
  camera: RefObject<THREE.PerspectiveCamera> | null,
  cameraFov: number,
  selectedId: string | null,
  transformMode: 'translate' | 'rotate' | 'scale',
  addObject: (type: ObjectProps['type']) => void,
  updateObject: (id: string, data: Partial<ObjectProps>) => void,
  deleteObject: (id: string) => void,
  selectObject: (id: string | null) => void,
  selectCamera: (ref: RefObject<THREE.PerspectiveCamera>) => void,
  setCameraFov: (fov: number) => void,
  setTransformMode: (mode: Store['transformMode']) => void,
  exportJSON: () => SceneJSON,
  importJSON: (json: SceneJSON) => void,
}

export type ObjectTypes = 'cube' | 'sphere' | 'rectangle'
export type ObjectMaterials = 'diffuse' | 'emitter' | 'dielectric' | 'conductor'

export interface ObjectProps {
  id: string,
  type: ObjectTypes,
  position: THREE.Vector3,
  rotation: THREE.Vector3,
  scale: THREE.Vector3,
  color: string,
  material: ObjectMaterials,
  emitterProps?: object,
  bsdfProps?: object,
}

export interface CameraProps {
  position: THREE.Vector3,
  lookAt: THREE.Vector3,
  up: THREE.Vector3,
  fov: number,
}

export interface SceneJSON {
  objects: Array<ObjectProps>,
  sensor: CameraProps,
}

export interface RenderJSON extends SceneJSON {
  spp: number,
  width: number,
  height: number,
}