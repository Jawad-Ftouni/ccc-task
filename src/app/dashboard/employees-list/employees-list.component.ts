import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit  {
  employees: Employee[] = [];
  employeeUpdated!: Employee;
  imagePath: string = "./../../../assets/";
  constructor(private employeeService: EmployeeService,private authService: AuthService){}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employees)=>{
      this.employees = employees
    })
    this.employeeService.newEmployeeAdded.subscribe((employees: Employee[])=>{
      this.employees = employees;
    })
  }

  editingEmployees: boolean[] = new Array(this.employees.length).fill(false);

  toggleEdit(index: number) {
    this.editingEmployees[index] = !this.editingEmployees[index];
  }

  cancelEdit(index: number) {
    this.editingEmployees[index] = !this.editingEmployees[index];
  }
  
  saveEdit(index: number){
    this.employeeService.updateEmployee(this.employees[index].id,this.employees[index]).subscribe((employee)=>{
      this.editingEmployees[index] = !this.editingEmployees[index];
    })
  }
  isEmployee(employee: Employee){
    return employee.role === "Employee"
  }
}
