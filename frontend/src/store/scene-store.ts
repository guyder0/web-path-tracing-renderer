import { create } from 'zustand'
import * as THREE from 'three'

interface Store {
  objects: Array<ObjectProps>,
  selectedId: number | null,
  transformMode: 'translate' | 'rotate' | 'scale',
  addObject: (type: 'cube' | 'sphere' | 'rectangle') => void,
  updateObject: (id: number, data: Partial<ObjectProps>) => void,
  deleteObject: (id: number) => void,
  selectObject: (id: number | null) => void,
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void,
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

  // Переключение режима контролов
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => set({ transformMode: mode }),

  exportJSON: () => JSON.stringify(get(), null, 2),
  importJSON: (json: string) => set(JSON.parse(json)),
}))