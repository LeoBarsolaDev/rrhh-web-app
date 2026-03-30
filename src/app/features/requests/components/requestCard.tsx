import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Requests } from "../types/requestsType";
import Badge from "../../../shared/components/badge";

interface props {
    request?: Requests;
}

export default function RequestsCard({request} : props){
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

    return(
        <div className="
            flex w-full h-24 justify-ceter items-center group
            bg-secondary rounded-2xl
            hover:bg-surface
        ">
            <span className="text-4xl px-4 w-1/10 group-hover:text-primary">
                <FontAwesomeIcon icon={faBell} />
            </span>

            <div className="flex flex-col w-5/10 overflow-hidden">
                <span className="text-xl font-bold group-hover:text-primary">
                    {request?.reason}
                </span>

                <span className="text-sm font-light">
                    {request?.other_explanation}
                </span>
            </div>

            <div className="
                flex flex-col h-full items-end justify-start
                ml-auto py-2 px-1.5
            ">
                <span className="
                    text-foreground text-sm
                    bg-surface px-2 py-1 rounded-lg
                    group-hover:font-bold
                ">
                    {request?.request_date}
                </span>
                
                <div className="flex mt-auto gap-1">
                    <Badge 
                        value={request?.status} 
                        mapping={STATUS_MAP} 
                    />

                    <Badge 
                        value={request?.priority} 
                        mapping={PRIORITY_MAP} 
                        className="uppercase" // Puedes pasarle clases extra
                    />
                </div>
            </div>
        </div>
    )
}