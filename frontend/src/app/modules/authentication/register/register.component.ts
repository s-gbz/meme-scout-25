import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { Validation } from 'src/app/shared/validation';
import { Router } from '@angular/router';

@Component({
  selector: 'authentication-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,
    public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  
  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
      agreeWithTerms: ['', Validators.requiredTrue]
    },
    {
      validators: Validation.passwordMatchValidator, 
    })
  }

  registerWithGoogle() {
    this.userService.loginWithGoogle();
    // TODO: Read email & name from provider
    // const name = provider
    // const email = provider
    //
    // this.createRegisteredUserInDatabaseAndOpenEditProfile(name, email);
  }

  registerWithGithub() {
    this.userService.loginWithGithub();
    // TODO: Read email & name from provider
    // const name = provider
    // const email = provider
    //
    // this.createRegisteredUserInDatabaseAndOpenEditProfile(name, email);
  }

  submitRegisterForm() {
    const name = this.registerForm.value["name"].trim();
    const email = this.registerForm.value["email"].trim();

    Promise.resolve(this.userService.register(name, email)
    // If success -> create / update profile in database
    .then(() => this.createRegisteredUserInDatabaseAndOpenProfile(name, email))
    .catch((error: Error) => this.handleError(error)));
  }

  private createRegisteredUserInDatabaseAndOpenProfile(name: string, email: string) {
    this.router.navigateByUrl("/tabs/profile");
    // TODO: Update user in DB or write Function
    console.log("createRegisteredUser");
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
