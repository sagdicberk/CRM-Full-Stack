import { company } from "../company/company.dto";

export interface customer {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  companyId: number;
}
