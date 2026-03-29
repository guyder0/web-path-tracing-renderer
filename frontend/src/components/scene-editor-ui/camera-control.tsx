import { useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'

import { useSceneStore } from '@/store/scene-store'

export const CameraControl = () => {
  const { cameraFov, setCameraFov } = useSceneStore()
  const [keys, setKeys] = useState({ plus: false, minus: false })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '=') setKeys(k => ({ ...k, plus: true }))
      if (e.key === '-') setKeys(k => ({ ...k, minus: true }))
    }
    const up = (e: KeyboardEvent) => {
      if (e.key === '=') setKeys(k => ({ ...k, plus: false }))
      if (e.key === '-') setKeys(k => ({ ...k, minus: false }))
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useFrame((state, delta) => {
    if (keys.plus) setCameraFov(cameraFov + 20 * delta) // Плавное увеличение
    if (keys.minus) setCameraFov(cameraFov - 20 * delta) // Плавное уменьшение
  })

  return null
}