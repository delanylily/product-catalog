import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    })
    form.reset();
  }
}