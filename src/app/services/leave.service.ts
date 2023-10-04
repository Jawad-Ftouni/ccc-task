import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, map, observable, of, pipe, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Leave } from '../models/Leave';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  
  private apiUrl = 'http://localhost:3000/Employees';
  private newLeaveAdded = new EventEmitter<Leave[]>(); // Create an EventEmitter for adding new leaves
  
  constructor(private http: HttpClient) {}  

  getEmployeeLeaves(employeeId: number): Observable<Leave[]> {

    // Make an HTTP GET request to fetch the employee's data
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      map((employee: Employee) => employee.leaves || []) // Ensure that 'leaves' is not null
    );
  }

  filterLeavesByDateRange(info: {leaves: Leave[], fromDateFilter?: string, toDateFilter: string} | {leaves: Leave[], fromDateFilter: string, toDateFilter?: string} ): Leave[] {
    //this function used to check where the employee is off (leaved)
  
    if (!info.fromDateFilter && !info.toDateFilter) {
      // If neither fromDate nor toDate is entered, return the employee with all leaves
      return info.leaves;
    }
  
    if(info.leaves){
      
      return info.leaves.filter((leave: Leave) => {
        const leaveStartDate = new Date(leave.from);
        const leaveEndDate = new Date(leave.to);
  
        const filterFromDate = info.fromDateFilter ? new Date(info.fromDateFilter): undefined;
        const filterToDate = info.toDateFilter ? new Date(info.toDateFilter) : undefined;
        
        if(filterFromDate && filterToDate)  return (
          (//check if the employee (start date) in the range of filter (from,to)
            leaveStartDate.getTime() <= filterToDate.getTime() &&
            leaveStartDate.getTime() >= filterFromDate.getTime()
          ) ||
          (// or check if the employee (End Date) in the range of filter(from,to) in opposite of start date 
            leaveEndDate.getTime() <= filterToDate.getTime() &&
            leaveEndDate.getTime() >= filterFromDate.getTime()
          ) ||
          (// or check if the employee (start date) less than (from) and (end date) greater than (to) 
            leaveStartDate.getTime() <= filterFromDate.getTime() &&
            leaveEndDate.getTime() >= filterToDate.getTime()
          )
        );
  
        if(filterFromDate)  return (
          leaveEndDate.getTime() >= filterFromDate.getTime()
        );
  
        if(filterToDate)  return (
          leaveStartDate.getTime() <= filterToDate.getTime()
        );
        return false
      }); 
    }
    return info.leaves;
  }
 
  addLeaveForEmployee(employeeId: number, newLeave: Leave): Observable<Employee> {

    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      switchMap((employee: Employee) => {
        // Add the new leave to the employee's leaves array
        newLeave.id = employee.leaves.length+1;
        employee.leaves.push(newLeave);

        // Send a PUT request to update the employee on the server
        return this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, employee);
      })
    );
  }

  updateLeaveForEmployee(employeeId: number, updatedLeave: Leave): Observable<Employee> {

    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      switchMap((employee: Employee) => {
        // Find the index of the leave to update based on leave ID
        const leaveIndex = employee.leaves.findIndex(leave => leave.id === updatedLeave.id);

        if(leaveIndex !== -1) {
          // Update the leave at the found index
          employee.leaves[leaveIndex] = updatedLeave;

          // Send a PUT request to update the employee on the server
          return this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, employee);
           // Provide type information here
        } else {
          // Handle error or return the original employee if leave not found
          return of(employee);
        }
      })
    )
  }

  deleteLeaveForEmployee(employeeId: number, leaveId: number): Observable<Employee> {

    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`).pipe(
      switchMap((employee: Employee) => {
       // Find the index of the leave to delete based on leave ID
       const leaveIndex = employee.leaves.findIndex(leave => leave.id === leaveId);

        if (leaveIndex !== -1){
          // Remove the leave at the found index
          employee.leaves.splice(leaveIndex, 1);

          // Send a PUT request to update the employee on the server
          return this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, employee); // Provide type information here
        } else {
          // Handle error or return the original employee if leave not found
          return of(employee);
        }
      })
    )
  }

  emitNewLeaveAdded(leave: Leave[]){
    this.newLeaveAdded.emit(leave);
  }

  getNewLeaveEmitter(): EventEmitter<Leave[]> {
    return this.newLeaveAdded;
  }

  totalLeaveByType(type: string): Observable<number>{
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      map((employees: Employee[])=>{
        let total = 0;
        employees.forEach((employee: Employee)=>{
          employee.leaves.forEach((leave: Leave)=>{
            if(leave.leave_type_name === type){
              total++;
            }  
          })
        })
        return total;
      })
    )
  }

}
