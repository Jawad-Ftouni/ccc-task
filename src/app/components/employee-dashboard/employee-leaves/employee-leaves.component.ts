import { Component, OnInit } from '@angular/core';
import { Leave } from '../../../models/Leave';
import { LeaveService } from '../../../services/leave.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.css']
})

export class EmployeeLeavesComponent implements OnInit {

  employeeLeaves: Leave[] = [];
  filteredLeaves: Leave[] = [];
  fromDateFilter: string = ''
  toDateFilter: string = ''
  dateError: boolean = false;

  constructor(private leaveService: LeaveService, private route: ActivatedRoute, private router: Router,private authService: AuthService) {}

  ngOnInit() {
    let currentEmployee = this.authService.getCurrentEmployee()

    this.leaveService.getNewLeaveEmitter().subscribe((leaves) => {
      this.employeeLeaves = leaves;
      this.filteredLeaves = leaves;
    });

    if(currentEmployee){
      this.leaveService.getEmployeeLeaves(currentEmployee.id).subscribe((leaves)=>{
        this.employeeLeaves = leaves
        this.filteredLeaves = leaves;
      })
    }
  }

  navigateToAddLeave() {
    this.router.navigate(['add-leave']);
  }

  navigateToAddExpense(leaveId: number) {
    this.router.navigate(['add-expense', leaveId])
  }
  
  filterByDate() {
    const fromDate = new Date(this.fromDateFilter);
    const toDate = new Date(this.toDateFilter);

     // Check if the "To" date is less than the "From" date
     if (toDate < fromDate) {
      this.dateError = true; // Set dateError to true to display the error message
      this.employeeLeaves = this.employeeLeaves;
      return; // Prevent further processing
    }
    this.dateError = false;
    this.filteredLeaves = this.leaveService.filterLeavesByDateRange({leaves: this.employeeLeaves, fromDateFilter: this.fromDateFilter, toDateFilter: this.fromDateFilter});
  }
  
}