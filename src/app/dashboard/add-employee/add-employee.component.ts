import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

enum EmployeeRole {
  HR = 'Hr',
  Employee = 'Employee'
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit{

  employeeForm!: FormGroup;
  newEmployee: Employee = new Employee(0, '', '', '', '', 0, '', [], []);
  roles: EmployeeRole[] = [EmployeeRole.HR, EmployeeRole.Employee];
  formSubmitted = false;

  constructor(private fb: FormBuilder,private employeeService: EmployeeService,private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [this.newEmployee.name, Validators.required],
      email: [this.newEmployee.email, [Validators.required, Validators.email]],
      password: [this.newEmployee.password, Validators.required],
      address: [this.newEmployee.address, Validators.required],
      department_id: [this.newEmployee.department_id, Validators.required],
      role: [this.newEmployee.role, Validators.required]
      // Add more form controls as needed
    });  
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.employeeForm.valid) {

      // Form is valid, you can now access the form values
      const employeeData = this.employeeForm.value as Employee;
      this.employeeService.addEmployee(employeeData).subscribe(()=>{})
      this.employeeService.getEmployees().subscribe((employees:Employee[])=>{
        this.employeeService.newEmployeeAdded.emit(employees)
      })
      this.router.navigate(['dashboard'])
    } 
  }
}