import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { ActivatedRoute, Data } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-claims',
  templateUrl: './employees-claims.component.html',
  styleUrls: ['./employees-claims.component.css']
})
export class EmployeesClaimsComponent implements OnInit{
  employees !:Employee[];

  constructor(private route: ActivatedRoute ,private employeeService: EmployeeService){}

  ngOnInit(){
    this.employeeService.getEmployeesWithExpenses().subscribe((employees: Employee[])=>{
      this.employees = employees
    })
  }
  
}
