import { ExpenseClaim } from "./ExpenseClaim";
import { LeaveType } from "./LeaveType";

export class Leave {
    constructor(
      public id: number,
      public leave_type_name: string,
      public from: string,
      public to: string,
      public number_of_days: number,
      public note: string,
      
    ) {}
  }