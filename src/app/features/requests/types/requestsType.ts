// 1. Definimos los tipos literales basados en tus Enums de Python
export type RequestStatus = 'Sin revisar' | 'En revision' | 'Rechazada' | 'Aprobada';
export type RequestPriority = 'Sin asignar' | 'Baja' | 'Media' | 'Alta' | 'Urgente';

// 2. Interfaz principal del objeto de solicitud
export interface Requests {
  id: number;
  employee_id: number;
  request_date: string; // ISO DateTime string
  phone: number | string; // Note: Tu JSON muestra números, pero tu modelo decía String
  category: string | null;
  reason: string | null;
  amount: number | null;
  init_date: string | null; // ISO Date string
  end_date: string | null;   // ISO Date string
  optional_hours: string | null; // Format "HH:mm:ss"
  diagnosis: string | null;
  requested_days: number | null;
  status: RequestStatus;
  priority: RequestPriority;
  other_explanation: string | null;
  attached_file: string | null;
  requester_document: number | null;
  requester_file_number: string | null;
  requester_name: string | null;
  requester_type: string | null;
}

// 3. Interfaz para la respuesta completa de la API
export interface RequestResponse {
  success: boolean;
  count: number;
  data: Requests[];
}