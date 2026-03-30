import Table from "../../../shared/components/table";
import SearchBar from "../../../shared/components/searchBar";
import useEmployeeTable from "../hooks/useEmployeeTable"; 
import EmployeeInfoModal from "./employeeInfoModal";
import EmployeeEditModal from "./employeeEditModal";

interface props {
    selectedRow: number | null;
    setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
    infoModalOpen: boolean;
    infoModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editModalOpen: boolean;
    editModalSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmployeeTable({selectedRow, setSelectedRow, infoModalOpen, infoModalSetOpen, editModalOpen, editModalSetOpen} : props){
    const {
        employees,
        rows,
    } = useEmployeeTable();

    const selectedEmployee = selectedRow !== null ? employees[selectedRow] : null;

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

            <EmployeeInfoModal open={infoModalOpen} setOpen={infoModalSetOpen} employee={selectedEmployee} />
            <EmployeeEditModal open={editModalOpen} setOpen={editModalSetOpen} employee={selectedEmployee} />
        </div>
    )
}