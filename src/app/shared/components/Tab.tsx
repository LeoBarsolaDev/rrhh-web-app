import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

export default function Tab({
    value,
    active,
    children,
    icon,
    onClick
}: {
    value: string,
    active: boolean,
    children: ReactNode,
    icon: IconDefinition,
    onClick: () => void
}) {
    return (
        <li
            className={`w-full p-1 cursor-pointer transition-all duration-150 flex justify-center items-center gap-1
                ${active ? "bg-separator font-bold" : "bg-transparent hover:bg-separator hover:text-foreground text-placeholder"}
            `}
            onClick={onClick}
            key={value}
        >
            <span className={`
                
                ${active ? "font-bold" : ""}
            `}>
                <FontAwesomeIcon icon={icon} />
            </span>
            
            <span className={`
                hidden md:inline-block
                ${active ? "font-bold" : ""}
            `}>
                {children}
            </span>
        </li>
    );
}