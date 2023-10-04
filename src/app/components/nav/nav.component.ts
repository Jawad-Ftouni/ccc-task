import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  selectedRoute: string = '/dashboard'; // Initialize it with the default route
  isLoggedIn = false;
  isHr = false;
  isEmployee = false;

  constructor(private authService: AuthService,private router:Router){}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn()
    this.isHr = this.authService.isHrRole();
    this.isEmployee = this.authService.isEmployeeRole();
    this.selectedRoute = localStorage.getItem('selectedRoute') || '/dashboard'; // Retrieve from localStorage
  }

  selectRoute(route: string) {
    this.selectedRoute = route;
    localStorage.setItem('selectedRoute', route); // Store in localStorage
    this.router.navigate([route])
  }
  
  Logout(){
    this.authService.loggedOutEvent.emit()
    this.authService.setLoggedOut(); 
  }

}
