import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { Observable, filter, map } from 'rxjs';
import { LeaveService } from './leave.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

private url = 'http://localhost:3000/Employees'
newEmployeeAdded = new EventEmitter<Employee[]>;

constructor(private http: HttpClient ,private leaveService: LeaveService) {}

getEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url)
}

getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
}
  
addEmployee(employee: Employee): Observable<Employee> {
  employee.expense_claims = [];
  employee.leaves = [];
  return this.http.post<Employee>(`${this.url}`, employee);
}

updateEmployee(id: number, employee: Employee): Observable<Employee> {
  return this.http.put<Employee>(`${this.url}/${id}`, employee);
}

deleteEmployee(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}

filterEmployeeLeavesByDateRange(info: { employees: Employee[], fromDateFilter?: string, toDateFilter: string } | { employees: Employee[], fromDateFilter: string, toDateFilter?: string }): Employee[] {
  
  if (!info.fromDateFilter && !info.toDateFilter) {
    // If neither fromDate nor toDate is entered, return all employees with their leaves
    return info.employees;
  }

  if (info.employees) {
    return info.employees.filter((employee: Employee) => {
      // Filter the leaves for each employee and update their 'leaves' property
      const fromDateFilter = info.fromDateFilter || ''; // Use an empty string as a default value
      const toDateFilter = info.toDateFilter || ''; // Use an empty string as a default value
      
      const filteredLeaves = this.leaveService.filterLeavesByDateRange({ leaves: employee.leaves, fromDateFilter, toDateFilter });
      
      // Return a new Employee object with the filtered leaves
      if(filteredLeaves.length > 0) {
        employee.leaves = filteredLeaves
        return true
      }
      return false;
    });
  }  
  // Return an empty array if employees are not provided
  return [];
}

  getEmployeesWithLeaves(): Observable<Employee[]>{
   return this.getEmployees().pipe(
    map((employees: Employee[])=>{
      return employees.filter((employee: Employee)=>( employee.leaves.length > 0 ))
    })
   )
  }
  
  getEmployeesWithExpenses(): Observable<Employee[]>{
    return this.getEmployees().pipe(
     map((employees: Employee[])=>{
       return employees.filter((employee: Employee)=>( employee.expense_claims.length > 0 ))
     })
    )
   }

}