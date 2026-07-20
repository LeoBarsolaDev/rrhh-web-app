// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

interface props {
    name?: string;
    label?: string;
    placeholder?: string;
    icon?: IconDefinition;
    required?: boolean;
    isValid?: "" | "not valid" | "valid";
    invalidMessage?: string;
    maxLength?: number; // Nueva propiedad para limitar caracteres
    rows?: number;      // Permite configurar la altura inicial
    onChange?: (value: string | null) => void;
}

export default function Textarea({
    name = "",
    label = "",
    placeholder = "",
    required = false,
    isValid = "",
    invalidMessage = "",
    maxLength = 255, // Por defecto un límite de 255 si no se especifica
    rows = 4,
    icon,
    onChange
}: props) {
    const [charCount, setCharCount] = useState<number>(0);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setCharCount(val.length);

        if (!onChange) return;
        onChange(val === "" ? null : val);
    };

    return (
        <div className="
            flex flex-col
            px-1 py-2 w-full
            group relative
        ">
            {invalidMessage !== "" ? (
                <span className={`
                    absolute -bottom-2
                    text-xs text-red-600 pl-2
                    ${isValid === "not valid" ? "opacity-100" : " opacity-0"} 
                `}>
                    {invalidMessage !== "" ? invalidMessage : "Datos invalidos"}
                </span>
            ) : null}

            <label htmlFor={name} className={`
                text-foreground font-semibold
                transition-all duration-150
                ${isValid === "not valid" ? "text-red-700" : "group-focus-within:text-primary"}      
            `}>
                {label}
            </label>

            {/* Agregamos relative a esta envoltura para poder posicionar el contador de manera absoluta abajo a la derecha */}
            <div className={`
                px-2 py-1
                rounded-lg
                bg-secondary
                flex flex-row
                border-red-700
                relative
                ${isValid === "not valid" ? "border" : " border-none"}    
            `}>
                {icon && (
                    <span className={`
                        mr-1 mt-1 text-foreground transition-all duration-150
                        ${isValid === "not valid" ? "text-red-700" : "group-focus-within:text-primary"}  
                    `}>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                )}

                <textarea
                    id={name}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    rows={rows}
                    onChange={handleTextareaChange}
                    className={`
                        w-full resize-none pb-5
                        text-md font-medium
                        focus:outline-none text-foreground 
                        bg-transparent
                        placeholder:text-placeholder group-focus-within:placeholder:text-primary
                        transition-all duration-150
                        ${isValid === "not valid" ? "text-red-700" : "group-focus-within:text-primary"}   
                    `}
                />

                {/* Contador de caracteres abajo a la derecha */}
                <span className={`
                    absolute bottom-1 right-2 text-xs font-semibold select-none transition-all duration-150
                    ${isValid === "not valid" ? "text-red-700" : "text-placeholder group-focus-within:text-primary-light text-opacity-70"}
                `}>
                    {charCount} / {maxLength}
                </span>
            </div>
        </div>
    );
}