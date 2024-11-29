import { company } from "../company/company.dto";

export interface customerResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  company: company;
  createdAt?: string;
  updatedAt?: string;
}
