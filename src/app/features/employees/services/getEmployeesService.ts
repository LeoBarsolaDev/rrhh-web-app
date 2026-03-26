import { api } from "../../../shared/services/apiClient";
import type { EmployeeResponse } from "../types/employeeResponse";

export const readEmployees = () => api.get<EmployeeResponse>('/rrhh/employees');