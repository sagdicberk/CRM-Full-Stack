import { employees } from "../employee/employee";
import { Opportunity } from "../Opportunity/Opportunity";

export interface TaskResponse {
  id: number;

  title: string;

  description: string;

  user: employees;

  opportunity: Opportunity;

  type: string;

  status: string;

  dateOfMeeting: string;
}




