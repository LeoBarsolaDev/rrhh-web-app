import { useState } from "react";

export default function useCreateEmployeeForm(){
    const [isSending, setIsSending] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    function onSuccess(){
        setIsSending(true);
        setAlertOpen(false);
        setAlertType("success")
        setMessage("Solicitud Enviada");
        // setTimeout(() => {window.location.reload();}, 1000);
    }

    function onError(error: any) {
        console.log("ERROR ORIGINAL:", error);

        if (error && typeof error === 'object') {
            const detailMsg = error.details 
                ? JSON.stringify(error.details) 
                : (error.message || "Error en la petición");
            setMessage(detailMsg);
        } else {
            setMessage(String(error.message));
        }

        setAlertOpen(true);
        setAlertType("error");
    }

    return {
        isSending,
        alertOpen,
        message,
        alertType,
        setAlertOpen,
        onSuccess,
        onError,
    }
}