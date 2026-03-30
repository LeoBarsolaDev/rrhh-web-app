import { useEffect, useState } from "react";
import type{ RequestResponse, Requests } from "../types/requestsType";
import { read_requests } from "../services/getRequestsService";

export default function useRequestsTable(){
    const [requests, setRequests] = useState<Requests[]>([]);

    useEffect(() => {
            async function fetchEmployees() {
                try {
                    const response: RequestResponse = await read_requests();
                    if (response.success && Array.isArray(response.data)) {
                        setRequests(response.data);
                        
                }
                } catch (error) {
                    console.error("Error al leer Solicitudes:", error);
                }
            }
            fetchEmployees();
        }, []);
    
        return {
            requests
        }
}