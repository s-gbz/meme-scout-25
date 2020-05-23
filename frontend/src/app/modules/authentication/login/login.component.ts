import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  userIsLoggedIn() {
    console.log(this.userService.uid);
    
    return this.userService.uid;
  }
  
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitLoginForm() {
    // TODO: Implement login check
    console.log(this.loginForm.value);
  }

  submitForgotPassword() {
    // TODO: Create ForgotPasswordModule
    // TODO: Implement API call
  }

  loginWithGoogle() {
    this.userService.loginWithGoogle();
  }

  loginWithGithub() {
    this.userService.loginWithGithub();
  }
}
