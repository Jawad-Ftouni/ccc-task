import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddLeaveComponent } from './components/employee-dashboard/add-leave/add-leave.component';
import { EmployeeLeavesComponent } from './components/employee-dashboard/employee-leaves/employee-leaves.component';
import { EmployeesLeavesComponent } from './dashboard/employees-leaves/employees-leaves.component';
import { EmployeeExpensesClaimComponent } from './components/employee-dashboard/employee-expenses-claim/employee-expenses-claim.component';
import { NavComponent } from './components/nav/nav.component';
import { EmployeesClaimsComponent } from './dashboard/employees-claims/employees-claims.component';
import { AddEmployeeComponent } from './dashboard/add-employee/add-employee.component';
import { AddExpenseClaimComponent } from './components/employee-dashboard/add-expense-claim/add-expense-claim.component';
import { NgChartsModule } from 'ng2-charts';
import { EmployeesListComponent } from './dashboard/employees-list/employees-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';

@NgModule({
  declarations: [AppComponent,  NotFoundComponent, NoAccessComponent, EmployeesListComponent, DashboardComponent, LoginComponent, AddEmployeeComponent, AddLeaveComponent, EmployeeLeavesComponent, EmployeesLeavesComponent, AddExpenseClaimComponent, EmployeeExpensesClaimComponent, NavComponent, EmployeesClaimsComponent, AnalyticsComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, FormsModule ,NgChartsModule, BrowserAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
