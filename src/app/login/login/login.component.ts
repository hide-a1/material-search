import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.user$.subscribe((user) => {
        if (user) {
          this.router.navigate(['']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    this.authService.login().then((userCredential) => {
      if (userCredential) {
        this.router.navigate(['']);
      }
    });
  }
}
