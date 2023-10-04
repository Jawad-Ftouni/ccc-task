import { Component, OnInit } from '@angular/core';
import { ExpenseClaim } from '../../../models/ExpenseClaim';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ExpenseClaimService } from 'src/app/services/expense-claim.service';

@Component({
  selector: 'app-employee-expenses-claim',
  templateUrl: './employee-expenses-claim.component.html',
  styleUrls: ['./employee-expenses-claim.component.css']
})
export class EmployeeExpensesClaimComponent implements OnInit{

  expenseClaims :ExpenseClaim[]= []
  
  constructor(private route: ActivatedRoute,private router: Router,private expenseService: ExpenseClaimService){}

  ngOnInit(): void {
    this.expenseService.expenseClaimAddedEvent.subscribe((expenses)=>this.expenseClaims = expenses)
    this.route.data.subscribe((data: Data)=>{
      this.expenseClaims = data["expenseClaims"]
    })
  }

  navigateToAddExpense(){
    this.router.navigate(['add-expense'])
  }

  navigateToDetail(expenseClaimId: number) {
    this.router.navigate(['expenses','expense-details', expenseClaimId]);
  }
  
}
