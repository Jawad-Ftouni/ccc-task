import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseClaim } from 'src/app/models/ExpenseClaim';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseClaimService } from 'src/app/services/expense-claim.service';

enum ExpenseType {
  Hotel = "hotel",
  CarRental = "car rental",
  Food = "food",
  Ticket = "ticket",
}

@Component({
  selector: 'app-add-expense-claim',
  templateUrl: './add-expense-claim.component.html',
  styleUrls: ['./add-expense-claim.component.css']
})

export class AddExpenseClaimComponent {
  
  expenseClaimForm!: FormGroup;
  formSubmitted = false;
  newExpenseClaim: ExpenseClaim = {
    id: 0,
    date: '',
    description: '',
    total: 0,
    status: '',
    expense_claim_details: []
  }
  expenseTypes = Object.values(ExpenseType);
  
  constructor(private fb: FormBuilder,private expanseClaimService: ExpenseClaimService,private authService: AuthService,private router:Router) {}

  ngOnInit() {
    this.expenseClaimForm = this.fb.group({
      date: [this.newExpenseClaim.date, Validators.required],
      description: [this.newExpenseClaim.description, Validators.required],
      total: [this.newExpenseClaim.total, Validators.required],
      status: [this.newExpenseClaim.status],
      expense_claim_details: this.fb.array([this.createDetailFormGroup()])
    });
  }

  // Implement methods for adding and removing expense claim details
  createDetailFormGroup(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      type: [ExpenseType.Hotel, Validators.required],
      total: ['', Validators.required]
    });
  }
  
  addDetail(): void {
    const detailArray = this.expenseClaimForm.get('expense_claim_details') as FormArray;
    detailArray.push(this.createDetailFormGroup());
  }

  getDetailControls() {
    return (this.expenseClaimForm.get('expense_claim_details') as FormArray).controls;
  }


  submitExpenseClaim() {
    // Handle the submission of the expense claim form
    this.formSubmitted = true;
    if(this.expenseClaimForm.valid){

      let expenseClaim = this.expenseClaimForm.value as ExpenseClaim
      let currentUser = this.authService.getCurrentEmployee();
      if(currentUser) {
        this.expanseClaimService.addExpenseClaimToEmployee(currentUser.id,expenseClaim).subscribe(()=>{})
        this.expanseClaimService.getExpenseClaimsForEmployee(currentUser.id).subscribe((expenses :ExpenseClaim[])=>{
          this.expanseClaimService.expenseClaimAddedEvent.emit(expenses);
      })
    }
    this.expanseClaimService.expenseClaimAddedEvent.emit()
    this.router.navigate(['expenses'])
  }
 }

  removeDetail(index: number): void {
    const detailArray = this.expenseClaimForm.get('expense_claim_details') as FormArray;
    detailArray.removeAt(index);
  }

   expenseClaimDetails() {
    return (this.expenseClaimForm.get('expense_claim_details') as FormArray).controls;
  }
  
}
