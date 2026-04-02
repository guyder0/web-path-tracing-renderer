import * as THREE from 'three'
import { type ObjectProps } from '@/store/scene-interface';

export const fromJSONVector = (v: { x: number; y: number; z: number }) =>
  new THREE.Vector3(v.x, v.y, v.z)

export const importSceneObject = (obj: any): ObjectProps => ({
  ...obj,
  position: fromJSONVector(obj.position),
  rotation: fromJSONVector(obj.rotation),
  scale: fromJSONVector(obj.scale),
})