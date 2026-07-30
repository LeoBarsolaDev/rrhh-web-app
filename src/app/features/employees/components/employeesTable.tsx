import Table from "../../../shared/components/table";
import SearchBar from "../../../shared/components/searchBar";
import useEmployeeTable from "../hooks/useEmployeeTable"; 
import EmployeeInfoModal from "./employeeInfoModal";
import EmployeeEditModal from "./employeeEditModal";
import { useState } from "react";
import EmployeeStatusModal from "./employeeStatusModal";
import Badge from "../../../shared/components/badge";

interface props {
    selectedEmployeeId: string | number | null;
    setSelectedEmployeeId: React.Dispatch<React.SetStateAction<string | number | null>>;
    infoModalOpen: boolean;
    infoModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editModalOpen: boolean;
    editModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    statusModalOpen: boolean;
    setStatusModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmployeeTable({
    selectedEmployeeId, 
    setSelectedEmployeeId, 
    infoModalOpen, 
    infoModalSetOpen, 
    editModalOpen, 
    editModalSetOpen,
    statusModalOpen, 
    setStatusModalOpen,
} : props){
    const {
        employees = [],
        rows = [],
    } = useEmployeeTable();
    
    const [searchText, setSearchText] = useState<string>("");

    // Buscamos al empleado asegurándonos de convertir todo a string para evitar errores tipo number vs string
    const selectedEmployee = employees.find(emp => {
        if (selectedEmployeeId === null || selectedEmployeeId === undefined) return false;
        const targetId = String(selectedEmployeeId);
        
        return (
            (emp.id !== undefined && String(emp.id) === targetId) ||
            (emp.file_number !== undefined && String(emp.file_number) === targetId) ||
            (emp["# N° LEGAJO"] !== undefined && String(emp["# N° LEGAJO"]) === targetId)
        );
    }) ?? null;

    const STATUS_MAP = {
        'Activo': 'bg-green-200 text-green-800 border-green-200',
        'De baja': 'bg-red-100 text-red-700 border-red-200',
    };

    const renderEmployeeCell = (key: string, value: any) => {
        if (key === "Estado") {
            return (
                <Badge 
                    value={value} 
                    mapping={STATUS_MAP} 
                    className="uppercase"
                />
            );
        }
        
        return value;
    };

    return(
        <div className="w-full flex flex-col gap-4">
            <SearchBar value={searchText} onChange={(val) => setSearchText(val)} />
            
            <Table
                data={rows}
                selectedEmployeeId={selectedEmployeeId}
                renderCell={renderEmployeeCell}
                search={{
                    query: searchText,
                }}
                onRowClick={(row) => {
                    // Extraemos la clave única del elemento seleccionado
                    const rowId = row.id ?? row["# N° LEGAJO"] ?? row.legajo;
                    setSelectedEmployeeId(rowId);
                }}
            />

            <EmployeeInfoModal open={infoModalOpen} setOpen={infoModalSetOpen} employee={selectedEmployee} />
            <EmployeeEditModal open={editModalOpen} setOpen={editModalSetOpen} employee={selectedEmployee} />
            <EmployeeStatusModal open={statusModalOpen} setOpen={setStatusModalOpen} employee={selectedEmployee} />
        </div>
    );
}