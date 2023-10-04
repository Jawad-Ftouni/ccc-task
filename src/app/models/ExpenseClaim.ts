import { ExpenseClaimDetail } from "./ExpenseClaimDetail";

export class ExpenseClaim {
    constructor(
      public id: number,
      public date: string,
      public description: string,
      public total: number,
      public status: string,
      public expense_claim_details: ExpenseClaimDetail[]
    ) {}
  }