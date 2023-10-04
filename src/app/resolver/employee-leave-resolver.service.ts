import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Leave } from '../models/Leave';
import { LeaveService } from '../services/leave.service';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeavesResolver implements Resolve<Leave[]> {

  constructor(private auth: AuthService, private leaveService: LeaveService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Leave[]> {
    // You can access route parameters if needed, e.g., route.params.id
    // Fetch employee leaves using a service method
    let currentEmployee = this.auth.getCurrentEmployee();
    if(currentEmployee){
      this.leaveService.getEmployeeLeaves(currentEmployee.id)
      return this.leaveService.getEmployeeLeaves(currentEmployee.id) // Adjust the method name as per your service
    }else{
      return new Observable<Leave[]>
    }
  }
}
