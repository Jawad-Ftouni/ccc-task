import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/Employees';
  private isLoggedInKey = 'false';
  private currentEmployeeKey = 'currentEmployee';
  private roleKey = 'role';
  loggedInEvent = new EventEmitter();
  loggedOutEvent = new EventEmitter();
  isLoggedOutkeyNav = 'loggedOut'

  constructor(private http: HttpClient ,private router: Router) {}

  login(username: string, password: string): Observable<{ success: boolean; user?: User; error?: string }> {
    return this.http.get<Employee[]>(`${this.baseUrl}?username=${username}`).pipe(
      map((employees: Employee[]) => {
        const employee = employees.find(
          (u) => u.name === username && u.password === password
        );
        if(employee) {
          this.setCurrentEmployee(employee);
          if(employee.role == 'Hr'){
            this.setHrRole();
            this.router.navigate(['dashboard'])
          } else {
            this.setEmployeeRole();
            this.router.navigate(['leaves'])
          }
          this.setLoggedIn();
          return { success: true, employee };
        } else {
          return { success: false, error: 'Invalid credentials' };
        }
      })
    )
  }
  
  isLoggedIn(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }

  isLoggedOut(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'false';
  }

  setLoggedIn() {
    localStorage.setItem(this.isLoggedInKey,'true');
  }

  setLoggedOut() {
    localStorage.setItem(this.isLoggedInKey, 'false');
    this.router.navigate(['login']);
  }

  setLoggedOutNav(){
    localStorage.setItem(this.isLoggedOutkeyNav, 'true')
  }

  setLoggedInNav(){
    localStorage.setItem(this.isLoggedOutkeyNav, 'false')
  }

  isLoggedOutNav(){
    return localStorage.getItem(this.isLoggedOutkeyNav) === 'true'
  }

  isLoggedInNav(){
    return localStorage.getItem(this.isLoggedOutkeyNav) === 'false'
  }

  getLoggedOutNav(){
    if(this.isLoggedOutNav()) return true;
    return false;
  }

  getLoggedInNav(){
    if(this.isLoggedInNav())
      return false;
    return true;
  }

  setHrRole(){
    localStorage.setItem(this.roleKey,"Hr");
  }

  setEmployeeRole(){
    localStorage.setItem(this.roleKey,"Employee")
  }

  isHrRole(){
    return localStorage.getItem(this.roleKey) === "Hr"
  }

  isEmployeeRole(){
    return localStorage.getItem(this.roleKey) === "Employee"
  }

  setCurrentEmployee(user: Employee) {
    localStorage.setItem(this.currentEmployeeKey, JSON.stringify(user)); // Store user as JSON string
  }
  
  getCurrentEmployee(): Employee | null {
    const userJSON = localStorage.getItem(this.currentEmployeeKey);
    if (userJSON) {
      return JSON.parse(userJSON); // Parse JSON string back to User object
    }
    return null; // Return null if user data is not found in local storage
  }
}
