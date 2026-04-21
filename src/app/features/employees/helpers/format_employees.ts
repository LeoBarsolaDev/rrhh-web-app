import type { EmployeeTableType } from "../types/employeeTabletype";
import type { EmployeeType } from "../types/employeeType";

export default function format_employees (employees: EmployeeType[]): EmployeeTableType[] {
    return employees.map((emp) => ({
        "# N° Legajo": emp.file_number,
        "N° Documento": emp.document_number.toString(),
        "Nombre completo": emp.full_name,
        "Area / Rubro": (emp.area_name || emp.field_name) || "No registrado",
        "Categoria": emp.category_name || "Sin Categoría",
        "Tipo": emp.type,
        "Estado": emp.status,
    }));
};