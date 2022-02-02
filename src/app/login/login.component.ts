import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private toast: HotToastService) {
  }

  login(): void {
    this.authService.signIn().pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: ({ message }) => `There was an erro: ${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
    //  this.authService.login();
  }
}
