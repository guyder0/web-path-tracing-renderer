import { useSceneStore } from "@/store/scene-store"
import { SceneObject } from "@/components/scene-editor-ui/canvas-object"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

export const CanvasPlayground = () => {
    let objects = useSceneStore(state => state.objects)

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <gridHelper args={[20, 20]} position={[0, -0.5, 0]} />
            <OrbitControls makeDefault enableDamping={false}/>

            {objects.map(obj => (<SceneObject key={obj.id} id={obj.id}/>))}
        </Canvas>
    )
}