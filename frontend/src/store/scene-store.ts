import { create } from 'zustand'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'

interface Store {
  objects: Array<ObjectProps>,
  camera: MutableRefObject<THREE.PerspectiveCamera> | null,
  selectedId: number | null,
  transformMode: 'translate' | 'rotate' | 'scale',
  addObject: (type: 'cube' | 'sphere' | 'rectangle') => void,
  updateObject: (id: number, data: Partial<ObjectProps>) => void,
  deleteObject: (id: number) => void,
  selectObject: (id: number | null) => void,
  updateCamera: (ref: MutableRefObject<THREE.PerspectiveCamera>) => void,
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void,
  exportJSON: () => { objects: Array<ObjectProps>, camera: CameraProps },
  importJSON: (json: { objects: Array<ObjectProps>, camera: CameraProps }) => void,
}

interface ObjectProps {
  id: number,
  type: 'cube' | 'sphere' | 'rectangle',
  position: THREE.Vector3,
  rotation: THREE.Vector3,
  scale: THREE.Vector3,
  color: string,
  material: 'diffuse' | 'emitter' | 'dielectric' | 'conductor',
}

interface CameraProps {
  position: THREE.Vector3,
  lookAt: THREE.Vector3,
  up: THREE.Vector3,
  fov: number,
}

export const useSceneStore = create<Store>((set, get) => ({
  objects: [
    {
      id: 1,
      type: 'cube',
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
      color: '#ff0000',
      material: 'diffuse',
    },
  ],
  camera: null,
  selectedId: null,
  transformMode: 'translate',

  // Добавление объекта
  addObject: (type: 'cube' | 'sphere' | 'rectangle' = 'cube') => {
    const newId = Date.now()
    set((state) => ({
      objects: [
        ...state.objects,
        {
          id: newId,
          type,
          position: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Vector3(0, 0, 0),
          scale: new THREE.Vector3(1, 1, 1),
          color: '#' + Math.floor(Math.random()*16777215).toString(16),
          material: 'diffuse',
        },
      ],
    }))
  },

  updateObject: (id: number, newData: Partial<ObjectProps>) => {
    set((state) => ({
      objects: state.objects.map((obj: ObjectProps) =>
        obj.id === id ? { ...obj, ...newData } : obj
      ),
    }))
  },

  deleteObject: (id: number) => {
    set((state) => ({
      objects: state.objects.filter(obj => obj.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }))
  },

  selectObject: (id: number | null) => set({ selectedId: id }),

  updateCamera: (ref: MutableRefObject<THREE.PerspectiveCamera>) => set({ camera: ref }),

  // Переключение режима контролов
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => set({ transformMode: mode }),

  exportJSON: () => {
    const camera = get().camera!.current
    let look_direction = new THREE.Vector3()
    camera.getWorldDirection(look_direction)

    return {
      objects: get().objects,
      camera: {
        position: camera.position,
        lookAt: camera.position.clone().add(look_direction),
        up: camera.up,
        fov: camera.fov,
      },
    }
  },

  importJSON: (json: { objects: Array<ObjectProps>, camera: CameraProps }) => {
    set({ objects: json.objects })
    get().camera!.current.position.set(
      json.camera.position.x,
      json.camera.position.y,
      json.camera.position.z
    )
    get().camera!.current.position.set(
      json.camera.up.x,
      json.camera.up.y,
      json.camera.up.z
    )
    get().camera!.current.lookAt(json.camera.lookAt)
    get().camera!.current.fov = json.camera.fov
  },
}))