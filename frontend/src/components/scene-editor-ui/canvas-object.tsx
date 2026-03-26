import { useRef, useState } from 'react'
import { useSceneStore } from '@/store/scene-store'
import { TransformControls, Outlines } from '@react-three/drei'
import * as THREE from 'three'

const GEOMETRY_MAP = {
  cube: <boxGeometry/>,
  sphere: <sphereGeometry/>,
  rectangle: <planeGeometry/>,
}

export const SceneObject = ({ id }: { id: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const data = useSceneStore((state) => state.objects.find(o => o.id === id))
  const updateObject = useSceneStore((state) => state.updateObject)
  const selectObject = useSceneStore((state) => state.selectObject)
  const transformMode = useSceneStore((state) => state.transformMode)

  if (!data) return null

  // Находим компонент геометрии по имени
  const GeometryComponent = GEOMETRY_MAP[data.type as keyof typeof GEOMETRY_MAP]

  const handleTransformEnd = () => {
    if (meshRef.current) {
      updateObject(id, {
        position: new THREE.Vector3(
          meshRef.current.position.x,
          meshRef.current.position.y,
          meshRef.current.position.z,
        ),
        rotation: new THREE.Vector3(
          meshRef.current.rotation.x,
          meshRef.current.rotation.y,
          meshRef.current.rotation.z,
        ),
        scale: new THREE.Vector3(
          meshRef.current.scale.x,
          meshRef.current.scale.y,
          meshRef.current.scale.z,
        ),
      })
    }
  }

  return (
    <>
      {isEditing &&
      <TransformControls
        object={meshRef}
        onMouseUp={handleTransformEnd}
        mode={transformMode}
      />}
      <mesh
        ref={meshRef}
        position={data.position}
        onClick={(e) => {
          e.stopPropagation()
          selectObject(id)
          setIsEditing(true)
        }}
        onPointerMissed={ () => { setIsEditing(false); selectObject(null); } }
      >
        {/* Геометрия */}
        {GeometryComponent}
        <meshStandardMaterial color={data.color} />
        {data.material == "conductor" &&
          <Outlines thickness={2.5} color="#ffffff" opacity={1} />
        }
        {data.material == "dielectric" &&
          <Outlines thickness={2.5} color="#60a5fa" opacity={1} />
        }
        {data.material == "emitter" &&
          <Outlines thickness={2.5} color="#f97316" opacity={1} />
        }
      </mesh>
    </>
  )
}