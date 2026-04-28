import { useEffect, useState } from "react";
import { api } from "../../../shared/services/apiClient";

export default function useCreateEmployeeForm(){
    const [isSending, setIsSending] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [categories, setCategories] = useState<any>({});
    const [isCuilValid, setIsCuilValid] = useState<"not valid" | "valid" | "">("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                
                const response = await api.get<any>('/rrhh/employees/categories');
                console.log("Respuesta completa:", response);

                if (response && response.categories) {
                    setCategories(response.categories);
                } else {
                    console.error("No se encontró la propiedad 'categories' en la respuesta");
                }

            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        fetchCategories();
    }, []);

    function onSuccess(){
        setIsSending(true);
        setAlertOpen(true);
        setAlertType("success")
        setMessage("Empleado creado con exito.");

        setTimeout(() => {window.location.reload();}, 2500);
    }

    const onError = (error: any) => {
        console.error("ERROR CAPTURADO DETALLADO:", error.data);

        let finalMessage = "Error de validación";

        if (error.data && error.data.error) {
            const errObj = error.data.error;
            
            // Si hay detalles técnicos (ej: campos faltantes), los mapeamos a un string legible
            if (errObj.details) {
                const fields = Object.keys(errObj.details);
                const detailMessages = fields.map(field => {
                    const msg = errObj.details[field];
                    return `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`;
                });
                finalMessage = `${errObj.message}: ${detailMessages.join(' | ')}`;
            } else {
                finalMessage = errObj.message || "Datos inválidos";
            }
        }

        setMessage(finalMessage);
        setAlertOpen(true);
        setAlertType("error");
        setIsSending(false);
    };

    return {
        categories,
        isSending,
        alertOpen,
        message,
        alertType,
        isCuilValid,
        setIsCuilValid,
        setAlertOpen,
        onSuccess,
        onError,
    }
}