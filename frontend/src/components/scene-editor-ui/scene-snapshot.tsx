import { useThree } from '@react-three/fiber'
import { useEffect } from 'react';

import { useGlContext } from '@/store/gl-contex';

export const SceneSnapshot = () => {
    const { gl, scene, camera } = useThree();
    const setTakeScreenshot = useGlContext((state) => state.setTakeScreenshot);

    useEffect(() => {
        setTakeScreenshot(() => {
            gl.render(scene, camera);
            return gl.domElement.toDataURL('image/png');
        });
    }, [gl, scene, camera]);

    return null
}