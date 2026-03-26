import { useEffect, useState } from "react";
import type { EmployeeTableType } from "../types/employeeTabletype";
import type { EmployeeType } from "../types/employeeType";
import type { EmployeeResponse } from "../types/employeeResponse";
import { readEmployees } from "../services/getEmployeesService";
import format_employees from "../helpers/format_employees";

export default function useEmployeeTable(){
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [rows, setRows] = useState<EmployeeTableType[]>([]);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response: EmployeeResponse = await readEmployees();
                if (response.success && Array.isArray(response.data)) {
                    setEmployees(response.data);
                    
                    const formatted = format_employees(response.data)
                    setRows(formatted)
            }
            } catch (error) {
                console.error("Error al leer empleados:", error);
            }
        }
        fetchEmployees();
    }, []);

    return{
        employees,
        rows,
        setRows
    }
}