import Modal from "../../../shared/components/modal";
import type { Requests } from "../types/requestsType";

export default function RequestModal({request, open, setOpen} : {request:Requests, open:boolean, setOpen: (value: boolean) => void;}){
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
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-secondary py-2 px-4">
                            <h4 className="text-primary font-semibold text-xl text-center pb-2">Solicitante</h4>
                            <span className="">
                                <b>Nombre: </b> {request?.requester_name} <br />
                                <b># N° Legajo: </b> {request?.requester_file_number} <br />
                                <b>Numero de documento: </b> {request?.requester_document} <br />
                                <b>Tipo de empleado: </b> {request?.requester_type} <br />
                                <b>Teléfono: </b> {request?.phone} <br />
                            </span>
                        </div>

                        <div className="bg-secondary p-1">
                            <h4 className="text-primary font-semibold text-xl text-center">Informacion de Contácto</h4>
                        </div>

                        <div className="bg-secondary p-1 col-span-full">
                            <h4 className="text-primary font-semibold text-xl text-center">Informacion Especifica</h4>
                        </div>
                    </div>
                ) : ( 
                    <span className="text-center text-foreground text-2xl font-semibold">
                        No se ha logrado cargar la solicitud, por favor reintente mas tarde...
                    </span>
                )}
            </div>
        </Modal>
    )
}