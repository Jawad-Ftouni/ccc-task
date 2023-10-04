import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { HrAuthGuard } from "./services/hr-auth-guard.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { AddLeaveComponent } from "./components/employee-dashboard/add-leave/add-leave.component";
import { EmployeeAuthGuardService } from "./services/employee-auth-guard.service";
import { EmployeeLeavesComponent } from "./components/employee-dashboard/employee-leaves/employee-leaves.component";
import { EmployeesLeavesComponent } from "./dashboard/employees-leaves/employees-leaves.component";
import { EmployeesResolver } from "./resolver/employees-resolver.service";
import { EmployeeExpensesClaimComponent } from "./components/employee-dashboard/employee-expenses-claim/employee-expenses-claim.component";
import { EmployeeExpenseClaimResolver } from "./resolver/employee-expense-claim-resolver.service";
import { EmployeesClaimsComponent } from "./dashboard/employees-claims/employees-claims.component";
import { AddEmployeeComponent } from "./dashboard/add-employee/add-employee.component";
import { AddExpenseClaimComponent } from "./components/employee-dashboard/add-expense-claim/add-expense-claim.component";
import { AnalyticsComponent } from "./dashboard/analytics/analytics.component";

const routes: Routes = [
// common routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'access-denied', component: NoAccessComponent },
//  Hr routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [HrAuthGuard]},
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [HrAuthGuard]},
  { path: 'employees-leaves', component: EmployeesLeavesComponent, canActivate: [HrAuthGuard], resolve: { employees: EmployeesResolver}},
  { path: 'employees-expenses', component: EmployeesClaimsComponent, canActivate: [HrAuthGuard], resolve: { employees: EmployeesResolver}},
  { path: 'analytics', component: AnalyticsComponent, canActivate: [HrAuthGuard]},
  
// Employees routes
  { path: 'add-leave', component: AddLeaveComponent, canActivate: [EmployeeAuthGuardService]},
  { path: 'add-expense', component: AddExpenseClaimComponent, canActivate: [EmployeeAuthGuardService]},
  { path: 'leaves', component: EmployeeLeavesComponent, canActivate: [EmployeeAuthGuardService]},
  { path: 'expenses', component: EmployeeExpensesClaimComponent, canActivate: [EmployeeAuthGuardService] ,resolve:{expenseClaims:EmployeeExpenseClaimResolver}},

  //wildcard route to catch undefined URLs and redirect to "not-found"
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}