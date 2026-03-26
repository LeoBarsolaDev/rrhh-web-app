import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ModalTypes } from "../types/modalTypes";

export default function Modal({open, children ,setOpen, styles="", width=""} : ModalTypes){
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setOpen(false);
        }
        };

        // Escuchar cuando el modal esté abierto
        if (open) {
        window.addEventListener("keydown", handleKeyDown);
        }

        // Limpiar el evento al desmontar o cerrar el modal
        return () => {
        window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, setOpen]);
    return(
        <div
            className={`
                fixed inset-0 z-50
                bg-black/60 backdrop-blur-sm
                flex justify-center items-center
                
                transition-all duration-300
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
            onClick={() => setOpen(false)}
        >
            <div
                className={`
                    bg-frame 
                    w-11/12 md:w-8/10 
                    max-h-9/10
                    flex flex-col 
                    p-4 rounded-xl shadow-2xl
                    m-8
                    ${width} ${styles}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabecera: Siempre visible, no scrollea */}
                <div className="w-full text-right shrink-0 mb-2">
                    <button
                        className="text-foreground hover:text-red-800 transition-all p-1"
                        onClick={() => setOpen(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>
                </div>

                {/* 3. Contenedor de CHILDREN: Este es el único que scrollea */}
                <div className="
                    w-full 
                    /* 'min-h-0' es la clave para que Flexbox permita el scroll interno */
                    min-h-0 
                    grow
                    overflow-y-auto 
                    overflow-x-hidden
                    pr-2
                    
                    /* Estilización del Scrollbar */
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-primary/20
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-primary/50
                ">
                    {children}
                </div>
            </div>
        </div>
    )
}
