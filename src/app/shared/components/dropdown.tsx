import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

export type DropdownOption = {
  name: string | number
  id: string
}

interface DropdownProps {
  name?: string
  label?: string
  placeholder?: string
  icon?: IconDefinition
  required?: boolean
  options: DropdownOption[]
  defaultValue?: string
  onChange?: (value: string) => void
}

export default function Dropdown({
    name = "",
    label = "",
    placeholder = "Seleccionar",
    icon,
    required = false,
    options,
    defaultValue = "",
    onChange,
}: DropdownProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(defaultValue)
    const containerRef = useRef<HTMLDivElement>(null)
    const triggerId = `dropdown-${name}`

    const selectedOption = options.find(o => o.id === value)

    const selectOption = (val: string) => {
        setValue(val)
        setOpen(false)
        onChange?.(val)
    }

    // 🔹 cerrar al clickear fuera
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div
        ref={containerRef}
        className="
            flex flex-col
            px-1 py-2 w-full
            group
            relative
        "
        >
            {/* Label */}
            <label
                className="
                    text-foreground
                    group-focus-within:text-primary
                    font-semibold
                    transition-all duration-150
                "
                htmlFor={triggerId}
            >
            {label}
            </label>

            {/* Select REAL (oculto, para el form) */}
            <select
                name={name}
                required={required}
                value={value}
                onChange={() => {}}
                className="
                    absolute
                    opacity-0
                    pointer-events-none
                    w-px
                    h-px
                "
            >
            <option value="" />
            {options.map(o => (
                <option key={o.id} value={o.id} />
            ))}
            </select>

        {/* Trigger visual */}
        <button
            id={triggerId}
            type="button"
            onClick={() => setOpen(o => !o)}
            className="
            px-2 py-2
            bg-secondary
            flex items-center justify-between
            text-md font-medium
            
            focus:outline-none
        "
            >
            <div className="flex items-center gap-2">
                {icon && (
                    <span className="text-foreground group-focus-within:text-primary transition-all">
                        <FontAwesomeIcon icon={icon} />
                    </span>
                )}

                <span className={`
                    group-focus-within:text-primary
                    transition-all
                    ${selectedOption?.name ? "text-foreground" : "text-placeholder"}    
                `}>
                    {selectedOption?.name || placeholder}
                </span>
            </div>

            <FontAwesomeIcon
                icon={faChevronDown}
                className={`
                    transition-transform duration-150
                    ${open ? "rotate-180 text-primary" : "text-placeholder"}
                `}
            />
            </button>

            {/* Menu */}
            {/* {open && ( */}
            <div className={`
                relative w-full z-50
            `}>
                <ul className={`
                        absolute
                        w-full
                        bg-secondary
                        shadow-lg
                        overflow-auto origin-top
                        ${open ? "scale-y-100" : "scale-y-0"}
                        transition-all duration-150
                    `}
                >
                {options.map(option => (
                    <li
                    key={option.id}
                    onClick={() => selectOption(option.id)}
                    className={`
                        px-3 py-2
                        cursor-pointer
                        transition-colors
                        text-placeholder
                        hover:bg-primary hover:text-white
                    `}
                    >
                        {option.name}
                    </li>
                ))}
                </ul>
            </div>
        {/* )} */}
        </div>
    )
}


