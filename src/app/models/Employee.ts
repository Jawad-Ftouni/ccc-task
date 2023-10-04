import { ExpenseClaim } from "./ExpenseClaim";
import { Leave } from "./Leave";

export class Employee {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public password: string,
      public address: string,
      public department_id: number,
      public role: string,
      public leaves: Leave[],
      public expense_claims: ExpenseClaim[]
    ) {}
  }