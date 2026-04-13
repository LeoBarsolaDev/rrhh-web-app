import { useState } from "react"
import useRequestsTable from "../hooks/useRequestsTable"
import RequestsCard from "./requestCard"
import RequestModal from "./requestModal"
import type { Requests } from "../types/requestsType";

export default function RequestsTable(){
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedRequest, setSelectedRequest] = useState<Requests | null>(null);
    const {
        requests
    } = useRequestsTable()

    console.log("REQUESTAS DFASKFMASD")
    console.log(requests)

    const handleOpen = (req: Requests) => {
        setSelectedRequest(req);
        setOpenModal(true);
    };

    return(
        <div className="flex flex-col p-4 gap-2">
            {requests.length !== 0 ?
            <>
                {requests.map((req) => (
                    <span key={req.id}>
                        <RequestsCard 
                            request={req}
                            onClick={() => handleOpen(req)}
                        />
                    </span>
                ))}
            </>
            : 
            <h2 className="text-lg font-bold text-placeholder"> No hay Solicitudes Registradas</h2>
            }

            <RequestModal open={openModal} setOpen={setOpenModal} request={selectedRequest} />
        </div>
    )
}