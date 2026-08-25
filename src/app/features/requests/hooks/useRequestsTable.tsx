import { useEffect, useState } from "react";
import type { RequestResponse, Requests } from "../types/requestsType";
import { read_requests } from "../services/getRequestsService";

export default function useRequestsTable() {
    const [requests, setRequests] = useState<Requests[]>([]);

    async function fetchEmployees() {
        try {
            const response: RequestResponse = await read_requests();
            if (response.success && Array.isArray(response.data)) {
                const sortedRequests = [...response.data].sort((a, b) => {
                    // Si request_date es un string tipo "12-08-2026", convertimos DD-MM-YYYY a YYYY-MM-DD para parsear correctamente
                    const parseDate = (dateStr?: string) => {
                        if (!dateStr) return 0;
                        if (dateStr.includes("-") && dateStr.split("-")[0].length === 2) {
                            const [day, month, year] = dateStr.split("-");
                            return new Date(`${year}-${month}-${day}`).getTime();
                        }
                        return new Date(dateStr).getTime();
                    };

                    const dateA = parseDate(a.request_date);
                    const dateB = parseDate(b.request_date);

                    // Si las fechas son válidas y distintas, ordena por fecha (mayor a menor)
                    if (dateA && dateB && dateA !== dateB) {
                        return dateB - dateA;
                    }

                    // Si tienen la misma fecha o falla la fecha, ordena por ID (mayor a menor)
                    return (b.id ?? 0) - (a.id ?? 0);
                });

                setRequests(sortedRequests);
            }
        } catch (error) {
            console.error("Error al leer Solicitudes:", error);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return {
        requests,
        fetchEmployees
    };
}