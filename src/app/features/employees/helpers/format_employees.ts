import type { EmployeeTableType } from "../types/employeeTabletype";
import type { EmployeeType } from "../types/employeeType";

export default function format_employees (employees: EmployeeType[]): EmployeeTableType[] {
    return employees.map((emp) => ({
        "# N° Legajo": emp.file_number,
        "N° Documento": emp.document_number.toString(),
        "Nombre completo": emp.full_name,
        "Rubro": emp.area_name || "Sin Área",
        "Categoria": emp.category_name || "Sin Categoría",
        "Estado": emp.separation_date ? "Inactivo" : "Activo",
    }));
};