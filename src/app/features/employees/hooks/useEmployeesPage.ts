import { useEffect, useState } from "react";
import type { EmployeeType } from "../types/employeeType";
import type { EmployeeResponse } from "../types/employeeResponse";
import { readEmployees } from "../services/getEmployeesService";

export default function useEmployeesPage(){
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<string>("");

    const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<"all" | "admins" | "workers">("all");



    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    
    async function fetchEmployees() {
        try {
            const response: EmployeeResponse = await readEmployees();
            if (response.success && Array.isArray(response.data)) {
                setEmployees(response.data);
        }
        } catch (error) {
            console.error("Error al leer empleados:", error);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    function handleInfo(employee: EmployeeType){
        setSelectedEmployee(employee);
        setInfoModalOpen(true);
    }

    function handleEdit(employee: EmployeeType){
        setSelectedEmployee(employee);
        setEditModalOpen(true)
    }

    function onEditSuccess(){
        setAlertOpen(true);
        setAlertMessage("Empleado actualizado con exito.");
        setAlertType("success");
        setEditModalOpen(false);
        
        fetchEmployees();
    }

    function onError(err: any) {
        const serverError = err?.details?.error || err?.details;

        const message = serverError?.message || err?.message || "Ocurrió un error inesperado";
        
        const validationFields = serverError?.details;
        if (validationFields) {
            console.log("Errores de validación por campo:", validationFields);
        }

        setAlertMessage(message);
        setAlertType("error");
        setAlertOpen(true);
    }


    return {
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
        onError,

        selectedTab,
        setSelectedTab
    }
}