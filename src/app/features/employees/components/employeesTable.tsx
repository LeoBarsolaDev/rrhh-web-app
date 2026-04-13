import Table from "../../../shared/components/table";
import SearchBar from "../../../shared/components/searchBar";
import useEmployeeTable from "../hooks/useEmployeeTable"; 
import EmployeeInfoModal from "./employeeInfoModal";
import EmployeeEditModal from "./employeeEditModal";
import { useState } from "react";
import EmployeeStatusModal from "./employeeStatusModal";
import Badge from "../../../shared/components/badge";

interface props {
    selectedRow: number | null;
    setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
    infoModalOpen: boolean;
    infoModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editModalOpen: boolean;
    editModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    statusModalOpen: boolean;
    setStatusModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmployeeTable({
    selectedRow, 
    setSelectedRow, 
    infoModalOpen, 
    infoModalSetOpen, 
    editModalOpen, 
    editModalSetOpen,
    statusModalOpen, 
    setStatusModalOpen,
} : props){
    const {
        employees,
        rows,
    } = useEmployeeTable();
    
    const [searchText, setSearchText] = useState<string>("")
    const selectedEmployee = selectedRow !== null ? employees[selectedRow] : null;
    const STATUS_MAP = {
        'Activo': 'bg-green-200 text-green-800 border-green-200',
        'De baja': 'bg-red-100 text-red-700 border-red-200',
    };

    const renderEmployeeCell = (key: string, value: any) => {
        if (key === "Estado") {
            const isActive = value === "Activo";
            return (
                <Badge 
                    value={value} 
                    mapping={STATUS_MAP} 
                    className="uppercase"
                />
            );
        }
        
        // Si no es la columna Estado, dejamos que la tabla renderice el valor normal
        return value;
    };

    return(
        <div className="w-full h-full">
            <SearchBar value={searchText} onChange={(val) => setSearchText(val)} />
            <Table
                data={rows}
                selectedRow={selectedRow}
                renderCell={renderEmployeeCell}
                search={{
                    query: searchText,
                    // columns: ["# N° LEGAJO", "NOMBRE COMPLETO"]
                }}
                onRowClick={(row, index) => {
                    setSelectedRow(index);
                }}
            />

            <EmployeeInfoModal open={infoModalOpen} setOpen={infoModalSetOpen} employee={selectedEmployee} />
            <EmployeeEditModal open={editModalOpen} setOpen={editModalSetOpen} employee={selectedEmployee} />
            <EmployeeStatusModal open={statusModalOpen} setOpen={setStatusModalOpen} employee={selectedEmployee} />
        </div>
    )
}