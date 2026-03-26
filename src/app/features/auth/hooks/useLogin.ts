import { useState } from "react";
import { setAuthData } from "../../../shared/services/authService"
import { useNavigate } from "react-router-dom";

export default function useLogin(){
    const [message, setMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<string>("");
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const navigate = useNavigate()

    function onSuccess(data: any){
        setAuthData(data.access_token, data.roles, data.user_id);
        navigate("/employees")
    }

    function onError(err: any) {
        const message = err?.error?.message || "Ocurrió un error inesperado";
        
        setMessage(message);
        setAlertType("error");
        setAlertOpen(true);
    }

    return {
        message,
        alertType,
        alertOpen,
        onSuccess,
        setAlertOpen,
        onError
    }
}