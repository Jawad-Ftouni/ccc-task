export class ExpenseClaimDetail {
    constructor(
      public id: number,
      public date: string,
      public description: string,
      public type: string,
      public total: number
    ) {}
  }
  