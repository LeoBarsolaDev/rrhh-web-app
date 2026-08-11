import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Requests } from "../types/requestsType";
import Badge from "../../../shared/components/badge";

interface props {
    request?: Requests;
    onClick?: () => void;
}

export default function RequestsCard({ request, onClick }: props) {
    const STATUS_MAP = {
        'Sin revisar': 'bg-slate-200 text-slate-800 border-slate-200',
        'En revision': 'bg-blue-100 text-blue-700 border-blue-200',
        'Aprobada': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Rechazada': 'bg-rose-100 text-rose-700 border-rose-200',
    };

    const PRIORITY_MAP = {
        'Urgente': 'bg-red-600 text-white border-transparent',
        'Alta': 'bg-orange-100 text-orange-700 border-orange-200',
        'Media': 'bg-amber-100 text-amber-700 border-amber-200',
        'Baja': 'bg-green-100 text-green-700 border-green-200',
    };

    return (
        <div
            onClick={onClick}
            className="
                flex flex-col sm:flex-row w-full sm:items-center
                gap-2 sm:gap-0
                p-3 sm:p-4
                bg-secondary rounded-2xl
                hover:bg-surface cursor-pointer
            "
        >
            <div className="flex justify-center sm:justify-start text-3xl sm:text-4xl sm:mr-4 group-hover:text-primary relative">
                <FontAwesomeIcon icon={faBell} />
                {request?.status == "Sin revisar" ? <span className="absolute h-2 w-2 bg-red-500 rounded-full"></span> : <></>}
            </div>

            <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-lg sm:text-xl font-bold group-hover:text-primary truncate">
                    {request?.reason}
                </span>

                <span className="text-sm font-light line-clamp-2">
                    {request?.other_explanation || "..."}
                </span>
                <span className="text-sm font-light line-clamp-2">
                    {request?.requester_file_number 
                        ? (<># { String(request.requester_file_number).padStart(4, '0') } </>)
                    : '-'}
                    - {request?.requester_name}
                </span>
            </div>

            <div className="
                flex flex-col sm:items-end
                gap-2 sm:gap-1
                sm:ml-auto
            ">
                <span className="
                    text-xs sm:text-sm mb-2
                    bg-surface px-1 py-0.5 rounded
                    group-hover:font-bold
                    self-start sm:self-auto
                ">
                    {request?.request_date}
                </span>

                <div className="flex flex-wrap gap-2">
                    <Badge 
                        value={request?.status} 
                        mapping={STATUS_MAP} 
                    />

                    <Badge 
                        value={request?.priority} 
                        mapping={PRIORITY_MAP} 
                        className="uppercase"
                    />
                </div>
            </div>
        </div>
    );
}