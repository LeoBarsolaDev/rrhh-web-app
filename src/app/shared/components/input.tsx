// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface props {
    type?: "text" | "number" | "date" | "email" | "password" | "file";
    name?: string;
    label?: string;
    placeholder?: string;
    icon?: IconDefinition;
    required?:boolean;
    isValid?: "" | "not valid" | "valid";
    invalidMessage?: string;
    isPassword?:boolean;
    onChange?: (value: string | number | null) => void;
    onShowPassword?: () => void;
}

export default function Input({type="text", name="",label="", placeholder="", required=false, isValid="", invalidMessage="", isPassword=false, icon, onChange} : props){
    const [showPassword, setShowPassword] = useState<boolean>(false);
    function onShowPassword(){
        setShowPassword(!showPassword);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return;

        let value: string | number | null = e.target.value;

        if (type === "number") {
            value = value === "" ? null : Number(value);
        }

        if (type === "date") {
            value = value === "" ? null : value;
        }

        onChange(value);
    };
    
    return(
        <div className="
            flex flex-col
            px-1 py-2 w-full
            group relative
        ">
            { invalidMessage !== "" ?
                (
                    <span className={`
                        absolute -bottom-2
                        text-xs text-red-600 pl-2
                        ${isValid === "not valid" ? "opacity-100" : " opacity-0"} 
                    `}>
                        {invalidMessage !== "" ? invalidMessage : "Datos invalidos"}
                    </span>
                ) : (<></>)
            }
            <label htmlFor={name} className={`
                text-foreground  font-semibold
                transition-all duration-150
                ${isValid === "not valid" ? "text-red-700" : "group-focus-within:text-primary"}      
            `}>
                {label}
            </label>
            <div className={`
                px-2 py-1
                rounded-lg
                bg-secondary
                flex flex-row
                border-red-700
                ${isValid === "not valid" ? "border" : " border-none"}    
            `} >
                {icon && (
                    <span className={`
                        mr-1 text-foreground  transition-all duration-150
                        ${isValid === "not valid" ? "text-red-700" : "group-focus-within:text-primary"}  
                    `}>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                )}

                {!isPassword ? (
                    <input
                        type={type} 
                        id={name} 
                        name={name} 
                        required={required}
                        placeholder={placeholder}
                        onChange={handleInputChange} 
                        className={`
                            w-full
                            text-md font-medium
                            focus:outline-none text-foreground 
                            placeholder:text-placeholder group-focus-within:placeholder:text-primary
                            transition-all duration-150
                            ${isValid === "not valid" ? "text-red-700" : "group-focus-within:text-primary"}   
                        `}
                    />
                ) : (
                    <>
                        <input
                            type={ showPassword ? "text" : "password" } 
                            id={name} 
                            name={name} 
                            required={required}
                            placeholder={ showPassword ? "Contraseña123" : "••••••••" } 
                            onChange={handleInputChange} 
                            className="
                                w-full
                                text-md font-medium
                                focus:outline-none text-light-01 group-focus-within:text-light-03
                                transition-all duration-150
                        "/>
                        
                        <button 
                            className="mr-1 text-light-01 group-focus-within:text-light-03 transition-all duration-150 "
                            onClick={onShowPassword} 
                            type="button" 
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}