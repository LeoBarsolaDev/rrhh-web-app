import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../shared/components/button";
import Modal from "../../../shared/components/modal";
import type { Requests } from "../types/requestsType";
import { RenderRequestModule, RequestAdvancesLoans, RequestGeneralInquiry, RequestLeavesOfAbsence, RequestPermits, RequestSickness } from "./requestModules";
import { faCheck, faCheckDouble, faCross, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function RequestModal({request, open, setOpen} : {request:Requests | null, open:boolean, setOpen: (value: boolean) => void;}){
    const InfoField = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
        <span className="flex sm:flex-row flex-col md:items-center md:justify-center sm:gap-4 text-lg">
            <b className="text-primary">{label}:</b>
            <span className="text-foreground/90">{value || "N/A"}</span>
        </span>
    );
    const personalInfo = [
        { label: "Nombre", value: request?.requester_name },
        { label: "# N° Legajo", value: request?.requester_file_number },
        { label: "Documento", value: request?.requester_document },
        { label: "Tipo de empleado", value: request?.requester_type },
    ];

    const requestInfo = [
        { label: "Teléfono", value: request?.phone },
        { label: "Estado", value: request?.status }, // Corregido de .phone a .status
        { label: "Prioridad", value: request?.priority },
        { label: "Razón", value: request?.reason },
    ];
    return(
        <Modal open={open} setOpen={setOpen} >
            <div className="
                w-full py-2 px-0 flex flex-col gap-0 h-full
                /* Configuración de Scroll */
                overflow-y-auto overflow-x-hidden
                /* Estilización del Scrollbar (Chrome, Safari, Edge) */
                scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-primary/20
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-primary/50
            ">
                {request !== null ? (
                    <div className="flex flex-col gap-2">
                        <div className="bg-secondary py-2 rounded-2xl">
                            {request && (
                                <div className="bg-secondary py-4 rounded-2xl">
                                    <h4 className="text-primary font-semibold sm:text-3xl text-xl text-center pb-4">Solicitante</h4>
                                    
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex flex-col text-sm md:text-md items-center sm:items-start text-center sm:text-left px-4">
                                        {personalInfo.map((item, index) => (
                                            <InfoField key={index} label={item.label} value={item.value} />
                                        ))}
                                        </div>

                                        <div className="w-full h-1 bg-frame md:hidden my-2 opacity-30" />

                                        <div className="flex flex-col text-sm md:text-md items-center sm:items-start md:items-end text-center sm:text-start md:text-right px-4">
                                        {requestInfo.map((item, index) => (
                                            <InfoField key={index} label={item.label} value={item.value} />
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="bg-secondary col-span-full rounded-2xl p-4">
                            <RenderRequestModule request={request} />
                        </div>
                    </div>
                ) : ( 
                    <span className="text-center text-foreground text-2xl font-semibold">
                        No se ha logrado cargar la solicitud, por favor reintente mas tarde...
                    </span>
                )}

                <div className="flex gap-2 w-full flex-col md:flex-row">
                    <div className="bg-secondary py-2 px-4 rounded-2xl mt-2 w-full flex gap-2 flex-col sm:flex-row">
                        <Button wide rounded color="edit"> <FontAwesomeIcon icon={faPencil} /> Editar Prioridad </Button> 
                        <Button wide rounded color="clean"> <FontAwesomeIcon icon={faCheckDouble} /> Revisado </Button> 
                    </div>

                    <div className="bg-secondary py-2 px-4 rounded-2xl mt-2 w-full flex gap-2 flex-col sm:flex-row">
                        <Button wide rounded color="done"> <FontAwesomeIcon icon={faCheck} /> Aceptar Solicitud </Button> 
                        <Button wide rounded color="delete"> <FontAwesomeIcon icon={faXmark} /> Rechazar Solicitud </Button> 
                    </div>
                </div>
            </div>
        </Modal>
    )
}