export interface EmployeeType {
    id: number;
    file_number: number;
    type: 'admin' | 'worker';
    full_name: string;
    document_type: number;
    document_type_acronym: string;
    document_type_name: string;
    document_number: number;
    gender: 'Masculino' | 'Femenino' | 'No binario';
    birthday: string; // ISO Date string: "YYYY-MM-DD"
    cuil: number;
    marital_status: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo';
    address: string;
    status: "Activo" | "De baja"
    category: number;
    category_name?: string; // Viene del to_dict con relación
    subcategory: number;
    subcategory_name: string;
    area: number;
    area_name?: string; // Viene del to_dict con relación
    department: number;
    department_name?: string; // Viene del to_dict con relación
    field: number | null;
    field_name: string | null;
    start_date: string;
    legal_start_date: string;
    email: string | null;
    mobile_phone: number;
    landline_phone: number | null;
    separation_date: string | null;
}