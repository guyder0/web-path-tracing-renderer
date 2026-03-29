import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'

import { useSceneStore } from "@/store/scene-store"
import { SceneObject } from "@/components/scene-editor-ui/canvas-object"
import { CameraControl } from "@/components/scene-editor-ui/camera-control"

export const CanvasPlayground = () => {
    let objects = useSceneStore(state => state.objects)
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
    const updateCamera = useSceneStore(state => state.selectCamera)
    useEffect(() => {
        updateCamera(cameraRef)
    }, [])

    const cameraFov = useSceneStore(store => store.cameraFov)

    const [needGrid, setNeedGrid] = useState<boolean>(true)
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'g') setNeedGrid(!needGrid)
    })

    return (
        <Canvas id="scene-canvas" onCreated={ ({ camera }) => { cameraRef.current = camera as THREE.PerspectiveCamera; } }>
            <CameraControl />
            <PerspectiveCamera
                makeDefault
                position={[0, 5, 10]}
                fov={cameraFov}
            />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            {needGrid && <gridHelper args={[20, 20]} position={[0, 0, 0]} />}
            <OrbitControls makeDefault enableDamping={false}/>

            {objects.map(obj => (<SceneObject key={obj.id} id={obj.id}/>))}
        </Canvas>
    )
}