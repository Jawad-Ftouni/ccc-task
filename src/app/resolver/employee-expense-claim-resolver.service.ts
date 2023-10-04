import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Leave } from '../models/Leave';
import { LeaveService } from '../services/leave.service';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/Employee';
import { ExpenseClaimService } from '../services/expense-claim.service';
import { ExpenseClaim } from '../models/ExpenseClaim';

@Injectable({
  providedIn: 'root'
})
export class EmployeeExpenseClaimResolver implements Resolve<ExpenseClaim[]> {

  constructor(private auth:AuthService,private expenseClaimService: ExpenseClaimService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExpenseClaim[]> {
    // You can access route parameters if needed, e.g., route.params.id
    // Fetch employee leaves using a service method
    let currentEmployee = this.auth.getCurrentEmployee();
    if(currentEmployee){
      return this.expenseClaimService.getExpenseClaimsForEmployee(currentEmployee.id) // Adjust the method name as per your service
    } else {
      return new Observable<ExpenseClaim[]>
    }
  }
}
