import { useEffect } from "react";
import type { ReactNode } from "react";

interface AlertProps {
    children?: ReactNode;
    show?: boolean;
    type?: string;
    onClose?: () => void;
    duration?: number; // Duración en ms
}

export function Alert({
    children = null,
    show = false,
    type = "",
    onClose,
    duration = 2000, // default 3 segundos
    }: AlertProps) {
        useEffect(() => {
        if (show && onClose) {
            const timer = setTimeout(() => {
            onClose();
            }, duration);
            return () => clearTimeout(timer);
    }
    }, [show, onClose, duration]);

    const typeStyles = {
        error: "border-red-500 bg-red-100 text-red-800",
        success: "border-green-500 bg-green-100 text-green-800",
        info: "border-blue-500 bg-blue-100 text-blue-800",
    }[type] || "border-gray-300 bg-white";

    const visibility = show
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "opacity-0 -translate-y-5 pointer-events-none";

    return (
    <div
        className={`
            fixed left-1/2 -translate-x-1/2 top-16 z-20
            border-2 rounded-md px-4 py-2 flex items-center gap-2
            ${typeStyles} ${visibility}
            transition-all duration-300 ease-in-out
        `}
    >
        <span>{children}</span>
    </div>
    );
}
