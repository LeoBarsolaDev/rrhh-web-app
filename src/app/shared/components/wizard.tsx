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

    const container = stepRef.current;

    if (container) {
      const inputs = container.querySelectorAll("input, select, textarea");

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

  const prev = () => {
    setIndex(i => Math.max(i - 1, 0));
  };

  return (
    <div className="md:p-4 p-2 w-full h-full flex flex-col bg-frame rounded-2xl">

        {/* Indicador de pasos */}
        <div className="flex justify-between">
            {steps.map((step, i) => (
                <span
                    key={i}
                    className="flex flex-col justify-center items-center md:px-6 pt-2 gap-2"
                >
                    <span
                        className={`
                            w-8 h-8
                            flex justify-center items-center
                            rounded-full
                            text-secondary font-black
                            sm:mb-0 mb-8
                            ${i <= index ? "bg-primary text-white" : "bg-foreground text-background"}
                            transition-all duration-200
                        `}
                    >
                        {i + 1}
                    </span>

                    <span
                        className={`
                            font-bold
                            sm:block hidden
                            ${i <= index ? "text-primary" : "text-foreground"}
                            transition-all duration-200
                        `}
                    >
                        {step.props.name}
                    </span>
                </span>
            ))}
        </div>

        <hr className="border-secondary" />

        {/* Step actual */}
        <div ref={stepRef} className="flex-1 overflow-visible">
            {steps[index]}
        </div>

        {/* Controles */}
        <div className="w-full mt-4 flex justify-evenly">
            <Button
                color="primary"
                onClick={prev}
                disabled={index === 0}
            >
                <FontAwesomeIcon icon={faLeftLong} />
            </Button>

            <Button
                color="primary"
                onClick={next}
                disabled={index === steps.length - 1}
            >
                <FontAwesomeIcon icon={faRightLong} />
            </Button>
        </div>

    </div>
  );
}