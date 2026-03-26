import React, { type ReactNode } from "react";

type RadioProps = {
    children?: ReactNode;
    value: string;
    selected: string | null;
    onChange: (value: string) => void;
    name: string;
    required?: boolean
};

export default function Radio({
    children,
    value,
    selected,
    onChange,
    name,
    required=false
}: RadioProps) {
    const isSelected = selected === value;

    return (
        <label
            className={`
                cursor-pointer rounded-md transition py-1 px-4 font-bold
                border-2 border-primary
                ${isSelected ? "bg-primary text-white" : "text-primary"}
            `}
            >
            <input
                type="radio"
                name={name}
                value={value}
                checked={isSelected}
                onChange={() => onChange(value)}
                className="hidden"
                required={required}
            />
            {children}
        </label>
    );
}