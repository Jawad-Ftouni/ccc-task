import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../models/Leave';
import { AuthService } from '../../../services/auth.service';
import { LeaveType } from '../../../models/LeaveType';
import { LeaveTypeService } from '../../../services/leave-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})

export class AddLeaveComponent implements OnInit{

  leaveForm !: FormGroup;
  newLeave: Leave ={
    id: 0,
    leave_type_name: "",
    from: '',
    to: '',
    number_of_days: 0,
    note: ''
  }
  leaveTypes!:LeaveType[];
  formSubmitted = false;

  constructor(private fb: FormBuilder ,private leaveService: LeaveService,private authService:AuthService ,private leaveTypeService: LeaveTypeService ,private router: Router) {}

  ngOnInit(): void {
    this.leaveTypeService.getLeaveTypes().subscribe((leaveTypes) => {
      this.leaveTypes = [...leaveTypes];
    })

    this.leaveForm = this.fb.group({
      leave_type_name: [this.newLeave.leave_type_name, Validators.required],
      from: [this.newLeave.from, [Validators.required, Validators.required]],
      to: [this.newLeave.to, Validators.required],
      number_of_days: [this.newLeave.number_of_days, Validators.required],
      note: [this.newLeave.note],
    });  
  }

  onSubmit() {
    this.formSubmitted = true;

     if(this.leaveForm.valid) {
      // Form is valid, you can now access the form values
      const leaveFormData = this.leaveForm.value as Leave;
      let currentEmployee = this.authService.getCurrentEmployee();

      if(currentEmployee){
        this.leaveService.addLeaveForEmployee(currentEmployee.id,leaveFormData).subscribe((employee)=>{
          this.leaveService.emitNewLeaveAdded(employee.leaves);
        })
      }
      this.formSubmitted = true;
      this.router.navigate(['leaves'])
    }
  }

}
