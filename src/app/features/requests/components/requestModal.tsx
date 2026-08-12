import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../shared/components/button";
import Modal from "../../../shared/components/modal";
import type { Requests } from "../types/requestsType";
import { RenderRequestModule } from "./requestModules";
import { faCheck, faCheckDouble, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import useRequestModal from "../hooks/useRequestModal";
import { Alert } from "../../../shared/components/alert";

export default function RequestModal({ request, open, setOpen, fetch }: { request: Requests | null, open: boolean, setOpen: (value: boolean) => void; fetch: () => void }) {
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
        { label: "Estado", value: request?.status },
        { label: "Prioridad", value: request?.priority },
        { label: "Razón", value: request?.reason },
    ];

    const {
        openPriority,
        alertOpen,
        alertMessage,
        alertType,
        setOpenPriority,
        handleEditRequest,
        setAlertOpen
    } = useRequestModal(setOpen, fetch);

    return (
        <Modal open={open} setOpen={setOpen} width="md:w-6/10 w-9/10 max-h-[85vh]">
            {/* 1. Wrapper principal con flex-col y altura máxima definida */}
            <div className="flex flex-col h-[80vh] max-h-[85vh] w-full overflow-hidden">
                
                {/* Alert con flex-shrink-0 para que no se aplaste */}
                <div className="flex-shrink-0">
                    <Alert show={alertOpen} onClose={() => { setAlertOpen(false) }} type={alertType}> 
                        {alertMessage} 
                    </Alert>
                </div>

                {/* 2. ÁREA DE CONTENIDO (flex-1 + min-h-0 + overflow-y-auto) */}
                <div className="
                    flex-1 min-h-0 overflow-y-auto overflow-x-hidden w-full py-4 px-1 my-2
                    scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent
                ">
                    {request !== null ? (
                        <div className="flex flex-col gap-4">
                            <div className="bg-secondary py-4 px-2 rounded-2xl">
                                <h4 className="text-primary font-semibold sm:text-3xl text-xl text-center pb-4">
                                    Solicitante
                                </h4>

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

                            <div className="bg-secondary col-span-full rounded-2xl p-4">
                                <RenderRequestModule request={request} />
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <span className="text-center text-foreground text-2xl font-semibold">
                                No se ha logrado cargar la solicitud, por favor reintente más tarde...
                            </span>
                        </div>
                    )}
                </div>

                {/* 3. BOTONES FIJOS ABAJO (flex-shrink-0 / shrink-0) */}
                <div className="shrink  flex gap-2 w-full flex-col md:flex-row">
                    <div className=" py-2 px-4 rounded-2xl w-full flex gap-2 flex-col sm:flex-row">
                        <div className="relative w-full">
                            <div className={`
                                absolute -top-46 z-20
                                bg-accent/90 backdrop-blur-md rounded-lg w-full
                                border-4 border-accent origin-bottom transition-all
                                ${openPriority ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}    
                            `}>
                                <div onClick={() => { handleEditRequest({ req_id: request?.id, priority: "Baja" }, "La prioridad de la Solicitud fue Actualizada.") }} className="w-full rounded-t-lg text-center p-2 hover:bg-accent hover:cursor-pointer hover:tracking-wider"> Baja </div>
                                <div onClick={() => { handleEditRequest({ req_id: request?.id, priority: "Media" }, "La prioridad de la Solicitud fue Actualizada.") }} className="w-full text-center p-2 hover:bg-accent hover:cursor-pointer hover:tracking-wider"> Media </div>
                                <div onClick={() => { handleEditRequest({ req_id: request?.id, priority: "Alta" }, "La prioridad de la Solicitud fue Actualizada.") }} className="w-full text-center p-2 hover:bg-accent hover:cursor-pointer hover:tracking-wider"> Alta </div>
                                <div onClick={() => { handleEditRequest({ req_id: request?.id, priority: "Urgente" }, "La prioridad de la Solicitud fue Actualizada.") }} className="w-full rounded-b-lg text-center p-2 hover:bg-accent hover:cursor-pointer hover:tracking-wider"> Urgente </div>
                            </div>
                            <Button wide rounded color="edit" onClick={() => { setOpenPriority(!openPriority) }}> 
                                <FontAwesomeIcon icon={faPencil} /> Editar Prioridad 
                            </Button>
                        </div>
                        <Button wide rounded color="clean" onClick={() => { handleEditRequest({ req_id: request?.id, status: "En revision" }, "La Solicitud ahora está en revisión") }}> 
                            <FontAwesomeIcon icon={faCheckDouble} /> Revisado 
                        </Button>
                    </div>

                    <div className="py-2 px-4 rounded-2xl w-full flex gap-2 flex-col sm:flex-row">
                        <Button wide rounded color="success" onClick={() => { handleEditRequest({ req_id: request?.id, status: "Aprobada" }, "La Solicitud fue Aprobada") }}> 
                            <FontAwesomeIcon icon={faCheck} /> Aceptar Solicitud 
                        </Button>
                        <Button wide rounded color="danger" onClick={() => { handleEditRequest({ req_id: request?.id, status: "Rechazada" }, "La Solicitud fue Rechazada") }}> 
                            <FontAwesomeIcon icon={faXmark} /> Rechazar Solicitud 
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}