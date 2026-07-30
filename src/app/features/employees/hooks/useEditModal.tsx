import { useEffect, useState } from "react";
import { api } from "../../../shared/services/apiClient";

export default function useEditModal(){
    const [isSending, setIsSending] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [categories, setCategories] = useState<any>({});

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
    const [isCuilValid, setIsCuilValid] = useState<"not valid" | "valid" | "">("");


    return {
        categories,
        isSending,
        alertOpen,
        message,
        alertType,
        isCuilValid,
        setIsCuilValid,
        setAlertOpen,
    }
}