import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  formSubmitted = false;
  errorMessage: string | null = null; // Error message property

  constructor(private formBuilder: FormBuilder,private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]], // Minimum length of 5 characters
      password: ['', [Validators.required, Validators.minLength(8)]], // Minimum length of 8 characters
    });
  }
  
  onSubmit() {
    this.formSubmitted = true;
    this.errorMessage = null;

    if(this.loginForm.valid){

      this.authService.loggedInEvent.emit();

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // Call the login method from authService
      this.authService.login(username, password).subscribe(response => {
        if (!response.success) {
          this.errorMessage = '*Invalid username or password.';
        } 
      });
    }
  }
  
}
