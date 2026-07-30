import Sidebar from "../../../shared/components/sidebar";
import Frame from "../../../shared/components/frame";
import EmployeeTable from "../components/employeesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPencil, faUserPlus, faUserSlash, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../shared/components/button";
import { useState } from "react";
import useEmployeesPage from "../hooks/useEmployeesPage";
import EmployeeCard from "../components/employeeCard";
import SearchBar from "../../../shared/components/searchBar";
import EmployeeInfoModal from "../components/employeeInfoModal";
import EmployeeEditModal from "../components/employeeEditModal";
import { Alert } from "../../../shared/components/alert";

export default function EmployeesPage(){
    const {
        alertOpen,
        alertMessage,
        alertType,
        setAlertOpen,

        employees,
        fetchEmployees,
        selectedEmployee,
        setSelectedEmployee,

        searchQuery,
        setSearchQuery,

        infoModalOpen,
        setInfoModalOpen,
        editModalOpen,
        setEditModalOpen,

        handleInfo,
        handleEdit,

        onEditSuccess,
        onError
    } = useEmployeesPage()

    const filteredEmployees = employees.filter((emp: any) => {
        const searchQueryLower = searchQuery.toLowerCase();
        if (!searchQueryLower.trim()) return true;

        return Object.values(emp).some((value) =>
            value != null && String(value).toLowerCase().includes(searchQueryLower)
        );
    });


    return(
        <>
            <Alert
                show={alertOpen}
                type={alertType === "success" ? "success" : "error"}
                onClose={() => setAlertOpen(false)}
            >
                {alertMessage}
            </Alert>
            <Sidebar />
            <div 
                className="
                    xl:ml-52 lg:ml-48 md:ml-40 md:mt-0 ml-0 mt-24 py-8
                    md:h-screen h-[calc(100dvh-6rem)] flex justify-center items-center
                "
            >
                <Frame styles="w-19/20 h-[85vh] flex flex-col overflow-hidden" rounded>
                    
                    <div className="
                        w-full shrink-0
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

                    <div className="p-4 flex-1 min-h-0 overflow-y-auto">
                        <div className="mb-4">
                            <SearchBar value={searchQuery} onChange={(val) => setSearchQuery(val)} />
                        </div>                            
                        {filteredEmployees.length > 0 ? (
                            <div className="flex flex-wrap gap-2 w-full">
                                {filteredEmployees.map((emp: any, index: number) => (
                                    <EmployeeCard employee={emp} handleEdit={handleEdit} handleInfo={handleInfo}/>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-placeholder gap-2 py-8">
                                <FontAwesomeIcon icon={faUserTie} className="text-4xl text-surface" />
                                <p className="text-sm text-center">
                                    {searchQuery 
                                        ? "No se encontraron imágenes que coincidan con la búsqueda" 
                                        : "No hay imágenes guardadas todavía"}
                                </p>
                            </div>
                        )}
                    </div>
                </Frame>
                <EmployeeInfoModal open={infoModalOpen} setOpen={setInfoModalOpen} employee={selectedEmployee} />
                <EmployeeEditModal open={editModalOpen} setOpen={setEditModalOpen} employee={selectedEmployee} onSuccess={onEditSuccess} onError={onError} />
            </div>
        </>
    )
}