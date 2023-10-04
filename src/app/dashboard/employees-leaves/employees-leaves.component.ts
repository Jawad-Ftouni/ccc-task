import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-employees-leaves',
  templateUrl: './employees-leaves.component.html',
  styleUrls: ['./employees-leaves.component.css']
})
export class EmployeesLeavesComponent implements OnInit {
  
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  fromDateFilter: string = ''
  toDateFilter: string = ''
  dateError: boolean = false;

  constructor(private employeeService: EmployeeService,private route:ActivatedRoute){}

  ngOnInit() {
    this.employeeService.getEmployeesWithLeaves().subscribe((employees: Employee[])=>{
      this.employees = employees;
      this.filteredEmployees = employees
    })
  }

  filterByDate() {
    const fromDate = new Date(this.fromDateFilter);
    const toDate = new Date(this.toDateFilter);

     // Check if the "To" date is less than the "From" date
     if (toDate < fromDate) {
      this.dateError = true; // Set dateError to true to display the error message
      this.filteredEmployees = this.employees
      return; // Prevent further processing
     }
     this.dateError = false;
     this.filteredEmployees = this.employeeService.filterEmployeeLeavesByDateRange({ employees: this.employees, fromDateFilter: this.fromDateFilter, toDateFilter: this.toDateFilter})
  }  
}
