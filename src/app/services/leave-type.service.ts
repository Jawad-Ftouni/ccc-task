import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveType } from '../models/LeaveType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  
  private apiUrl = 'http://localhost:3000/LeaveTypes'; 

  constructor(private http:HttpClient) { }

  getLeaveTypes(): Observable<LeaveType[]>{
    return this.http.get<LeaveType[]>(this.apiUrl)
  }
}
