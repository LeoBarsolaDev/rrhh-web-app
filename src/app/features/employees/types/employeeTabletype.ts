import type { EmployeeType } from "./employeeType";

export interface EmployeeTableType {
  "# N° Legajo": number;
  "N° Documento": string;
  "Nombre completo": string;
  "Rubro": string;
  "Categoria": string;
  "Estado": "Activo" | "Inactivo";
}

export type CreateEmployeeInput = Omit<EmployeeType, 'id' | 'area_name' | 'category_name' | 'department_name'>;