import { useState } from "react";
import { api } from "../../../shared/services/apiClient";

export default function useRequestModal(){
    const [openPriority, setOpenPriority] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<string>("");

    async function handleEditRequest(data: any, message: string){
        try {
            let response: any;

            response = await api.patch("/rrhh/requests", data);


            setAlertOpen(true);
            setOpenPriority(false);
            setAlertType("success")
            setAlertMessage(message);

            setTimeout(() => {window.location.reload();}, 1500);
        } catch (error: any) {
            console.error("Error:", error);
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

            setAlertMessage(finalMessage);
            setAlertOpen(true);
            setAlertType("error");
        }
    }

    return {
        openPriority,
        alertOpen,
        alertMessage,
        alertType,
        setOpenPriority,
        handleEditRequest,
        setAlertOpen
    }
}