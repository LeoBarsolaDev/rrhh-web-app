import { useState } from "react"
import useRequestsTable from "../hooks/useRequestsTable"
import RequestsCard from "./requestCard"
import RequestModal from "./requestModal"
import type { Requests } from "../types/requestsType";

export default function RequestsTable({selectedTab} : {selectedTab: string}){
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedRequest, setSelectedRequest] = useState<Requests | null>(null);
    const {
        requests
    } = useRequestsTable()
    const filteredRequests = requests.filter(req => {
        if (selectedTab === "all") return true;
        if (selectedTab === "pending") return req.status === "Sin revisar";
        if (selectedTab === "reviewed") return req.status !== "Sin revisar";
        if (selectedTab === "approved") return req.status === "Aprobada";
        if (selectedTab === "rejected") return req.status === "Rechazada";
    });

    console.log("REQUESTAS DFASKFMASD")
    console.log(requests)

    const handleOpen = (req: Requests) => {
        setSelectedRequest(req);
        setOpenModal(true);
    };

    return(
        <div className="flex flex-col p-4 gap-2">
            {filteredRequests.length !== 0 ?
            <>
                {filteredRequests.map((req) => (
                    <RequestsCard
                        request={req}
                        onClick={() => handleOpen(req)}
                    />
                ))}
            </>
            : 
            <h2 className="text-lg font-bold text-placeholder"> No hay Solicitudes Registradas</h2>
            }

            <RequestModal open={openModal} setOpen={setOpenModal} request={selectedRequest} />
        </div>
    )
}