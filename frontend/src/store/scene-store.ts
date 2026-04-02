import { create } from 'zustand'
import * as THREE from 'three'
import type { RefObject } from 'react'

import {
  type Store,
  type ObjectTypes,
  type ObjectProps,
  type SceneJSON,
} from '@/store/scene-interface'

import { importSceneObject } from '@/store/scene-store-utils'

export const useSceneStore = create<Store>((set, get) => ({
  objects: [
    {
      id: "1",
      type: 'cube',
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
      color: '#ff0000',
      material: 'diffuse',
    },
  ],
  camera: null,
  cameraFov: 75,
  selectedId: null,
  transformMode: 'translate',

  // Добавление объекта
  addObject: (type: ObjectTypes = 'cube') => {
    const newId = Date.now().toString()
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
          emitterProps: undefined,
          bsdfProps: undefined,
        },
      ],
    }))
  },

  updateObject: (id: string, newData: Partial<ObjectProps>) => {
    set((state) => ({
      objects: state.objects.map((obj: ObjectProps) =>
        obj.id === id ? { ...obj, ...newData } : obj
      ),
    }))
  },

  deleteObject: (id: string) => {
    set((state) => ({
      objects: state.objects.filter(obj => obj.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }))
  },

  selectObject: (id: string | null) => set({ selectedId: id }),

  selectCamera: (ref: RefObject<THREE.PerspectiveCamera>) => set({ camera: ref }),

  setCameraFov: (fov: number) => set({ cameraFov: fov }),

  setTransformMode: (mode: Store['transformMode']) => set({ transformMode: mode }),

  exportJSON: () => {
    const camera = get().camera!.current
    let look_direction = new THREE.Vector3()
    camera.getWorldDirection(look_direction)

    return {
      objects: get().objects,
      sensor: {
        position: camera.position,
        lookAt: camera.position.clone().add(look_direction),
        up: camera.up,
        fov: camera.fov,
      },
    }
  },

  importJSON: ({ objects }: SceneJSON) => {
    set({ objects: objects.map(importSceneObject) })
  },
}))