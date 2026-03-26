import { useState } from "react";
import Table from "../../../shared/components/table";
import SearchBar from "../../../shared/components/searchBar";
import useEmployeeTable from "../hooks/useEmployeeTable";
import EmployeeInfoModal from "./employeeInfoModal";

interface props {
    infoModalOpen: boolean;
    infoModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editModalOpen: boolean;
    editModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmployeeTable({infoModalOpen, infoModalSetOpen, editModalOpen, editModalSetOpen} : props){
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const {
        employees,
        rows,
    } = useEmployeeTable();

    return(
        <div className="w-full h-full">
            <SearchBar value={""} onChange={() => {}} />
            <Table
                data={rows}
                selectedRow={selectedRow}
                onRowClick={(row, index) => {
                    setSelectedRow(index);
                }}
            />

            {/* <EmployeeInfoModal open={infoModalOpen} setOpen={infoModalSetOpen} employee={<>holis</>} /> */}
        </div>
    )
}