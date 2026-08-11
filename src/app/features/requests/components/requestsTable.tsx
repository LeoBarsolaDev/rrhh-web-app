import { useState } from "react"
import useRequestsTable from "../hooks/useRequestsTable"
import RequestsCard from "./requestCard"
import RequestModal from "./requestModal"
import type { Requests } from "../types/requestsType";

export default function RequestsTable({ selectedTab, searchQuery }: { selectedTab: string, searchQuery: string }) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedRequest, setSelectedRequest] = useState<Requests | null>(null);
    
    const { requests, fetchEmployees } = useRequestsTable();

    const filteredRequests = requests.filter((req) => {
        // 1. Filtro por Pestaña (Tab)
        let matchesTab = true;
        if (selectedTab === "pending") matchesTab = req.status === "Sin revisar";
        if (selectedTab === "reviewed") matchesTab = req.status !== "Sin revisar";
        if (selectedTab === "approved") matchesTab = req.status === "Aprobada";
        if (selectedTab === "rejected") matchesTab = req.status === "Rechazada";

        if (!matchesTab) return false;

        // 2. Filtro por Buscador (SearchBar)
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        // Se busca coincidencia en los campos clave (agregá o quitá propiedades según tu tipo Requests)
        return [
            req.requester_name,
            req.category,
            req.reason,
            req.requester_file_number?.toString(),
            req.id?.toString()
        ].some((field) => field?.toString().toLowerCase().includes(query));
    });

    const handleOpen = (req: Requests) => {
        setSelectedRequest(req);
        setOpenModal(true);
    };

    return (
        <div className="flex flex-col p-4 gap-2">
            {filteredRequests.length !== 0 ? (
                <>
                    {filteredRequests.map((req) => (
                        <RequestsCard
                            key={req.id} // Se agrega la prop key requerida por React
                            request={req}
                            onClick={() => handleOpen(req)}
                        />
                    ))}
                </>
            ) : (
                <h2 className="text-lg font-bold text-placeholder mt-4 text-center">
                    No hay solicitudes que coincidan con la búsqueda
                </h2>
            )}

            <RequestModal 
                open={openModal} 
                setOpen={setOpenModal} 
                request={selectedRequest} 
                fetch={fetchEmployees} 
            />
        </div>
    );
}