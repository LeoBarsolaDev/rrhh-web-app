import type { EmployeeType } from "./employeeType";

export interface EmployeeTableType {
  "# N° Legajo": number;
  "N° Documento": string;
  "Nombre completo": string;
  "Area / Rubro": string;
  "Categoria": string;
  "Tipo": 'admin' | 'worker';
  "Estado": "Activo" | "De baja";
}

export type CreateEmployeeInput = Omit<EmployeeType, 'id' | 'area_name' | 'category_name' | 'department_name'>;