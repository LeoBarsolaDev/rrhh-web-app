import type { ReactNode } from "react";
import React, { useRef, useState } from "react";
import { Button } from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

export function Step({ children, name } : { children:React.ReactNode, name:string }){
    return <> { children } </>
}

export function Wizard({ children }: { children: React.ReactNode }) {
    const steps = React.Children.toArray(children) as React.ReactElement[];
    const [index, setIndex] = useState(0);
    const stepRef = useRef<HTMLDivElement>(null);

    const next = () => {
        // Validamos solo el paso actual antes de avanzar
        const currentStepContainer = document.getElementById(`step-${index}`);
        if (currentStepContainer) {
        const inputs = currentStepContainer.querySelectorAll("input, select, textarea");
        for (const input of inputs) {
            const element = input as HTMLInputElement;
            if (!element.checkValidity()) {
            element.reportValidity();
            return;
            }
        }
        }
        setIndex(i => Math.min(i + 1, steps.length - 1));
    };

    const prev = () => setIndex(i => Math.max(i - 1, 0));

    return (
        <div className="p-4 w-full h-full flex flex-col bg-frame rounded-2xl">
        {/* Indicador de pasos (mismo código) */}
        <div className="flex justify-between">
            {steps.map((step, i) => (
            <span key={i} className="flex flex-col justify-center items-center px-6 pt-2">
                <span className={`w-8 h-8 flex justify-center items-center rounded-full text-secondary font-black sm:mb-0 mb-8 transition-all duration-200 ${i <= index ? "bg-primary text-white" : "bg-foreground text-background"}`}>
                {i + 1}
                </span>
                <span className={`font-bold sm:block hidden transition-all duration-200 ${i <= index ? "text-primary" : "text-foreground"}`}>
                {step.props.name}
                </span>
            </span>
            ))}
        </div>

        <hr className="border-secondary my-4" />

        {/* RENDERIZADO DE PASOS: Ahora no se desmontan */}
        <div className="flex-1 overflow-visible relative">
            {steps.map((step, i) => (
            <div 
                key={i} 
                id={`step-${i}`}
                className={i === index ? "block" : "hidden"}
            >
                {step}
            </div>
            ))}
        </div>

        {/* Controles (mismo código) */}
        <div className="w-full mt-4 flex justify-evenly">
            <Button type="button" color="primary" onClick={prev} disabled={index === 0}>
            <FontAwesomeIcon icon={faLeftLong} />
            </Button>

            {/* Ocultamos el botón 'Next' en el último paso para que no estorbe al botón 'Submit' de tu página */}
            {index < steps.length - 1 && (
            <Button type="button" color="primary" onClick={next}>
                <FontAwesomeIcon icon={faRightLong} />
            </Button>
            )}
        </div>
        </div>
    );
}