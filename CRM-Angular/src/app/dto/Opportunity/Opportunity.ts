import { customer } from "../customer/customer";
import { customerResponse } from "../customer/customer.response";

export interface Opportunity {
  id: number;
  name: string;
  value: number;
  status: string;
  expectedCloseDate: string;
  customer: customerResponse;
  createdAt: string;
  updatedAt: string;
}
