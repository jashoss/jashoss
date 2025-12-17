"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Palette } from "lucide-react";
import BackgroundShader from "../components/BackgroundShader";
import '../styles/home.css';

export default function Home() {

    const colorsBack=[
        '#cb000005', //rojo
        '#00ba0005', //verde
        '#5100ba05', //morado
    ]
    const [colorTheme, setColorTheme]= useState(0);

    const projectsImgs= {
        'primero': {
            title: 'Primero',
            color: '#00ba00',
            url: 'urladondevan',
            img: '/assets/flores/flor1.jpg',
        },
        'segundo': {
            title: 'Segundo',
            color: '#00ba00',
            url: 'urladondevan',
            img: '/assets/flores/muchas.jpg',
        },
        'tercero': {
            title: 'Tecero',
            color: '#00ba00',
            url: 'urladondevan',
            img: '/assets/flores/navi.jpg',
        },
        'cuarto': {
            title: 'Cuarto',
            color: '#00ba00',
            url: 'urladondevan',
            img: '/assets/flores/palo.jpg',
        },
        'quinto': {
            title: 'Quinto',
            color: '#00ba00',
            url: 'urladondevan',
            img: '/assets/flores/reinota.jpg',
        },
        'sexto': {
            title: 'Quinto',
            color: '#00ba00',
            url: 'urladondevan',
            img: '/assets/flores/rosita.jpg',
        },
        
    };
    const loopProjects = [...Object.values(projectsImgs), ...Object.values(projectsImgs)];


    return (
        <div className="flex flex-col bg-[#1b1b1b] w-screen h-screen ">
            <div className="fixed inset-0 z-1000 pointer-events-none" style={{backgroundColor: colorsBack[colorTheme]}} />

            <BackgroundShader />

            <div className="w-full h-full flex flex-col justify-between ">
                <div className="w-full h-[10%] justify-between flex flex-row relative p-[2vh]">
                    <button className="absolute left-[49%]" onClick={()=> {
                            if(colorTheme===colorsBack.length-1)
                                setColorTheme(0);
                            else
                                setColorTheme(colorTheme+1)
                            }}>
                        <Palette  className="w-5 h-5"/>
                    </button>
                    
                    <div>
                        <p className="font-bold text-1xl leading-none m-0">Tijash Salamanca</p>
                        <p className="font-bold text-gray-300 leading-none m-0">Aquí otra cosa</p>
                    </div>


                    
                    <p className="font-bold text-2xl">CONTACT</p>
                </div>

                <div className="w-full h-[65%] overflow-hidden">
                    <div className="flex w-max h-full animate-scroll gap-[0.8vw]">
                        {loopProjects.map((project, index) => (
                            <div
                                key={index}
                                className="w-[19.2vw] h-full rounded-[3px]"
                                style={{ backgroundColor: project.color }}
                            >
                                <Image
                                    src={project.img}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover grayscale"
                                    alt={project.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="w-full h-[10%] justify-between flex flex-row items-end p-[2vh]">
                    <Link href="/about" className="font-bold text-2xl">ABOUT</Link>
                    <h1 className="font-bold text-1xl">SOPTIFY</h1>
                </div>
            </div>

        </div>

    );
}
