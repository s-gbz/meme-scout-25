import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,
    private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  userIsLoggedIn() {

  }
  
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitLoginForm() {
    this.resolveLoginPromise(this.userService.login(this.loginForm.value["email"], this.loginForm.value["password"]));
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

  private resolveLoginPromise(authFunction: Promise<any>) {
    Promise.resolve(authFunction)
    .then(() => this.openMemeView())
    .catch((error: Error) => this.handleError(error));
  }

  private openMemeView() {
    console.log("TODO adapt & unify route in other PR");
    this.router.navigateByUrl("/meme-view");
  }

  private handleError(error: Error) {
    this.presentToast(error.message);
  }

  private async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 5000,
      color: "danger"
    });
    toast.present();
  }
}
