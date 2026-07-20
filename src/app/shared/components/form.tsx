import { type ReactNode, type FormEvent } from 'react';
import { api } from '../services/apiClient';

interface Props {
    url: string;
    children?: ReactNode;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    className?: string;
    isSending?: boolean;
    method?: string;
    validate?: ((data: any) => boolean | string) | "not valid" | "valid" | "" | boolean;
}

export default function Form({ url, children, onSuccess, onError, className = "p-6", method="POST", validate }: Props) {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("=== INICIO SUBMIT ===");
    
    try {
        const formData = new FormData(e.currentTarget);

        const hasFiles = Array.from(formData.values()).some(
            (value) => value instanceof File && value.name !== "" && value.size > 0
        );

        const dataToSend = hasFiles ? formData : Object.fromEntries(formData.entries());
        console.log("Datos a enviar listos:", dataToSend);
        console.log("Valor de validate recibido:", validate);

        if (validate !== undefined && validate !== "") {
            let isValid = true;
            let errorMsg = "La validación ha fallado";

            if (typeof validate === "function") {
                console.log("Validando como función...");
                const result = validate(dataToSend);
                if (result !== true) {
                    isValid = false;
                    if (typeof result === "string") errorMsg = result;
                }
            } else {
                console.log("Validando como valor directo...");
                // Comprobamos si validate es el string "valid" o directamente el booleano true
                isValid = validate === "valid" || validate === true;
            }

            console.log("¿Es válido?:", isValid);

            if (!isValid) {
                console.warn("❌ Validación fallida. Deteniendo petición.");
                if (onError) {
                    onError({
                        message: errorMsg,
                        response: { data: { error: errorMsg } }
                    });
                }
                return; // Se detiene aquí
            }
        }

        console.log("🚀 Enviando petición HTTP via apiClient...");
        let response: any;

        if (method.toLowerCase() === "post") {
            response = await api.post(url, dataToSend);
        }
        if (method.toLowerCase() === "patch") {
            response = await api.patch(url, dataToSend);
        }

        console.log("✅ Respuesta recibida exitosamente:", response);
        if (onSuccess) onSuccess(response);

    } catch (error: any) {
        console.error("💥 Error capturado dentro del try/catch de Form.tsx:", error);
        
        // Estructuramos el error para que useEditModal no reciba 'undefined'
        if (onError) {
            onError({
                message: error.message || "Error de red o del servidor",
                response: error.response || { data: { error: error.message } }
            });
        }
    }
};

    return (
        <form 
            onSubmit={handleSubmit} 
            className={className}
            encType="multipart/form-data" 
        >
            {children}
        </form>
    );
}