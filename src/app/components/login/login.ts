import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, RouterLink],
})
export class Login {
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  form: FormGroup;

  submit() {
    this.auth.login(this.form.value.username!, this.form.value.password!).subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}
