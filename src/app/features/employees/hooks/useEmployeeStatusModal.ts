import { useState } from "react";
import { api } from "../../../shared/services/apiClient";

export default function useEmployeeStatusModal(employee: any){
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<string>("");
    
    async function handleAccept(){
        try {
            let response: any;

            response = await api.patch("/rrhh/employees", {
                emp_id: employee.id,
                status: employee.status === "Activo" ? "De baja" : "Activo"
            });


            setAlertOpen(true);
            setAlertType("success")
            setAlertMessage("El Empleado fué Actualizado.");

            setTimeout(() => {window.location.reload();}, 2500);
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
        alertOpen,
        alertMessage,
        alertType,
        setAlertOpen,
        handleAccept
    }
}