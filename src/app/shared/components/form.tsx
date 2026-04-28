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
    validate?: ((data: any) => boolean | string) | "not valid" | "valid" | "";
}

export default function Form({ url, children, onSuccess, onError, className = "p-6", method="POST", validate }: Props) {


  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Comprobamos si hay algún archivo real en el FormData
        const hasFiles = Array.from(formData.values()).some(
            (value) => value instanceof File && value.name !== "" && value.size > 0
        );

        // Si NO hay archivos, convertimos a objeto plano para que Axios envíe JSON
        // Si HAY archivos, enviamos el formData tal cual (Multipart)
        const dataToSend = hasFiles ? formData : Object.fromEntries(formData.entries());

        if (validate !== undefined) {
            let isValid = true;
            let errorMsg = "La validación ha fallado";

            if (typeof validate === "function") {
                // Caso A: Es una función, la ejecutamos pasando los datos
                const result = validate(dataToSend);
                if (result !== true) {
                    isValid = false;
                    if (typeof result === "string") errorMsg = result;
                }
            } else {
                // Caso B: Es un booleano directo (true/false)
                isValid = validate === "valid";
            }

            if (!isValid) {
                if (onError) onError(new Error(errorMsg));
                return;
            }
        }
        try {
            let response: any;
            // const config = hasFiles ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};

            if(method.toLowerCase() === "post") {
                response = await api.post(url, dataToSend);
            }
            if(method.toLowerCase() === "patch") {
                response = await api.patch(url, dataToSend);
            }

            if (onSuccess) onSuccess(response);
        } catch (error: any) {
            console.error("Error en el formulario:", error);
            if (onError) onError(error);
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