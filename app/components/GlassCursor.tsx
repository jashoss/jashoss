import * as THREE from "three";
//import { MeshTransmissionMaterial } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function GlassCursor() {
    const meshRef = useRef<THREE.Mesh | null>(null);
    const { viewport } = useThree();

    useFrame(({ mouse }) => {
        if (!meshRef.current) return;

        meshRef.current.position.x = (mouse.x * viewport.width) / 2;
        meshRef.current.position.y = (mouse.y * viewport.height) / 2;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <circleGeometry args={[0.5, 64]} />
            <meshBasicMaterial color="red" />
        </mesh>
    );
}
