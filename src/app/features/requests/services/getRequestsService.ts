import { api } from "../../../shared/services/apiClient";
import type { RequestResponse } from "../types/requestsType";

export const read_requests = () => api.get<RequestResponse>('/rrhh/requests');