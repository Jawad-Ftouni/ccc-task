import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'CCC-task';
  showNav = false;
  isLoggedOut !:Boolean;

  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService){}

  ngOnInit(){
    this.isLoggedOut = this.authService.getLoggedOutNav();
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = this.route.root.firstChild?.snapshot.routeConfig?.path;
        if (currentRoute === 'login'){
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      });

      this.authService.loggedInEvent.subscribe(()=>{
        this.authService.setLoggedInNav()//false
        this.isLoggedOut = this.authService.getLoggedOutNav();
      })

      this.authService.loggedOutEvent.subscribe(()=>{
        this.authService.setLoggedOutNav();//true
        this.isLoggedOut = this.authService.getLoggedOutNav();
      })
    }

}
