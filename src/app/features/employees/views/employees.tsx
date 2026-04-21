import Sidebar from "../../../shared/components/sidebar";
import Frame from "../../../shared/components/frame";
import EmployeeTable from "../components/employeesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPencil, faUserPlus, faUserSlash, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../shared/components/button";
import { useState } from "react";

export default function EmployeesPage(){
    const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    return(
        <>
            <Sidebar />
            <div 
                className="
                    xl:ml-52 lg:ml-48 md:ml-40 md:mt-0 ml-0 mt-24 py-8
                    md:min-h-screen min-h-[calc(100dvh-6rem)]  flex justify-center items-center
                "
            >
                <Frame styles="md:w-9/10 w-19/20" rounded>
                    <div className="
                        w-full h-1/10
                        border-b-4 border-separator
                        flex justify-start items-center p-4
                    ">
                        <span className="
                        flex gap-2 items-center 
                        text-2xl text-foreground font-bold 
                        ">
                            <FontAwesomeIcon icon={faUserTie} /> Colaboradores
                        </span>

                        <span className="group relative ml-auto mr-2 w-auto">
                            <a href="/create-employee" className="
                                text-2xl text-foreground
                                group-hover:text-primary
                                transition-all duration-150
                            ">
                                <FontAwesomeIcon icon={faUserPlus} /> 
                            </a>
                            <span className="
                                absolute -top-11 -right-1/2 text-xs font-light text-center
                                opacity-0 group-hover:opacity-100
                                transition-all duration-150
                                bg-black/50 p-1 rounded
                            ">
                                Crear Empleado
                            </span>
                        </span>
                    </div>
                    <div className="p-4">
                        <EmployeeTable 
                            selectedRow={selectedRow} 
                            setSelectedRow={setSelectedRow} 
                            infoModalOpen={infoModalOpen} 
                            infoModalSetOpen={setInfoModalOpen} 
                            editModalOpen={editModalOpen} 
                            editModalSetOpen={setEditModalOpen}
                            statusModalOpen={statusModalOpen} 
                            setStatusModalOpen={setStatusModalOpen}
                        />
                    </div>
                    
                    <div className="
                        w-full h-1/10
                        border-t-4 border-separator
                        flex justify-end items-center flex-wrap
                        p-4 gap-2
                    ">
                        <Button color="info" rounded onClick={() => { setInfoModalOpen(true) }} disabled={selectedRow === null} >
                            <FontAwesomeIcon icon={faCircleInfo} />  Ver mas
                        </Button>

                        <Button color="edit" rounded onClick={() => { setEditModalOpen(true) }} disabled={selectedRow === null}>
                            <FontAwesomeIcon icon={faPencil} />  Editar
                        </Button>

                        <Button color="delete" rounded onClick={() => { setStatusModalOpen(true) }} disabled={selectedRow === null}>
                            <FontAwesomeIcon icon={faUserSlash} />  Editar Baja
                        </Button>
                    </div>
                </Frame>
            </div>
        </>
    )
}