import type { EmployeeType } from "./employeeType";

export interface EmployeeResponse {
    count: number;
    data: EmployeeType[];
    success: boolean;
};