import { ShortService } from "core/services/types";

export interface Employee {
  employeeDni: string;
  name: string;
  phone: string;
  address: string;
  salary: number;
  agencyRif: string;
  jobId: number;
  createdAt: string;
}

export interface EmployeeEdit {
  employeeDni: string;
  name: string;
  phone: string;
  address: string;
  salary: number;
  agencyRif: string;
  jobId: number;
  services: ShortService[]
  createdAt: string;
}