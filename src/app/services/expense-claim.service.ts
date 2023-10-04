import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpenseClaim } from '../models/ExpenseClaim';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ExpenseClaimService {
  
  private apiUrl = 'http://localhost:3000/Employees'; 
  expenseClaimAddedEvent =  new EventEmitter<ExpenseClaim[]>();
  
  constructor(private http: HttpClient) {}

  addExpenseClaimToEmployee(employeeId: number, newExpenseClaim: ExpenseClaim): Observable<Employee> {

    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      switchMap((employee: Employee) => {
        // Push the new expense claim to the employee's expense_claim array
        newExpenseClaim.id = employee.expense_claims.length + 1;
        let total = newExpenseClaim.expense_claim_details.reduce((acc,expense)=>acc + expense.total,0)
        //add total of the expenses datails to the total of the expenseClaim
        newExpenseClaim.total += total;
        employee.expense_claims.push(newExpenseClaim)
        // Send a PUT request to update the employee on database
        return this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, employee);
      })
    );
  }

  getExpenseClaimsForEmployee(employeeId: number): Observable<ExpenseClaim[]> {
    
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      map((employee: Employee) => (employee.expense_claims))
      );
    }
    
  updateExpanseClaimForEmployee(employeeId: number, updatedExpenseClaim: ExpenseClaim): Observable<Employee> {
    
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      switchMap((employee: Employee) => {
        // Find the index of the leave to update based on leave ID
        const expense_claim_Index = employee.leaves.findIndex(expanseClaim => expanseClaim.id === updatedExpenseClaim.id);
    
        if (expense_claim_Index !== -1) {
          // Update the leave at the found index
          employee.expense_claims[expense_claim_Index] = updatedExpenseClaim;
    
          // Send a PUT request to update the employee on the server
          return this.http.put<Employee>(this.apiUrl, employee); // Provide type information here
          } else {
            // Handle error or return the original employee if leave not found
            return of(employee);
          }
        })
      );
    }
    
  deleteExpanseClaimForEmployee(employeeId: number, leaveId: number): Observable<Employee> {
    
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      switchMap((employee: Employee) => {
        // Find the index of the leave to delete based on leave ID
        const leaveIndex = employee.leaves.findIndex(leave => leave.id === leaveId);
    
        if (leaveIndex !== -1) {
          // Remove the leave at the found index
          employee.leaves.splice(leaveIndex, 1);
    
           // Send a PUT request to update the employee on the server
          return this.http.put<Employee>(this.apiUrl, employee);
        } else {
          // Handle error or return the original employee if leave not found
          return of(employee);
        }
      })
    )
  }

  getExpanceClaimForEmployee(id: number,expId: number) : Observable<ExpenseClaim>{

    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      map((employee)=>(employee.expense_claims[expId] || [] ))
    )
  }

  totalExpenseByType(type: string): Observable<number> {
    
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      map((employees: Employee[]) => {
        let total = 0;
        employees.forEach((employee) => {
          employee.expense_claims.forEach((claim) => {
            claim.expense_claim_details.forEach((detail) => {
              if(detail.type === type) {
                total += detail.total;
              }
            });
          });
        });
        return total;
      })
    );
  }

}