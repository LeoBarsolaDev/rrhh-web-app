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

        if (open) {
            window.addEventListener("keydown", handleKeyDown);

            // 🔒 Bloquear scroll del fondo
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);

            // 🔓 Restaurar scroll
            document.body.style.overflow = "auto";
        };
    }, [open, setOpen]);
    return(
        <div
            className={`
                fixed inset-0 z-50
                bg-black/60 backdrop-blur-sm
                flex justify-center items-center
                
                transition-all duration-150
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
            onClick={() => setOpen(false)}
        >
            <div
                className={`
                    bg-frame 
                    
                    flex flex-col 
                    md:py-2 md:px-4 p-2 rounded-xl shadow-2xl
                    m-8
                    ${width === "" ? "w-11/12 md:w-8/10 max-h-9/10" : width} ${styles}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabecera: Siempre visible, no scrollea */}
                <div className="w-full text-right shrink-0 relative">
                    <button
                        className="text-foreground hover:text-red-800 transition-all absolute md:top-1 md:-right-2 top-0 right-0"
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
