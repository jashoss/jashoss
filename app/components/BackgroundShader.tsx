"use client";

import { Canvas } from "@react-three/fiber";
//import GlassCursor from "./GlassCursor";
import ShaderPlane from "./ShaderPlane";

export default function BackgroundShader() {
    return (
        <Canvas
            orthographic
            frameloop="always"
            camera={{ position: [0, 0, 5], zoom: 1 }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none'
                
            }}
        >
            <ShaderPlane />


        </Canvas>
    );
}


/*

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
    precision mediump float;

    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
        // Distancia del píxel al mouse
        float d = distance(vUv, uMouse);

        // Radio del círculo
        float radius = 0.15;

        // Borde suave
        float intensity = smoothstep(radius, radius - 0.05, d);

        // Color blanco radial
        vec3 color = vec3(intensity);

        gl_FragColor = vec4(color, intensity * 0.8);
    }

`;


function ShaderPlane() {
    const materialRef = useRef();
    const time = useRef(0);
    const mouse = useRef(new THREE.Vector2(0.5, 0.5));

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX / window.innerWidth;
            mouse.current.y = 1.0 - e.clientY / window.innerHeight;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }), []);

    useFrame((_, delta) => {
        time.current += delta;
        uniforms.uTime.value = time.current;
        uniforms.uMouse.value.copy(mouse.current);
    });



    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
}

*/