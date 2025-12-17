"use client";


import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

import { useMemo } from "react";

/**
 * 
 * inspo de shader:
 * https://www.shadertoy.com/view/tdG3Rd
 * 
 */

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

const fragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uSpeed;

    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;

    varying vec2 vUv;

    /* ---------- COLORMAP ---------- */
    float colormap_red(float x) {
        if (x < 0.0) return 54.0 / 255.0;
        else if (x < 20049.0 / 82979.0) return (829.79 * x + 54.51) / 255.0;
        else return 1.0;
    }

    float colormap_green(float x) {
        if (x < 20049.0 / 82979.0) return 0.0;
        else if (x < 327013.0 / 810990.0)
            return (8546482679670.0 / 10875673217.0 * x -
                    2064961390770.0 / 10875673217.0) / 255.0;
        else if (x <= 1.0)
            return (103806720.0 / 483977.0 * x +
                    19607415.0 / 483977.0) / 255.0;
        else return 1.0;
    }

    float colormap_blue(float x) {
        if (x < 0.0) return 54.0 / 255.0;
        else if (x < 7249.0 / 82979.0)
            return (829.79 * x + 54.51) / 255.0;
        else if (x < 20049.0 / 82979.0) return 127.0 / 255.0;
        else if (x < 327013.0 / 810990.0)
            return (792.02249 * x - 64.36479) / 255.0;
        else return 1.0;
    }

    vec3 colormap(float x) {
        return vec3(
            colormap_red(x),
            colormap_green(x),
            colormap_blue(x)
        );
    }

    /* ---------- NOISE ---------- */
    float rand(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);

        float res = mix(
            mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
            mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x),
            u.y
        );
        return res*res;
    }

    const mat2 mtx = mat2(0.80, 0.60, -0.60, 0.80);

    float fbm(vec2 p) {
        float f = 0.0;
        f += 0.500000 * noise(p + uTime * uSpeed); p = mtx * p * 2.02;
        f += 0.250000 * noise(p);         p = mtx * p * 2.03;
        f += 0.125000 * noise(p);         p = mtx * p * 2.01;
        f += 0.062500 * noise(p);         p = mtx * p * 2.04;
        return f;
    }

    float pattern(vec2 p) {
        return fbm(p + fbm(p + fbm(p)));
    }

    void main() {
        vec2 uv = vUv * 3.0;        // escala
        float shade = pattern(uv);

        vec3 color;
        if (shade < 0.5) {
            color = mix(uColor1, uColor2, shade * 2.0);
        } else {
            color = mix(uColor2, uColor3, (shade - 0.5) * 2.0);
        }
        gl_FragColor = vec4(color, 1.0);
    }


`;

export default function ShaderPlane() {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);


    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSpeed: { value: 0.6 },
        uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },

        uColor1: { value: new THREE.Color("#0F1A0F") },
        uColor2: { value: new THREE.Color("#198012") },
        uColor3: { value: new THREE.Color("#66A8FF") },

    }), []);

    useFrame((_, delta) => {
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value += delta;
    });


    useEffect(() => {
        const onResize = () => {
            if (!materialRef.current) return;

            materialRef.current.uniforms.uResolution.value.set(
            window.innerWidth,
            window.innerHeight
            );
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);


    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
            />
        </mesh>
    );
}
